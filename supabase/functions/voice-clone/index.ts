import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const elevenlabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');

    if (!elevenlabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });

    const authHeader = req.headers.get('Authorization')!;
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { action, voiceFiles, twinId, voiceName, voiceDescription } = await req.json();

    if (action === 'create_voice') {
      // Create voice clone from uploaded audio files
      const formData = new FormData();
      formData.append('name', voiceName || `${user.id}-voice`);
      formData.append('description', voiceDescription || 'EchoSelf voice clone');

      // Add voice files to form data
      voiceFiles.forEach((file: { data: string, name: string }, index: number) => {
        const audioBlob = new Blob([
          Uint8Array.from(atob(file.data), c => c.charCodeAt(0))
        ], { type: 'audio/wav' });
        formData.append('files', audioBlob, file.name);
      });

      const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
        method: 'POST',
        headers: {
          'xi-api-key': elevenlabsApiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`ElevenLabs API error: ${error}`);
      }

      const voiceData = await response.json();

      // Update twin with voice model ID
      const { error: updateError } = await supabase
        .from('twins')
        .update({
          voice_model_id: voiceData.voice_id,
          voice_samples: voiceFiles.map((f: any) => ({ name: f.name, uploaded_at: new Date().toISOString() })),
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.4,
            use_speaker_boost: true
          }
        })
        .eq('id', twinId)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      return new Response(JSON.stringify({
        success: true,
        voice_id: voiceData.voice_id,
        message: 'Voice clone created successfully'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'synthesize') {
      const { text, twinId: targetTwinId } = await req.json();

      // Get twin voice settings
      const { data: twin, error: twinError } = await supabase
        .from('twins')
        .select('voice_model_id, voice_settings')
        .eq('id', targetTwinId)
        .eq('user_id', user.id)
        .single();

      if (twinError || !twin?.voice_model_id) {
        throw new Error('Voice model not found for this twin');
      }

      const voiceSettings = twin.voice_settings || {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.4,
        use_speaker_boost: true
      };

      // Generate speech using ElevenLabs
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${twin.voice_model_id}`, {
        method: 'POST',
        headers: {
          'xi-api-key': elevenlabsApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: voiceSettings,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`ElevenLabs synthesis error: ${error}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

      return new Response(JSON.stringify({
        success: true,
        audio_base64: audioBase64,
        voice_id: twin.voice_model_id
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid action');

  } catch (error) {
    console.error('Voice clone error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Voice cloning failed'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});