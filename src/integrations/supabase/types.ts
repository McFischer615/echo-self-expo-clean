export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          criteria: string | null
          description: string
          icon_name: string
          id: string
          name: string | null
          points: number
          reward_coins: number | null
          title: string
        }
        Insert: {
          created_at?: string
          criteria?: string | null
          description: string
          icon_name: string
          id?: string
          name?: string | null
          points?: number
          reward_coins?: number | null
          title: string
        }
        Update: {
          created_at?: string
          criteria?: string | null
          description?: string
          icon_name?: string
          id?: string
          name?: string | null
          points?: number
          reward_coins?: number | null
          title?: string
        }
        Relationships: []
      }
      affiliate_commissions: {
        Row: {
          affiliate_id: string
          commission_amount: number
          created_at: string
          event_type: string | null
          id: string
          memo: string | null
          payment_date: string | null
          purchase_tier: string | null
          referred_user_id: string | null
          source: string
          status: string
          token_amount: number | null
          transaction_id: string | null
        }
        Insert: {
          affiliate_id: string
          commission_amount?: number
          created_at?: string
          event_type?: string | null
          id?: string
          memo?: string | null
          payment_date?: string | null
          purchase_tier?: string | null
          referred_user_id?: string | null
          source: string
          status?: string
          token_amount?: number | null
          transaction_id?: string | null
        }
        Update: {
          affiliate_id?: string
          commission_amount?: number
          created_at?: string
          event_type?: string | null
          id?: string
          memo?: string | null
          payment_date?: string | null
          purchase_tier?: string | null
          referred_user_id?: string | null
          source?: string
          status?: string
          token_amount?: number | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_commissions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_payouts: {
        Row: {
          affiliate_id: string
          amount: number
          created_at: string
          id: string
          payment_details: Json | null
          payment_method: string
          processed_at: string | null
          status: string
        }
        Insert: {
          affiliate_id: string
          amount: number
          created_at?: string
          id?: string
          payment_details?: Json | null
          payment_method: string
          processed_at?: string | null
          status?: string
        }
        Update: {
          affiliate_id?: string
          amount?: number
          created_at?: string
          id?: string
          payment_details?: Json | null
          payment_method?: string
          processed_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_payouts_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_referrals: {
        Row: {
          affiliate_id: string
          created_at: string
          id: string
          referred_user_id: string
          status: string
        }
        Insert: {
          affiliate_id: string
          created_at?: string
          id?: string
          referred_user_id: string
          status?: string
        }
        Update: {
          affiliate_id?: string
          created_at?: string
          id?: string
          referred_user_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_referrals_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          affiliate_code: string
          balance: number
          commission_rate: number
          created_at: string
          email: string | null
          id: string
          name: string | null
          payment_email: string | null
          payment_method: string | null
          status: string
          total_earned: number
          total_paid: number
          updated_at: string
          user_id: string
        }
        Insert: {
          affiliate_code: string
          balance?: number
          commission_rate?: number
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          payment_email?: string | null
          payment_method?: string | null
          status?: string
          total_earned?: number
          total_paid?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          affiliate_code?: string
          balance?: number
          commission_rate?: number
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          payment_email?: string | null
          payment_method?: string | null
          status?: string
          total_earned?: number
          total_paid?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_content_usage: {
        Row: {
          content_type: string
          created_at: string
          game_type: string
          id: string
          prompt_length: number | null
          response_length: number | null
          user_id: string | null
        }
        Insert: {
          content_type: string
          created_at?: string
          game_type: string
          id?: string
          prompt_length?: number | null
          response_length?: number | null
          user_id?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string
          game_type?: string
          id?: string
          prompt_length?: number | null
          response_length?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_context_embeddings: {
        Row: {
          content_text: string
          content_type: string
          conversation_id: string
          created_at: string
          embedding: string | null
          id: string
          importance_score: number | null
          user_id: string
        }
        Insert: {
          content_text: string
          content_type: string
          conversation_id: string
          created_at?: string
          embedding?: string | null
          id?: string
          importance_score?: number | null
          user_id: string
        }
        Update: {
          content_text?: string
          content_type?: string
          conversation_id?: string
          created_at?: string
          embedding?: string | null
          id?: string
          importance_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      ai_conversation_contexts: {
        Row: {
          context_data: Json
          context_embeddings: string | null
          context_importance_scores: Json | null
          conversation_id: string
          created_at: string
          emotional_state: Json | null
          expires_at: string | null
          id: string
          last_interaction_at: string
          message_count: number
          personal_history: Json | null
          relationship_context: Json | null
          topic_threads: Json | null
          total_tokens: number
          updated_at: string
          user_id: string
        }
        Insert: {
          context_data?: Json
          context_embeddings?: string | null
          context_importance_scores?: Json | null
          conversation_id: string
          created_at?: string
          emotional_state?: Json | null
          expires_at?: string | null
          id?: string
          last_interaction_at?: string
          message_count?: number
          personal_history?: Json | null
          relationship_context?: Json | null
          topic_threads?: Json | null
          total_tokens?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          context_data?: Json
          context_embeddings?: string | null
          context_importance_scores?: Json | null
          conversation_id?: string
          created_at?: string
          emotional_state?: Json | null
          expires_at?: string | null
          id?: string
          last_interaction_at?: string
          message_count?: number
          personal_history?: Json | null
          relationship_context?: Json | null
          topic_threads?: Json | null
          total_tokens?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_host_interactions: {
        Row: {
          content: string
          context: Json | null
          conversation_id: string | null
          created_at: string
          host_type: string
          id: string
          interaction_type: string
          model_id: string | null
          provider_id: string | null
          response_time_ms: number | null
          sentiment: string | null
          tokens_used: number | null
          user_id: string
          voice_audio_url: string | null
          voice_enabled: boolean | null
        }
        Insert: {
          content: string
          context?: Json | null
          conversation_id?: string | null
          created_at?: string
          host_type: string
          id?: string
          interaction_type: string
          model_id?: string | null
          provider_id?: string | null
          response_time_ms?: number | null
          sentiment?: string | null
          tokens_used?: number | null
          user_id: string
          voice_audio_url?: string | null
          voice_enabled?: boolean | null
        }
        Update: {
          content?: string
          context?: Json | null
          conversation_id?: string | null
          created_at?: string
          host_type?: string
          id?: string
          interaction_type?: string
          model_id?: string | null
          provider_id?: string | null
          response_time_ms?: number | null
          sentiment?: string | null
          tokens_used?: number | null
          user_id?: string
          voice_audio_url?: string | null
          voice_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_host_interactions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_host_interactions_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_host_personalities: {
        Row: {
          avatar_url: string | null
          color: string
          created_at: string
          description: string
          emoji: string
          game_type_affinity: string[]
          host_type: string
          id: string
          name: string
          persona: string
          traits: Json | null
          updated_at: string
          voice_id: string | null
          voice_style: string
        }
        Insert: {
          avatar_url?: string | null
          color: string
          created_at?: string
          description?: string
          emoji: string
          game_type_affinity?: string[]
          host_type: string
          id?: string
          name: string
          persona: string
          traits?: Json | null
          updated_at?: string
          voice_id?: string | null
          voice_style?: string
        }
        Update: {
          avatar_url?: string | null
          color?: string
          created_at?: string
          description?: string
          emoji?: string
          game_type_affinity?: string[]
          host_type?: string
          id?: string
          name?: string
          persona?: string
          traits?: Json | null
          updated_at?: string
          voice_id?: string | null
          voice_style?: string
        }
        Relationships: []
      }
      ai_models: {
        Row: {
          capabilities: Json
          context_window: number
          cost_per_input_token: number | null
          cost_per_output_token: number | null
          created_at: string
          display_name: string
          id: string
          max_tokens: number
          model_name: string
          provider_id: string
          status: string
          supports_streaming: boolean
          supports_vision: boolean
          updated_at: string
        }
        Insert: {
          capabilities?: Json
          context_window?: number
          cost_per_input_token?: number | null
          cost_per_output_token?: number | null
          created_at?: string
          display_name: string
          id?: string
          max_tokens?: number
          model_name: string
          provider_id: string
          status?: string
          supports_streaming?: boolean
          supports_vision?: boolean
          updated_at?: string
        }
        Update: {
          capabilities?: Json
          context_window?: number
          cost_per_input_token?: number | null
          cost_per_output_token?: number | null
          created_at?: string
          display_name?: string
          id?: string
          max_tokens?: number
          model_name?: string
          provider_id?: string
          status?: string
          supports_streaming?: boolean
          supports_vision?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_models_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_providers: {
        Row: {
          api_endpoint: string
          cost_per_token: number | null
          created_at: string
          display_name: string
          id: string
          model_capabilities: Json
          name: string
          priority: number
          rate_limits: Json
          secret_key_name: string
          status: string
          updated_at: string
        }
        Insert: {
          api_endpoint: string
          cost_per_token?: number | null
          created_at?: string
          display_name: string
          id?: string
          model_capabilities?: Json
          name: string
          priority?: number
          rate_limits?: Json
          secret_key_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          api_endpoint?: string
          cost_per_token?: number | null
          created_at?: string
          display_name?: string
          id?: string
          model_capabilities?: Json
          name?: string
          priority?: number
          rate_limits?: Json
          secret_key_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_relationship_memory: {
        Row: {
          created_at: string
          emotional_valence: number | null
          entity_name: string
          id: string
          interaction_frequency: number | null
          last_interaction_at: string | null
          relationship_data: Json | null
          relationship_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emotional_valence?: number | null
          entity_name: string
          id?: string
          interaction_frequency?: number | null
          last_interaction_at?: string | null
          relationship_data?: Json | null
          relationship_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          emotional_valence?: number | null
          entity_name?: string
          id?: string
          interaction_frequency?: number | null
          last_interaction_at?: string | null
          relationship_data?: Json | null
          relationship_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_usage_analytics: {
        Row: {
          cost_usd: number | null
          created_at: string
          error_message: string | null
          id: string
          interaction_id: string | null
          model_id: string
          provider_id: string
          response_time_ms: number | null
          success: boolean
          tokens_used: number
          user_id: string
        }
        Insert: {
          cost_usd?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          interaction_id?: string | null
          model_id: string
          provider_id: string
          response_time_ms?: number | null
          success?: boolean
          tokens_used?: number
          user_id: string
        }
        Update: {
          cost_usd?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          interaction_id?: string | null
          model_id?: string
          provider_id?: string
          response_time_ms?: number | null
          success?: boolean
          tokens_used?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_analytics_interaction_id_fkey"
            columns: ["interaction_id"]
            isOneToOne: false
            referencedRelation: "ai_host_interactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_usage_analytics_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_usage_analytics_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_approvals: {
        Row: {
          broadcast_alert_id: string | null
          created_at: string
          id: string
          red_flag_id: string | null
          review_notes: string | null
          reviewer_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          broadcast_alert_id?: string | null
          created_at?: string
          id?: string
          red_flag_id?: string | null
          review_notes?: string | null
          reviewer_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          broadcast_alert_id?: string | null
          created_at?: string
          id?: string
          red_flag_id?: string | null
          review_notes?: string | null
          reviewer_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_approvals_broadcast_alert_id_fkey"
            columns: ["broadcast_alert_id"]
            isOneToOne: false
            referencedRelation: "broadcast_alerts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_approvals_red_flag_id_fkey"
            columns: ["red_flag_id"]
            isOneToOne: false
            referencedRelation: "user_red_flags"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          alert_type: string
          content: Json
          created_at: string
          id: string
          is_read: boolean
          scan_report_id: string
          severity: string
          user_id: string
        }
        Insert: {
          alert_type: string
          content: Json
          created_at?: string
          id?: string
          is_read?: boolean
          scan_report_id: string
          severity?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          content?: Json
          created_at?: string
          id?: string
          is_read?: boolean
          scan_report_id?: string
          severity?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_scan_report_id_fkey"
            columns: ["scan_report_id"]
            isOneToOne: false
            referencedRelation: "scan_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      anon_names: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      api_gateway_logs: {
        Row: {
          application_id: string | null
          created_at: string
          endpoint: string
          error_message: string | null
          id: string
          ip_address: unknown | null
          method: string
          request_size_bytes: number | null
          response_size_bytes: number | null
          response_time_ms: number | null
          status_code: number
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          endpoint: string
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          method: string
          request_size_bytes?: number | null
          response_size_bytes?: number | null
          response_time_ms?: number | null
          status_code: number
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string
          endpoint?: string
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          method?: string
          request_size_bytes?: number | null
          response_size_bytes?: number | null
          response_time_ms?: number | null
          status_code?: number
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_gateway_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "oauth_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          api_key: string
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_name: string
          last_used_at: string | null
          scopes: string[] | null
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name: string
          last_used_at?: string | null
          scopes?: string[] | null
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name?: string
          last_used_at?: string | null
          scopes?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      api_usage_logs: {
        Row: {
          api_key_id: string | null
          created_at: string | null
          endpoint: string
          id: string
          ip_address: string | null
          method: string
          request_data: Json | null
          response_status: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address?: string | null
          method: string
          request_data?: Json | null
          response_status?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: string | null
          method?: string
          request_data?: Json | null
          response_status?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_logs_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          created_at: string | null
          description: string | null
          id: string
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      background_checks: {
        Row: {
          check_data: Json | null
          created_at: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          check_data?: Json | null
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          check_data?: Json | null
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      backups: {
        Row: {
          backup_type: string
          checksum: string
          created_at: string | null
          data: Json
          expires_at: string
          id: string
          size_bytes: number
          status: string
          user_id: string
        }
        Insert: {
          backup_type: string
          checksum: string
          created_at?: string | null
          data: Json
          expires_at: string
          id?: string
          size_bytes?: number
          status?: string
          user_id: string
        }
        Update: {
          backup_type?: string
          checksum?: string
          created_at?: string | null
          data?: Json
          expires_at?: string
          id?: string
          size_bytes?: number
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      behavior_tracking_settings: {
        Row: {
          activity_tracking: boolean
          communication_tracking: boolean
          created_at: string
          location_tracking: boolean
          screen_time_tracking: boolean
          sleep_tracking: boolean
          updated_at: string
          user_id: string
          voice_tracking: boolean
        }
        Insert: {
          activity_tracking?: boolean
          communication_tracking?: boolean
          created_at?: string
          location_tracking?: boolean
          screen_time_tracking?: boolean
          sleep_tracking?: boolean
          updated_at?: string
          user_id: string
          voice_tracking?: boolean
        }
        Update: {
          activity_tracking?: boolean
          communication_tracking?: boolean
          created_at?: string
          location_tracking?: boolean
          screen_time_tracking?: boolean
          sleep_tracking?: boolean
          updated_at?: string
          user_id?: string
          voice_tracking?: boolean
        }
        Relationships: []
      }
      behavioral_data: {
        Row: {
          created_at: string
          data_type: string
          data_value: Json
          id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_type: string
          data_value: Json
          id?: string
          timestamp?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data_type?: string
          data_value?: Json
          id?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      blockchain_ledger: {
        Row: {
          action: string
          hash: string
          id: string
          previous_hash: string | null
          task_id: string
          task_title: string
          timestamp: string | null
          user_id: string
        }
        Insert: {
          action: string
          hash: string
          id?: string
          previous_hash?: string | null
          task_id: string
          task_title: string
          timestamp?: string | null
          user_id: string
        }
        Update: {
          action?: string
          hash?: string
          id?: string
          previous_hash?: string | null
          task_id?: string
          task_title?: string
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      blocked_emails: {
        Row: {
          added_at: string | null
          email: string
          reason: string | null
        }
        Insert: {
          added_at?: string | null
          email: string
          reason?: string | null
        }
        Update: {
          added_at?: string | null
          email?: string
          reason?: string | null
        }
        Relationships: []
      }
      boosted_posts: {
        Row: {
          boost_level: number
          created_at: string
          expires_at: string
          id: string
          post_id: number
          tokens_spent: number
          user_id: string
        }
        Insert: {
          boost_level?: number
          created_at?: string
          expires_at: string
          id?: string
          post_id: number
          tokens_spent: number
          user_id: string
        }
        Update: {
          boost_level?: number
          created_at?: string
          expires_at?: string
          id?: string
          post_id?: number
          tokens_spent?: number
          user_id?: string
        }
        Relationships: []
      }
      bot_aliases: {
        Row: {
          alias: string
          bot_id: string
          created_at: string
          id: string
        }
        Insert: {
          alias: string
          bot_id: string
          created_at?: string
          id?: string
        }
        Update: {
          alias?: string
          bot_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_aliases_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bot_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_interruptions: {
        Row: {
          bot_id: string
          created_at: string | null
          game_id: string
          id: string
          question_text: string
        }
        Insert: {
          bot_id: string
          created_at?: string | null
          game_id: string
          id?: string
          question_text: string
        }
        Update: {
          bot_id?: string
          created_at?: string | null
          game_id?: string
          id?: string
          question_text?: string
        }
        Relationships: []
      }
      bot_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          last_used_at: string | null
          mood: string | null
          name: string
          personality_traits: string[] | null
          style_preset: string | null
          system_prompt: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          last_used_at?: string | null
          mood?: string | null
          name: string
          personality_traits?: string[] | null
          style_preset?: string | null
          system_prompt: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          last_used_at?: string | null
          mood?: string | null
          name?: string
          personality_traits?: string[] | null
          style_preset?: string | null
          system_prompt?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcast_alerts: {
        Row: {
          approved_by: string | null
          broadcast_scope: string
          city: string | null
          country: string | null
          created_at: string | null
          id: string
          media_url: string | null
          message_body: string
          postal_code: string | null
          recipient_count: number | null
          sender_email: string | null
          sent_at: string | null
          state: string | null
          status: string
          title: string
        }
        Insert: {
          approved_by?: string | null
          broadcast_scope: string
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          media_url?: string | null
          message_body: string
          postal_code?: string | null
          recipient_count?: number | null
          sender_email?: string | null
          sent_at?: string | null
          state?: string | null
          status?: string
          title: string
        }
        Update: {
          approved_by?: string | null
          broadcast_scope?: string
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          media_url?: string | null
          message_body?: string
          postal_code?: string | null
          recipient_count?: number | null
          sender_email?: string | null
          sent_at?: string | null
          state?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      broadcast_recipients: {
        Row: {
          broadcast_id: string
          created_at: string | null
          delivered_at: string | null
          email_delivered_at: string | null
          email_sent_at: string | null
          email_status: string | null
          id: string
          recipient_email: string | null
          recipient_phone: string
          sent_at: string | null
          status: string | null
        }
        Insert: {
          broadcast_id: string
          created_at?: string | null
          delivered_at?: string | null
          email_delivered_at?: string | null
          email_sent_at?: string | null
          email_status?: string | null
          id?: string
          recipient_email?: string | null
          recipient_phone: string
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          broadcast_id?: string
          created_at?: string | null
          delivered_at?: string | null
          email_delivered_at?: string | null
          email_sent_at?: string | null
          email_status?: string | null
          id?: string
          recipient_email?: string | null
          recipient_phone?: string
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_recipients_broadcast_id_fkey"
            columns: ["broadcast_id"]
            isOneToOne: false
            referencedRelation: "broadcast_alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      care_team: {
        Row: {
          contact_info: Json | null
          created_at: string | null
          id: string
          team_member_name: string
          team_member_role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          team_member_name: string
          team_member_role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          team_member_name?: string
          team_member_role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      case_comments: {
        Row: {
          case_id: string
          created_at: string
          id: string
          text: string
          user_id: string
        }
        Insert: {
          case_id: string
          created_at?: string
          id?: string
          text: string
          user_id: string
        }
        Update: {
          case_id?: string
          created_at?: string
          id?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_comments_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_media: {
        Row: {
          case_id: string
          created_at: string
          id: string
          media_type: string
          storage_path: string
        }
        Insert: {
          case_id: string
          created_at?: string
          id?: string
          media_type: string
          storage_path: string
        }
        Update: {
          case_id?: string
          created_at?: string
          id?: string
          media_type?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_media_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_votes: {
        Row: {
          case_id: string
          created_at: string
          id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          case_id: string
          created_at?: string
          id?: string
          user_id: string
          vote_type: string
        }
        Update: {
          case_id?: string
          created_at?: string
          id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_votes_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          case_text: string | null
          created_at: string | null
          has_media: boolean | null
          id: string
          message_source: string | null
          messages_json: Json | null
          roast_level: string | null
          user_id: string | null
          verdict: string | null
        }
        Insert: {
          case_text?: string | null
          created_at?: string | null
          has_media?: boolean | null
          id?: string
          message_source?: string | null
          messages_json?: Json | null
          roast_level?: string | null
          user_id?: string | null
          verdict?: string | null
        }
        Update: {
          case_text?: string | null
          created_at?: string | null
          has_media?: boolean | null
          id?: string
          message_source?: string | null
          messages_json?: Json | null
          roast_level?: string | null
          user_id?: string | null
          verdict?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          edited_at: string | null
          id: string
          image_path: string | null
          image_url: string | null
          is_deleted: boolean | null
          message: string
          reply_to_message_id: string | null
          room_id: string
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string
          edited_at?: string | null
          id?: string
          image_path?: string | null
          image_url?: string | null
          is_deleted?: boolean | null
          message: string
          reply_to_message_id?: string | null
          room_id: string
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string
          edited_at?: string | null
          id?: string
          image_path?: string | null
          image_url?: string | null
          is_deleted?: boolean | null
          message?: string
          reply_to_message_id?: string | null
          room_id?: string
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_reply_to_message_id_fkey"
            columns: ["reply_to_message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_room_participants: {
        Row: {
          id: string
          is_online: boolean | null
          joined_at: string | null
          last_seen: string | null
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          is_online?: boolean | null
          joined_at?: string | null
          last_seen?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          is_online?: boolean | null
          joined_at?: string | null
          last_seen?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_room_participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          active: boolean | null
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          user_count: number | null
        }
        Insert: {
          active?: boolean | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          user_count?: number | null
        }
        Update: {
          active?: boolean | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          user_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "room_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_typing_status: {
        Row: {
          id: string
          room_id: string | null
          typing_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          room_id?: string | null
          typing_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          room_id?: string | null
          typing_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_typing_status_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      checkout_logs: {
        Row: {
          created_at: string | null
          email: string
          id: number
          order_id: string
          status: string | null
          tokenamount: number
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          order_id: string
          status?: string | null
          tokenamount: number
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          order_id?: string
          status?: string | null
          tokenamount?: number
        }
        Relationships: []
      }
      coin_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          related_entity_id: string | null
          related_entity_type: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          likes: number | null
          post_id: number | null
          pseudonym: string | null
          story_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: never
          likes?: number | null
          post_id?: number | null
          pseudonym?: string | null
          story_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: never
          likes?: number | null
          post_id?: number | null
          pseudonym?: string | null
          story_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      communication_events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string
          event_type: string
          evidence_url: string | null
          ghost_file_id: string
          id: string
          message_content: string | null
          platform: string | null
          sentiment: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date: string
          event_type: string
          evidence_url?: string | null
          ghost_file_id: string
          id?: string
          message_content?: string | null
          platform?: string | null
          sentiment?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string
          event_type?: string
          evidence_url?: string | null
          ghost_file_id?: string
          id?: string
          message_content?: string | null
          platform?: string | null
          sentiment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_events_ghost_file_id_fkey"
            columns: ["ghost_file_id"]
            isOneToOne: false
            referencedRelation: "ghost_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_events_ghost_file_id_fkey"
            columns: ["ghost_file_id"]
            isOneToOne: false
            referencedRelation: "shared_ghost_files_view"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          admin_response: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          priority: string | null
          response_sent_at: string | null
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_response?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          priority?: string | null
          response_sent_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_response?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          priority?: string | null
          response_sent_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          media_url: string | null
          message_body: string
          participant_id: string | null
          sender_email: string | null
          sender_phone: string | null
          twilio_message_sid: string | null
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          media_url?: string | null
          message_body: string
          participant_id?: string | null
          sender_email?: string | null
          sender_phone?: string | null
          twilio_message_sid?: string | null
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          media_url?: string | null
          message_body?: string
          participant_id?: string | null
          sender_email?: string | null
          sender_phone?: string | null
          twilio_message_sid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_messages_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "conversation_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          participant_type: string
          twilio_participant_sid: string
          user_email: string
          user_phone: string | null
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          participant_type?: string
          twilio_participant_sid: string
          user_email: string
          user_phone?: string | null
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          participant_type?: string
          twilio_participant_sid?: string
          user_email?: string
          user_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          status: string
          title: string
          twilio_conversation_sid: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string
          title: string
          twilio_conversation_sid: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
          title?: string
          twilio_conversation_sid?: string
          updated_at?: string
        }
        Relationships: []
      }
      creator_payouts: {
        Row: {
          amount: number
          created_at: string
          creator_id: string
          group_id: string
          id: string
          payout_date: string | null
          period_end: string
          period_start: string
          status: string
          stripe_transfer_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          creator_id: string
          group_id: string
          id?: string
          payout_date?: string | null
          period_end: string
          period_start: string
          status?: string
          stripe_transfer_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          creator_id?: string
          group_id?: string
          id?: string
          payout_date?: string | null
          period_end?: string
          period_start?: string
          status?: string
          stripe_transfer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_payouts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      cross_app_actions: {
        Row: {
          action_data: Json | null
          action_type: string
          app_name: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          action_data?: Json | null
          action_type: string
          app_name: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          action_data?: Json | null
          action_type?: string
          app_name?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_behavioral_stats: {
        Row: {
          created_at: string
          date: string
          id: string
          interactions: number
          updated_at: string
          user_id: string
          words: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          interactions?: number
          updated_at?: string
          user_id: string
          words?: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          interactions?: number
          updated_at?: string
          user_id?: string
          words?: number
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          active_date: string
          challenge_type: string
          created_at: string
          description: string
          id: string
          points_reward: number
          target_count: number
          title: string
          token_reward: number
        }
        Insert: {
          active_date: string
          challenge_type: string
          created_at?: string
          description: string
          id?: string
          points_reward?: number
          target_count?: number
          title: string
          token_reward?: number
        }
        Update: {
          active_date?: string
          challenge_type?: string
          created_at?: string
          description?: string
          id?: string
          points_reward?: number
          target_count?: number
          title?: string
          token_reward?: number
        }
        Relationships: []
      }
      date_backed: {
        Row: {
          coins_awarded: number | null
          created_at: string
          date_description: string
          date_time: string
          feedback: string | null
          id: string
          location: string
          photo_url: string
          status: string
          updated_at: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          coins_awarded?: number | null
          created_at?: string
          date_description: string
          date_time: string
          feedback?: string | null
          id?: string
          location: string
          photo_url: string
          status?: string
          updated_at?: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          coins_awarded?: number | null
          created_at?: string
          date_description?: string
          date_time?: string
          feedback?: string | null
          id?: string
          location?: string
          photo_url?: string
          status?: string
          updated_at?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      donation_activities: {
        Row: {
          created_at: string
          donor_anon_name: string | null
          donor_id: string
          help_request_id: string
          id: string
          recipient_anon_name: string | null
          recipient_id: string
          tokens_donated: number
        }
        Insert: {
          created_at?: string
          donor_anon_name?: string | null
          donor_id: string
          help_request_id: string
          id?: string
          recipient_anon_name?: string | null
          recipient_id: string
          tokens_donated: number
        }
        Update: {
          created_at?: string
          donor_anon_name?: string | null
          donor_id?: string
          help_request_id?: string
          id?: string
          recipient_anon_name?: string | null
          recipient_id?: string
          tokens_donated?: number
        }
        Relationships: [
          {
            foreignKeyName: "donation_activities_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_activities_help_request_id_fkey"
            columns: ["help_request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_activities_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          donation_type: string
          email: string
          id: string
          payment_intent_id: string | null
          payment_status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          donation_type: string
          email: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          donation_type?: string
          email?: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      echo_ai_waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      echo_analytics: {
        Row: {
          conversation_length: number | null
          created_at: string
          echo_id: string | null
          id: string
          interaction_type: string
          metadata: Json | null
          response_quality_score: number | null
          session_id: string | null
          topics: Json | null
          user_id: string
        }
        Insert: {
          conversation_length?: number | null
          created_at?: string
          echo_id?: string | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          response_quality_score?: number | null
          session_id?: string | null
          topics?: Json | null
          user_id: string
        }
        Update: {
          conversation_length?: number | null
          created_at?: string
          echo_id?: string | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          response_quality_score?: number | null
          session_id?: string | null
          topics?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          email: string | null
          error: string | null
          id: string
          status: string | null
          timestamp: string | null
        }
        Insert: {
          email?: string | null
          error?: string | null
          id?: string
          status?: string | null
          timestamp?: string | null
        }
        Update: {
          email?: string | null
          error?: string | null
          id?: string
          status?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      email_meta: {
        Row: {
          key: string
          value: string | null
        }
        Insert: {
          key: string
          value?: string | null
        }
        Update: {
          key?: string
          value?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string
          html_content: string
          id: string
          name: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          name: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          name?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      emoji_reactions: {
        Row: {
          created_at: string
          emoji: string
          entity_id: string
          entity_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          entity_id: string
          entity_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          entity_id?: string
          entity_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      entities: {
        Row: {
          avatar: string | null
          created_at: string
          description: string | null
          id: string
          investigation_id: string | null
          label: string
          type: string
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          description?: string | null
          id?: string
          investigation_id?: string | null
          label: string
          type: string
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          description?: string | null
          id?: string
          investigation_id?: string | null
          label?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "entities_investigation_id_fkey"
            columns: ["investigation_id"]
            isOneToOne: false
            referencedRelation: "investigations"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_transform_runs: {
        Row: {
          entity_id: string
          finished_at: string | null
          id: string
          result: Json | null
          started_at: string | null
          status: string
          transform_id: string
        }
        Insert: {
          entity_id: string
          finished_at?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string
          transform_id: string
        }
        Update: {
          entity_id?: string
          finished_at?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string
          transform_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_transform_runs_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_transform_runs_transform_id_fkey"
            columns: ["transform_id"]
            isOneToOne: false
            referencedRelation: "transforms"
            referencedColumns: ["id"]
          },
        ]
      }
      error_logs: {
        Row: {
          context: Json | null
          created_at: string | null
          error_message: string
          error_stack: string | null
          error_type: string
          id: string
          metadata: Json | null
          resolved: boolean | null
          severity: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          error_message: string
          error_stack?: string | null
          error_type: string
          id?: string
          metadata?: Json | null
          resolved?: boolean | null
          severity: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          error_message?: string
          error_stack?: string | null
          error_type?: string
          id?: string
          metadata?: Json | null
          resolved?: boolean | null
          severity?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      export_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          export_type: string
          file_url: string | null
          id: string
          investigation_id: string | null
          settings: Json | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          export_type: string
          file_url?: string | null
          id?: string
          investigation_id?: string | null
          settings?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          export_type?: string
          file_url?: string | null
          id?: string
          investigation_id?: string | null
          settings?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "export_jobs_investigation_id_fkey"
            columns: ["investigation_id"]
            isOneToOne: false
            referencedRelation: "investigations"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_post_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feed_post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "feed_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_posts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          metadata: Json | null
          post_type: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          metadata?: Json | null
          post_type?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          metadata?: Json | null
          post_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      firebase_users: {
        Row: {
          access_granted: boolean | null
          created_at: string | null
          email: string | null
          id: string
          last_sign_in: string | null
          phone: string | null
          source: string | null
        }
        Insert: {
          access_granted?: boolean | null
          created_at?: string | null
          email?: string | null
          id: string
          last_sign_in?: string | null
          phone?: string | null
          source?: string | null
        }
        Update: {
          access_granted?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_sign_in?: string | null
          phone?: string | null
          source?: string | null
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          latest_post: string | null
          name: string
          post_count: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          latest_post?: string | null
          name: string
          post_count?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          latest_post?: string | null
          name?: string
          post_count?: number | null
        }
        Relationships: []
      }
      forum_comment_votes: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
          vote_type: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
          vote_type: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_comment_votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "forum_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_comments: {
        Row: {
          anonymous_avatar_seed: string
          anonymous_username: string
          author_id: string | null
          content: string
          created_at: string | null
          downvotes: number | null
          id: string
          parent_id: string | null
          post_id: string | null
          upvotes: number | null
        }
        Insert: {
          anonymous_avatar_seed: string
          anonymous_username: string
          author_id?: string | null
          content: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
          upvotes?: number | null
        }
        Update: {
          anonymous_avatar_seed?: string
          anonymous_username?: string
          author_id?: string | null
          content?: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "forum_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "recovery_champions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "retirement_archive_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "top_streaks_view"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_post_diamonds: {
        Row: {
          created_at: string
          id: string
          post_id: string
          vote: number
          voter_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          vote: number
          voter_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          vote?: number
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_post_diamonds_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_post_diamonds_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "recovery_champions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_post_diamonds_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "retirement_archive_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_post_diamonds_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "top_streaks_view"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_post_votes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
          vote_type: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "recovery_champions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "retirement_archive_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "top_streaks_view"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          achieved_reward: boolean | null
          anonymous_avatar_seed: string
          anonymous_username: string
          author_id: string | null
          blurred: boolean | null
          bot_alias: string | null
          category_id: string | null
          city: string | null
          comment_count: number | null
          content: string
          created_at: string | null
          diamonds: number | null
          downvotes: number | null
          flags: number | null
          id: string
          image_url: string | null
          is_bot: boolean | null
          is_pinned: boolean | null
          last_decay_at: string | null
          locked: boolean | null
          retired: boolean | null
          retirement_date: string | null
          state: string
          status: string | null
          streak_30_badge: boolean | null
          streak_days: number | null
          title: string
          truth_badge: boolean | null
          unblur_count: number | null
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          achieved_reward?: boolean | null
          anonymous_avatar_seed: string
          anonymous_username: string
          author_id?: string | null
          blurred?: boolean | null
          bot_alias?: string | null
          category_id?: string | null
          city?: string | null
          comment_count?: number | null
          content: string
          created_at?: string | null
          diamonds?: number | null
          downvotes?: number | null
          flags?: number | null
          id?: string
          image_url?: string | null
          is_bot?: boolean | null
          is_pinned?: boolean | null
          last_decay_at?: string | null
          locked?: boolean | null
          retired?: boolean | null
          retirement_date?: string | null
          state: string
          status?: string | null
          streak_30_badge?: boolean | null
          streak_days?: number | null
          title: string
          truth_badge?: boolean | null
          unblur_count?: number | null
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          achieved_reward?: boolean | null
          anonymous_avatar_seed?: string
          anonymous_username?: string
          author_id?: string | null
          blurred?: boolean | null
          bot_alias?: string | null
          category_id?: string | null
          city?: string | null
          comment_count?: number | null
          content?: string
          created_at?: string | null
          diamonds?: number | null
          downvotes?: number | null
          flags?: number | null
          id?: string
          image_url?: string | null
          is_bot?: boolean | null
          is_pinned?: boolean | null
          last_decay_at?: string | null
          locked?: boolean | null
          retired?: boolean | null
          retirement_date?: string | null
          state?: string
          status?: string | null
          streak_30_badge?: boolean | null
          streak_days?: number | null
          title?: string
          truth_badge?: boolean | null
          unblur_count?: number | null
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      friend_group_members: {
        Row: {
          friend_id: string
          group_id: string
          id: string
        }
        Insert: {
          friend_id: string
          group_id: string
          id?: string
        }
        Update: {
          friend_id?: string
          group_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friend_group_members_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friend_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "friend_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      friend_groups: {
        Row: {
          created_at: string
          display_order: number
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friend_groups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      friendships: {
        Row: {
          created_at: string
          friend_id: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id: string
          id?: string
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          friend_id?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      game_answers: {
        Row: {
          answer: string
          contestant_id: string
          created_at: string
          id: string
          question_id: string
        }
        Insert: {
          answer: string
          contestant_id: string
          created_at?: string
          id?: string
          question_id: string
        }
        Update: {
          answer?: string
          contestant_id?: string
          created_at?: string
          id?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_answers_contestant_id_fkey"
            columns: ["contestant_id"]
            isOneToOne: false
            referencedRelation: "game_contestants"
            referencedColumns: ["id"]
          },
        ]
      }
      game_chat: {
        Row: {
          created_at: string
          game_session_id: string
          id: string
          is_system_message: boolean | null
          message: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          game_session_id: string
          id?: string
          is_system_message?: boolean | null
          message: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          game_session_id?: string
          id?: string
          is_system_message?: boolean | null
          message?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_chat_game_session_id_fkey"
            columns: ["game_session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      game_contestants: {
        Row: {
          active: boolean
          age: number
          avatar: string | null
          bio: string | null
          created_at: string
          gender: string
          id: string
          location: string
          name: string
          voice_clip: string | null
        }
        Insert: {
          active?: boolean
          age: number
          avatar?: string | null
          bio?: string | null
          created_at?: string
          gender: string
          id?: string
          location: string
          name: string
          voice_clip?: string | null
        }
        Update: {
          active?: boolean
          age?: number
          avatar?: string | null
          bio?: string | null
          created_at?: string
          gender?: string
          id?: string
          location?: string
          name?: string
          voice_clip?: string | null
        }
        Relationships: []
      }
      game_endings: {
        Row: {
          created_at: string
          description: string
          ending_type: string
          id: string
          name: string
          personality_type: string
        }
        Insert: {
          created_at?: string
          description: string
          ending_type: string
          id?: string
          name: string
          personality_type: string
        }
        Update: {
          created_at?: string
          description?: string
          ending_type?: string
          id?: string
          name?: string
          personality_type?: string
        }
        Relationships: []
      }
      game_friends: {
        Row: {
          created_at: string
          friend_id: string | null
          id: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          friend_id?: string | null
          id?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          friend_id?: string | null
          id?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      game_leaderboards: {
        Row: {
          created_at: string
          game_type: string
          games_played: number
          id: string
          losses: number
          rank: number | null
          score: number
          updated_at: string
          user_id: string
          wins: number
        }
        Insert: {
          created_at?: string
          game_type: string
          games_played?: number
          id?: string
          losses?: number
          rank?: number | null
          score?: number
          updated_at?: string
          user_id: string
          wins?: number
        }
        Update: {
          created_at?: string
          game_type?: string
          games_played?: number
          id?: string
          losses?: number
          rank?: number | null
          score?: number
          updated_at?: string
          user_id?: string
          wins?: number
        }
        Relationships: []
      }
      game_matches: {
        Row: {
          bachelor_id: string
          contestant_id: string
          created_at: string
          id: string
          status: string
        }
        Insert: {
          bachelor_id: string
          contestant_id: string
          created_at?: string
          id?: string
          status?: string
        }
        Update: {
          bachelor_id?: string
          contestant_id?: string
          created_at?: string
          id?: string
          status?: string
        }
        Relationships: []
      }
      game_messages: {
        Row: {
          content: string
          created_at: string
          game_id: string
          id: string
          message_type: string
          recipient_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          game_id: string
          id?: string
          message_type?: string
          recipient_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          game_id?: string
          id?: string
          message_type?: string
          recipient_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_participants: {
        Row: {
          game_data: Json | null
          game_id: string
          id: string
          joined_at: string
          profile_data: Json | null
          queue_position: number | null
          role: string
          status: string
          user_id: string | null
        }
        Insert: {
          game_data?: Json | null
          game_id: string
          id?: string
          joined_at?: string
          profile_data?: Json | null
          queue_position?: number | null
          role?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          game_data?: Json | null
          game_id?: string
          id?: string
          joined_at?: string
          profile_data?: Json | null
          queue_position?: number | null
          role?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_participants_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_profiles: {
        Row: {
          best_time: number | null
          coins: number
          created_at: string
          current_stage: number
          has_vip: boolean
          id: string
          jump_boost_stages: number
          lives: number
          speed_boost_stages: number
          updated_at: string
          user_id: string | null
          username: string
        }
        Insert: {
          best_time?: number | null
          coins?: number
          created_at?: string
          current_stage?: number
          has_vip?: boolean
          id?: string
          jump_boost_stages?: number
          lives?: number
          speed_boost_stages?: number
          updated_at?: string
          user_id?: string | null
          username: string
        }
        Update: {
          best_time?: number | null
          coins?: number
          created_at?: string
          current_stage?: number
          has_vip?: boolean
          id?: string
          jump_boost_stages?: number
          lives?: number
          speed_boost_stages?: number
          updated_at?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      game_purchases: {
        Row: {
          cost: number
          created_at: string
          id: string
          item_type: string
          user_id: string | null
        }
        Insert: {
          cost: number
          created_at?: string
          id?: string
          item_type: string
          user_id?: string | null
        }
        Update: {
          cost?: number
          created_at?: string
          id?: string
          item_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      game_questions: {
        Row: {
          category: string
          created_at: string
          id: string
          pack_id: string | null
          text: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          pack_id?: string | null
          text: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          pack_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_questions_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "question_packs"
            referencedColumns: ["id"]
          },
        ]
      }
      game_red_flags: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          severity: number
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          severity?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          severity?: number
        }
        Relationships: []
      }
      game_results: {
        Row: {
          created_at: string
          game_type: string
          id: string
          position: number | null
          result: string | null
          score: number
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          game_type: string
          id?: string
          position?: number | null
          result?: string | null
          score?: number
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          game_type?: string
          id?: string
          position?: number | null
          result?: string | null
          score?: number
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      game_rounds: {
        Row: {
          ended_at: string | null
          game_session_id: string
          id: string
          prompt: string | null
          round_number: number
          round_type: string
          started_at: string
          status: string
        }
        Insert: {
          ended_at?: string | null
          game_session_id: string
          id?: string
          prompt?: string | null
          round_number: number
          round_type: string
          started_at?: string
          status?: string
        }
        Update: {
          ended_at?: string | null
          game_session_id?: string
          id?: string
          prompt?: string | null
          round_number?: number
          round_type?: string
          started_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_rounds_game_session_id_fkey"
            columns: ["game_session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      game_saves: {
        Row: {
          created_at: string
          id: string
          save_data: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          save_data: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          save_data?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      game_session_red_flags: {
        Row: {
          detected_at: string
          detected_by_user: boolean
          id: string
          post_id: number
          red_flag_id: string
        }
        Insert: {
          detected_at?: string
          detected_by_user?: boolean
          id?: string
          post_id: number
          red_flag_id: string
        }
        Update: {
          detected_at?: string
          detected_by_user?: boolean
          id?: string
          post_id?: number
          red_flag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_session_red_flags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_session_red_flags_red_flag_id_fkey"
            columns: ["red_flag_id"]
            isOneToOne: false
            referencedRelation: "game_red_flags"
            referencedColumns: ["id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          bachelor_id: string
          completed_at: string | null
          contestant_ids: string[]
          created_at: string
          id: string
          question_ids: string[]
          stage: string
        }
        Insert: {
          bachelor_id: string
          completed_at?: string | null
          contestant_ids: string[]
          created_at?: string
          id?: string
          question_ids: string[]
          stage?: string
        }
        Update: {
          bachelor_id?: string
          completed_at?: string | null
          contestant_ids?: string[]
          created_at?: string
          id?: string
          question_ids?: string[]
          stage?: string
        }
        Relationships: []
      }
      game_user_profiles: {
        Row: {
          admin_role: boolean | null
          background_check_status: string | null
          bio: string | null
          created_at: string
          dateguard_verified: boolean | null
          email: string | null
          gender: string | null
          ghosts_caught: number
          id: string
          id_verification_status: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          preferences: Json | null
          profile_completed: boolean | null
          profile_photo: string | null
          token_balance: number
          total_games_played: number
          total_score: number
          username: string | null
          verification_chain_id: string | null
        }
        Insert: {
          admin_role?: boolean | null
          background_check_status?: string | null
          bio?: string | null
          created_at?: string
          dateguard_verified?: boolean | null
          email?: string | null
          gender?: string | null
          ghosts_caught?: number
          id: string
          id_verification_status?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          preferences?: Json | null
          profile_completed?: boolean | null
          profile_photo?: string | null
          token_balance?: number
          total_games_played?: number
          total_score?: number
          username?: string | null
          verification_chain_id?: string | null
        }
        Update: {
          admin_role?: boolean | null
          background_check_status?: string | null
          bio?: string | null
          created_at?: string
          dateguard_verified?: boolean | null
          email?: string | null
          gender?: string | null
          ghosts_caught?: number
          id?: string
          id_verification_status?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          preferences?: Json | null
          profile_completed?: boolean | null
          profile_photo?: string | null
          token_balance?: number
          total_games_played?: number
          total_score?: number
          username?: string | null
          verification_chain_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_user_profiles_verification_chain_id_fkey"
            columns: ["verification_chain_id"]
            isOneToOne: false
            referencedRelation: "verification_chain"
            referencedColumns: ["id"]
          },
        ]
      }
      game_votes: {
        Row: {
          created_at: string
          game_id: string
          id: string
          subject_id: string | null
          vote_type: string
          vote_value: string
          voter_id: string
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: string
          subject_id?: string | null
          vote_type: string
          vote_value: string
          voter_id: string
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          subject_id?: string | null
          vote_type?: string
          vote_value?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_votes_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string
          current_phase: string | null
          current_players: number
          description: string | null
          host_id: string | null
          id: string
          max_players: number
          scheduled_time: string | null
          settings: Json | null
          slug: string | null
          status: string
          thumbnail: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          current_phase?: string | null
          current_players?: number
          description?: string | null
          host_id?: string | null
          id?: string
          max_players?: number
          scheduled_time?: string | null
          settings?: Json | null
          slug?: string | null
          status?: string
          thumbnail?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          current_phase?: string | null
          current_players?: number
          description?: string | null
          host_id?: string | null
          id?: string
          max_players?: number
          scheduled_time?: string | null
          settings?: Json | null
          slug?: string | null
          status?: string
          thumbnail?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      games_bots: {
        Row: {
          bot_id: string
          created_at: string | null
          game_id: string
          id: string
          personality: string | null
        }
        Insert: {
          bot_id: string
          created_at?: string | null
          game_id: string
          id?: string
          personality?: string | null
        }
        Update: {
          bot_id?: string
          created_at?: string | null
          game_id?: string
          id?: string
          personality?: string | null
        }
        Relationships: []
      }
      ghost_files: {
        Row: {
          contact_info: Json | null
          created_at: string
          description: string | null
          id: string
          is_private: boolean
          share_count: number | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_private?: boolean
          share_count?: number | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_private?: boolean
          share_count?: number | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      gift_audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          redemption_id: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          redemption_id?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          redemption_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gift_audit_logs_redemption_id_fkey"
            columns: ["redemption_id"]
            isOneToOne: false
            referencedRelation: "token_redemptions"
            referencedColumns: ["id"]
          },
        ]
      }
      global_leaderboard: {
        Row: {
          achievements_count: number
          created_at: string
          id: string
          level: number
          score: number
          trash_collected: number
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          achievements_count?: number
          created_at?: string
          id?: string
          level?: number
          score?: number
          trash_collected?: number
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          achievements_count?: number
          created_at?: string
          id?: string
          level?: number
          score?: number
          trash_collected?: number
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      group_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "group_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      group_invitations: {
        Row: {
          created_at: string
          group_id: string
          id: string
          inviter_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          inviter_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          inviter_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_invitations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_likes: {
        Row: {
          comment_id: string | null
          created_at: string
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "group_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "group_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          role: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_payouts: {
        Row: {
          created_at: string
          eligible: boolean
          group_id: string
          id: string
          month: string
          paid_out: boolean
          payout_amount: number
        }
        Insert: {
          created_at?: string
          eligible?: boolean
          group_id: string
          id?: string
          month: string
          paid_out?: boolean
          payout_amount?: number
        }
        Update: {
          created_at?: string
          eligible?: boolean
          group_id?: string
          id?: string
          month?: string
          paid_out?: boolean
          payout_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "group_payouts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          group_id: string
          id: string
          image_url: string | null
          is_premium: boolean
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          group_id: string
          id?: string
          image_url?: string | null
          is_premium?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          group_id?: string
          id?: string
          image_url?: string | null
          is_premium?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_posts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_sessions: {
        Row: {
          created_at: string
          group_id: string
          id: string
          session_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          session_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_sessions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_sessions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      group_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string
          current_period_start: string
          group_id: string
          id: string
          status: string
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end: string
          current_period_start?: string
          group_id: string
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          group_id?: string
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_subscriptions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          avatar_url: string | null
          created_at: string
          creator_id: string
          description: string | null
          earnings_enabled: boolean
          free_content_percentage: number
          id: string
          invite_code: string | null
          is_private: boolean
          monetized: boolean
          name: string
          stripe_price_id: string | null
          stripe_product_id: string | null
          subscriber_count: number
          subscription_price: number
          theme: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          earnings_enabled?: boolean
          free_content_percentage?: number
          id?: string
          invite_code?: string | null
          is_private?: boolean
          monetized?: boolean
          name: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          subscriber_count?: number
          subscription_price?: number
          theme?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          earnings_enabled?: boolean
          free_content_percentage?: number
          id?: string
          invite_code?: string | null
          is_private?: boolean
          monetized?: boolean
          name?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          subscriber_count?: number
          subscription_price?: number
          theme?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      habit_completions: {
        Row: {
          bonus_xp: number | null
          completed_at: string | null
          habit_id: string
          id: string
          user_id: string
          xp_earned: number | null
        }
        Insert: {
          bonus_xp?: number | null
          completed_at?: string | null
          habit_id: string
          id?: string
          user_id: string
          xp_earned?: number | null
        }
        Update: {
          bonus_xp?: number | null
          completed_at?: string | null
          habit_id?: string
          id?: string
          user_id?: string
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "habit_completions_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: string
          is_active: boolean | null
          streak_count: number | null
          title: string
          updated_at: string | null
          user_id: string
          xp_reward: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          streak_count?: number | null
          title: string
          updated_at?: string | null
          user_id: string
          xp_reward?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          streak_count?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      hall_of_shame_comment_votes: {
        Row: {
          comment_id: string
          created_at: string | null
          id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          comment_id: string
          created_at?: string | null
          id?: string
          user_id: string
          vote_type: string
        }
        Update: {
          comment_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "hall_of_shame_comment_votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "hall_of_shame_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      hall_of_shame_comments: {
        Row: {
          anonymous_username: string | null
          comment_text: string
          created_at: string | null
          downvotes: number | null
          id: string
          is_deleted: boolean | null
          parent_comment_id: string | null
          post_id: string
          updated_at: string | null
          upvotes: number | null
          user_emoji: string | null
          user_id: string
        }
        Insert: {
          anonymous_username?: string | null
          comment_text: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_deleted?: boolean | null
          parent_comment_id?: string | null
          post_id: string
          updated_at?: string | null
          upvotes?: number | null
          user_emoji?: string | null
          user_id: string
        }
        Update: {
          anonymous_username?: string | null
          comment_text?: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_deleted?: boolean | null
          parent_comment_id?: string | null
          post_id?: string
          updated_at?: string | null
          upvotes?: number | null
          user_emoji?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hall_of_shame_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "hall_of_shame_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hall_of_shame_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "hall_of_shame_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      hall_of_shame_posts: {
        Row: {
          age_range: string
          city: string
          comment_count: number | null
          created_at: string
          downvotes: number
          evidence_image_url: string | null
          first_name: string
          hidden: boolean | null
          id: string
          is_deleted: boolean
          last_name_initial: string
          message_text: string
          permanent: boolean | null
          personal_comment: string | null
          prompt_category: string | null
          selected_prompt: string | null
          state: string
          token_balance: number | null
          updated_at: string
          upvote_milestones: number | null
          upvotes: number
          user_id: string
        }
        Insert: {
          age_range: string
          city: string
          comment_count?: number | null
          created_at?: string
          downvotes?: number
          evidence_image_url?: string | null
          first_name: string
          hidden?: boolean | null
          id?: string
          is_deleted?: boolean
          last_name_initial: string
          message_text: string
          permanent?: boolean | null
          personal_comment?: string | null
          prompt_category?: string | null
          selected_prompt?: string | null
          state: string
          token_balance?: number | null
          updated_at?: string
          upvote_milestones?: number | null
          upvotes?: number
          user_id: string
        }
        Update: {
          age_range?: string
          city?: string
          comment_count?: number | null
          created_at?: string
          downvotes?: number
          evidence_image_url?: string | null
          first_name?: string
          hidden?: boolean | null
          id?: string
          is_deleted?: boolean
          last_name_initial?: string
          message_text?: string
          permanent?: boolean | null
          personal_comment?: string | null
          prompt_category?: string | null
          selected_prompt?: string | null
          state?: string
          token_balance?: number | null
          updated_at?: string
          upvote_milestones?: number | null
          upvotes?: number
          user_id?: string
        }
        Relationships: []
      }
      hall_of_shame_purchases: {
        Row: {
          amount: number
          created_at: string
          id: string
          status: string
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      hall_of_shame_votes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
          vote_type: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "hall_of_shame_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "hall_of_shame_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      help_donations: {
        Row: {
          donated_at: string
          donor_id: string
          help_request_id: string
          id: string
          tokens: number
        }
        Insert: {
          donated_at?: string
          donor_id: string
          help_request_id: string
          id?: string
          tokens: number
        }
        Update: {
          donated_at?: string
          donor_id?: string
          help_request_id?: string
          id?: string
          tokens?: number
        }
        Relationships: [
          {
            foreignKeyName: "help_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_donations_help_request_id_fkey"
            columns: ["help_request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      help_requests: {
        Row: {
          anon_name: string | null
          created_at: string
          id: string
          is_fulfilled: boolean
          reason: string
          tokens_received: number
          updated_at: string
          user_id: string
        }
        Insert: {
          anon_name?: string | null
          created_at?: string
          id?: string
          is_fulfilled?: boolean
          reason: string
          tokens_received?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          anon_name?: string | null
          created_at?: string
          id?: string
          is_fulfilled?: boolean
          reason?: string
          tokens_received?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "help_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_achievements: {
        Row: {
          achievement_type: string
          description: string | null
          icon: string | null
          id: string
          title: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_type: string
          description?: string | null
          icon?: string | null
          id?: string
          title: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_type?: string
          description?: string | null
          icon?: string | null
          id?: string
          title?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      hero_friendships: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          friend_id: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          friend_id: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          friend_id?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      heroes: {
        Row: {
          avatar_data: Json | null
          class: string
          created_at: string | null
          id: string
          level: number | null
          name: string
          streak: number | null
          updated_at: string | null
          user_id: string
          xp: number | null
        }
        Insert: {
          avatar_data?: Json | null
          class: string
          created_at?: string | null
          id?: string
          level?: number | null
          name: string
          streak?: number | null
          updated_at?: string | null
          user_id: string
          xp?: number | null
        }
        Update: {
          avatar_data?: Json | null
          class?: string
          created_at?: string | null
          id?: string
          level?: number | null
          name?: string
          streak?: number | null
          updated_at?: string | null
          user_id?: string
          xp?: number | null
        }
        Relationships: []
      }
      incidents: {
        Row: {
          created_at: string | null
          date: string
          description: string
          evidence_type: string[] | null
          flag_categories: string[] | null
          id: string
          is_anonymous: boolean | null
          location: string
          officer_id: string | null
          record_hash: string | null
          submitter_id: string | null
          updated_at: string | null
          verification_status: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          description: string
          evidence_type?: string[] | null
          flag_categories?: string[] | null
          id?: string
          is_anonymous?: boolean | null
          location: string
          officer_id?: string | null
          record_hash?: string | null
          submitter_id?: string | null
          updated_at?: string | null
          verification_status?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string
          evidence_type?: string[] | null
          flag_categories?: string[] | null
          id?: string
          is_anonymous?: boolean | null
          location?: string
          officer_id?: string | null
          record_hash?: string | null
          submitter_id?: string | null
          updated_at?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incidents_officer_id_fkey"
            columns: ["officer_id"]
            isOneToOne: false
            referencedRelation: "officers"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_followers: {
        Row: {
          created_at: string
          follower_id: string
          id: string
          influencer_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          id?: string
          influencer_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          id?: string
          influencer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "influencer_followers_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_profiles: {
        Row: {
          avatar_url: string | null
          bio: string
          created_at: string
          display_name: string
          followers_count: number
          games_hosted: number
          id: string
          is_verified: boolean
          social_links: Json
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string
          created_at?: string
          display_name: string
          followers_count?: number
          games_hosted?: number
          id?: string
          is_verified?: boolean
          social_links?: Json
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string
          created_at?: string
          display_name?: string
          followers_count?: number
          games_hosted?: number
          id?: string
          is_verified?: boolean
          social_links?: Json
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      investigations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      invite_codes: {
        Row: {
          code: string
          created_at: string
          creator_id: string
          expires_at: string
          id: string
          school_id: string
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          code: string
          created_at?: string
          creator_id: string
          expires_at?: string
          id?: string
          school_id: string
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          creator_id?: string
          expires_at?: string
          id?: string
          school_id?: string
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invite_codes_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboards: {
        Row: {
          completion_time: number
          created_at: string
          id: string
          stage_reached: number
          total_coins: number
          user_id: string | null
          username: string
        }
        Insert: {
          completion_time: number
          created_at?: string
          id?: string
          stage_reached: number
          total_coins: number
          user_id?: string | null
          username: string
        }
        Update: {
          completion_time?: number
          created_at?: string
          id?: string
          stage_reached?: number
          total_coins?: number
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      live_event_audience: {
        Row: {
          event_id: string
          id: string
          joined_at: string
          left_at: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          joined_at?: string
          left_at?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          joined_at?: string
          left_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_event_audience_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_event_cases: {
        Row: {
          audience_votes: number | null
          case_id: string
          created_at: string
          event_id: string
          id: string
          order_position: number
          status: string
          submitted_by: string | null
        }
        Insert: {
          audience_votes?: number | null
          case_id: string
          created_at?: string
          event_id: string
          id?: string
          order_position: number
          status: string
          submitted_by?: string | null
        }
        Update: {
          audience_votes?: number | null
          case_id?: string
          created_at?: string
          event_id?: string
          id?: string
          order_position?: number
          status?: string
          submitted_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_event_cases_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_event_cases_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_event_chat: {
        Row: {
          created_at: string
          event_id: string
          id: string
          is_system_message: boolean | null
          message: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          is_system_message?: boolean | null
          message: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          is_system_message?: boolean | null
          message?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_event_chat_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_event_contestants: {
        Row: {
          contestant_id: string
          created_at: string
          event_id: string
          id: string
          status: string
        }
        Insert: {
          contestant_id: string
          created_at?: string
          event_id: string
          id?: string
          status?: string
        }
        Update: {
          contestant_id?: string
          created_at?: string
          event_id?: string
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_event_contestants_contestant_id_fkey"
            columns: ["contestant_id"]
            isOneToOne: false
            referencedRelation: "game_contestants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_event_contestants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_event_reactions: {
        Row: {
          created_at: string
          event_id: string
          id: string
          reaction_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          reaction_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          reaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_event_reactions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_event_tips: {
        Row: {
          amount: number
          created_at: string
          event_id: string
          id: string
          message: string | null
          recipient_id: string | null
          recipient_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          event_id: string
          id?: string
          message?: string | null
          recipient_id?: string | null
          recipient_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          event_id?: string
          id?: string
          message?: string | null
          recipient_id?: string | null
          recipient_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_event_tips_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_events: {
        Row: {
          audience_count: number
          created_at: string
          description: string | null
          game_show_type: string | null
          host_avatar_url: string | null
          host_id: string
          id: string
          scheduled_time: string | null
          status: string
          title: string
        }
        Insert: {
          audience_count?: number
          created_at?: string
          description?: string | null
          game_show_type?: string | null
          host_avatar_url?: string | null
          host_id: string
          id?: string
          scheduled_time?: string | null
          status: string
          title: string
        }
        Update: {
          audience_count?: number
          created_at?: string
          description?: string | null
          game_show_type?: string | null
          host_avatar_url?: string | null
          host_id?: string
          id?: string
          scheduled_time?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          id: string
          story_id: string
          type: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          story_id: string
          type: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          story_id?: string
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      media_answers: {
        Row: {
          contestant_id: string | null
          created_at: string
          id: string
          media_type: string | null
          media_url: string | null
          question_id: string
          text_answer: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contestant_id?: string | null
          created_at?: string
          id?: string
          media_type?: string | null
          media_url?: string | null
          question_id: string
          text_answer?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contestant_id?: string | null
          created_at?: string
          id?: string
          media_type?: string | null
          media_url?: string | null
          question_id?: string
          text_answer?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          created_at: string | null
          id: string
          provider: string | null
          record_data: Json | null
          record_date: string
          record_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          provider?: string | null
          record_data?: Json | null
          record_date: string
          record_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          provider?: string | null
          record_data?: Json | null
          record_date?: string
          record_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      monitoring_rules: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          entity_id: string | null
          id: string
          investigation_id: string | null
          last_run: string | null
          next_run: string | null
          schedule_interval: string | null
          settings: Json | null
          transform_id: string | null
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          entity_id?: string | null
          id?: string
          investigation_id?: string | null
          last_run?: string | null
          next_run?: string | null
          schedule_interval?: string | null
          settings?: Json | null
          transform_id?: string | null
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          entity_id?: string | null
          id?: string
          investigation_id?: string | null
          last_run?: string | null
          next_run?: string | null
          schedule_interval?: string | null
          settings?: Json | null
          transform_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monitoring_rules_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoring_rules_investigation_id_fkey"
            columns: ["investigation_id"]
            isOneToOne: false
            referencedRelation: "investigations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoring_rules_transform_id_fkey"
            columns: ["transform_id"]
            isOneToOne: false
            referencedRelation: "transforms"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_subscriptions: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          last_scan_at: string | null
          monitoring_frequency: string
          next_scan_at: string | null
          target_profile_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_scan_at?: string | null
          monitoring_frequency?: string
          next_scan_at?: string | null
          target_profile_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_scan_at?: string | null
          monitoring_frequency?: string
          next_scan_at?: string | null
          target_profile_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "monitoring_subscriptions_target_profile_id_fkey"
            columns: ["target_profile_id"]
            isOneToOne: false
            referencedRelation: "scan_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_awards: {
        Row: {
          awarded_at: string
          id: string
          month: string
          reward_amount: number
          type: string
          winner_id: string
          winner_username: string | null
        }
        Insert: {
          awarded_at?: string
          id?: string
          month: string
          reward_amount: number
          type: string
          winner_id: string
          winner_username?: string | null
        }
        Update: {
          awarded_at?: string
          id?: string
          month?: string
          reward_amount?: number
          type?: string
          winner_id?: string
          winner_username?: string | null
        }
        Relationships: []
      }
      multiplayer_rooms: {
        Row: {
          created_at: string
          game_mode: string
          host_id: string
          id: string
          max_players: number
          name: string
          room_data: Json
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          game_mode: string
          host_id: string
          id?: string
          max_players?: number
          name: string
          room_data?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          game_mode?: string
          host_id?: string
          id?: string
          max_players?: number
          name?: string
          room_data?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      oauth_applications: {
        Row: {
          application_type: string | null
          client_id: string
          client_secret: string
          created_at: string
          description: string | null
          grant_types: string[] | null
          id: string
          is_active: boolean
          jwks_uri: string | null
          logo_uri: string | null
          name: string
          owner_user_id: string
          platform_type: string
          policy_uri: string | null
          rate_limit_per_hour: number
          rate_limit_tier_id: string | null
          redirect_uris: string[]
          response_types: string[] | null
          scopes: string[]
          token_endpoint_auth_method: string | null
          tos_uri: string | null
          updated_at: string
        }
        Insert: {
          application_type?: string | null
          client_id: string
          client_secret: string
          created_at?: string
          description?: string | null
          grant_types?: string[] | null
          id?: string
          is_active?: boolean
          jwks_uri?: string | null
          logo_uri?: string | null
          name: string
          owner_user_id: string
          platform_type: string
          policy_uri?: string | null
          rate_limit_per_hour?: number
          rate_limit_tier_id?: string | null
          redirect_uris?: string[]
          response_types?: string[] | null
          scopes?: string[]
          token_endpoint_auth_method?: string | null
          tos_uri?: string | null
          updated_at?: string
        }
        Update: {
          application_type?: string | null
          client_id?: string
          client_secret?: string
          created_at?: string
          description?: string | null
          grant_types?: string[] | null
          id?: string
          is_active?: boolean
          jwks_uri?: string | null
          logo_uri?: string | null
          name?: string
          owner_user_id?: string
          platform_type?: string
          policy_uri?: string | null
          rate_limit_per_hour?: number
          rate_limit_tier_id?: string | null
          redirect_uris?: string[]
          response_types?: string[] | null
          scopes?: string[]
          token_endpoint_auth_method?: string | null
          tos_uri?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "oauth_applications_rate_limit_tier_id_fkey"
            columns: ["rate_limit_tier_id"]
            isOneToOne: false
            referencedRelation: "rate_limit_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_authorization_codes: {
        Row: {
          application_id: string
          code: string
          code_challenge: string | null
          code_challenge_method: string | null
          created_at: string
          expires_at: string
          id: string
          redirect_uri: string
          scope: string[]
          state: string | null
          user_id: string | null
        }
        Insert: {
          application_id: string
          code: string
          code_challenge?: string | null
          code_challenge_method?: string | null
          created_at?: string
          expires_at: string
          id?: string
          redirect_uri: string
          scope?: string[]
          state?: string | null
          user_id?: string | null
        }
        Update: {
          application_id?: string
          code?: string
          code_challenge?: string | null
          code_challenge_method?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          redirect_uri?: string
          scope?: string[]
          state?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "oauth_authorization_codes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "oauth_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_tokens: {
        Row: {
          access_token: string
          application_id: string
          created_at: string
          expires_at: string
          id: string
          refresh_token: string | null
          revoked_at: string | null
          scopes: string[]
          token_type: string
          user_id: string
        }
        Insert: {
          access_token: string
          application_id: string
          created_at?: string
          expires_at: string
          id?: string
          refresh_token?: string | null
          revoked_at?: string | null
          scopes?: string[]
          token_type?: string
          user_id: string
        }
        Update: {
          access_token?: string
          application_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          refresh_token?: string | null
          revoked_at?: string | null
          scopes?: string[]
          token_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "oauth_tokens_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "oauth_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      officers: {
        Row: {
          aliases: string[] | null
          badge_number: string
          created_at: string | null
          department: string
          id: string
          location: Json
          updated_at: string | null
        }
        Insert: {
          aliases?: string[] | null
          badge_number: string
          created_at?: string | null
          department: string
          id?: string
          location?: Json
          updated_at?: string | null
        }
        Update: {
          aliases?: string[] | null
          badge_number?: string
          created_at?: string | null
          department?: string
          id?: string
          location?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      pattern_analysis: {
        Row: {
          analysis_result: Json | null
          created_at: string
          ghost_file_id: string
          ghosting_score: number | null
          id: string
          identified_patterns: string[] | null
          updated_at: string
        }
        Insert: {
          analysis_result?: Json | null
          created_at?: string
          ghost_file_id: string
          ghosting_score?: number | null
          id?: string
          identified_patterns?: string[] | null
          updated_at?: string
        }
        Update: {
          analysis_result?: Json | null
          created_at?: string
          ghost_file_id?: string
          ghosting_score?: number | null
          id?: string
          identified_patterns?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pattern_analysis_ghost_file_id_fkey"
            columns: ["ghost_file_id"]
            isOneToOne: false
            referencedRelation: "ghost_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pattern_analysis_ghost_file_id_fkey"
            columns: ["ghost_file_id"]
            isOneToOne: false
            referencedRelation: "shared_ghost_files_view"
            referencedColumns: ["id"]
          },
        ]
      }
      personality_questions: {
        Row: {
          category: string
          created_at: string
          id: string
          question_text: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          question_text: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          question_text?: string
        }
        Relationships: []
      }
      pitch_decks: {
        Row: {
          analysis_result: Json | null
          created_at: string
          error: string | null
          file_name: string
          file_path: string
          id: string
          overall_score: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_result?: Json | null
          created_at?: string
          error?: string | null
          file_name: string
          file_path: string
          id?: string
          overall_score?: number | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_result?: Json | null
          created_at?: string
          error?: string | null
          file_name?: string
          file_path?: string
          id?: string
          overall_score?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_connections: {
        Row: {
          connected_at: string | null
          connection_data: Json | null
          id: string
          last_synced: string | null
          platform_name: string
          platform_user_id: string
          status: string
          user_id: string
        }
        Insert: {
          connected_at?: string | null
          connection_data?: Json | null
          id?: string
          last_synced?: string | null
          platform_name: string
          platform_user_id: string
          status?: string
          user_id: string
        }
        Update: {
          connected_at?: string | null
          connection_data?: Json | null
          id?: string
          last_synced?: string | null
          platform_name?: string
          platform_user_id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_credentials: {
        Row: {
          created_at: string
          credentials: Json
          id: string
          is_active: boolean
          platform_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credentials: Json
          id?: string
          is_active?: boolean
          platform_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credentials?: Json
          id?: string
          is_active?: boolean
          platform_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_integrations: {
        Row: {
          access_credentials: Json | null
          created_at: string
          id: string
          integration_data: Json
          is_active: boolean
          last_sync_at: string | null
          platform_type: string
          platform_user_id: string
          platform_username: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_credentials?: Json | null
          created_at?: string
          id?: string
          integration_data?: Json
          is_active?: boolean
          last_sync_at?: string | null
          platform_type: string
          platform_user_id: string
          platform_username?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_credentials?: Json | null
          created_at?: string
          id?: string
          integration_data?: Json
          is_active?: boolean
          last_sync_at?: string | null
          platform_type?: string
          platform_user_id?: string
          platform_username?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      player_moves: {
        Row: {
          attachment_url: string | null
          content: string
          created_at: string
          id: string
          player_id: string
          round_id: string
        }
        Insert: {
          attachment_url?: string | null
          content: string
          created_at?: string
          id?: string
          player_id: string
          round_id: string
        }
        Update: {
          attachment_url?: string | null
          content?: string
          created_at?: string
          id?: string
          player_id?: string
          round_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_moves_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_moves_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "game_rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      player_personality_answers: {
        Row: {
          answer_text: string
          created_at: string
          id: string
          player_id: string | null
          question_id: string | null
          round_id: string | null
        }
        Insert: {
          answer_text: string
          created_at?: string
          id?: string
          player_id?: string | null
          question_id?: string | null
          round_id?: string | null
        }
        Update: {
          answer_text?: string
          created_at?: string
          id?: string
          player_id?: string | null
          question_id?: string | null
          round_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_personality_answers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_personality_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "personality_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_personality_answers_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "game_rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          avatar_url: string | null
          display_name: string
          game_session_id: string
          id: string
          joined_at: string
          status: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          display_name: string
          game_session_id: string
          id?: string
          joined_at?: string
          status?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          display_name?: string
          game_session_id?: string
          id?: string
          joined_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_game_session_id_fkey"
            columns: ["game_session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_options: {
        Row: {
          created_at: string
          id: string
          poll_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          poll_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          poll_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poll_options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          created_at: string
          creator_id: string | null
          expires_at: string
          id: string
          is_active: boolean
          is_custom: boolean
          question: string
          school_id: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          expires_at: string
          id?: string
          is_active?: boolean
          is_custom?: boolean
          question: string
          school_id: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          expires_at?: string
          id?: string
          is_active?: boolean
          is_custom?: boolean
          question?: string
          school_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "polls_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      post_analytics: {
        Row: {
          engagement_count: number | null
          event_type: string
          id: string
          post_id: number
          timestamp: string
          user_id: string | null
          view_count: number | null
        }
        Insert: {
          engagement_count?: number | null
          event_type: string
          id?: string
          post_id: number
          timestamp?: string
          user_id?: string | null
          view_count?: number | null
        }
        Update: {
          engagement_count?: number | null
          event_type?: string
          id?: string
          post_id?: number
          timestamp?: string
          user_id?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_analytics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comment_likes: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comment_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          likes: number | null
          parent_comment_id: string | null
          post_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          likes?: number | null
          parent_comment_id?: string | null
          post_id: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          likes?: number | null
          parent_comment_id?: string | null
          post_id?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: number
          user_id?: string
        }
        Relationships: []
      }
      post_media: {
        Row: {
          created_at: string | null
          id: string
          media_type: string
          media_url: string
          post_id: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          media_type: string
          media_url: string
          post_id: number
        }
        Update: {
          created_at?: string | null
          id?: string
          media_type?: string
          media_url?: string
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string | null
          id: string
          post_id: number
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: number
          reaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: number
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tips: {
        Row: {
          created_at: string
          id: string
          locked_until: string
          post_id: string
          refunded: boolean
          tipper_id: string
          token_amount: number
          transferred_to_pot: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          locked_until: string
          post_id: string
          refunded?: boolean
          tipper_id: string
          token_amount: number
          transferred_to_pot?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          locked_until?: string
          post_id?: string
          refunded?: boolean
          tipper_id?: string
          token_amount?: number
          transferred_to_pot?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "post_tips_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tips_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "recovery_champions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tips_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "retirement_archive_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tips_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "top_streaks_view"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          category: string | null
          comment_count: number | null
          content: string | null
          created_at: string | null
          flags: number | null
          id: number
          latitude: number | null
          likes: number | null
          location: string | null
          longitude: number | null
          pseudonym: string | null
          red_flags: string[] | null
          roast_level: string | null
          screenshots: string[] | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          verdict: string | null
        }
        Insert: {
          category?: string | null
          comment_count?: number | null
          content?: string | null
          created_at?: string | null
          flags?: number | null
          id?: never
          latitude?: number | null
          likes?: number | null
          location?: string | null
          longitude?: number | null
          pseudonym?: string | null
          red_flags?: string[] | null
          roast_level?: string | null
          screenshots?: string[] | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          verdict?: string | null
        }
        Update: {
          category?: string | null
          comment_count?: number | null
          content?: string | null
          created_at?: string | null
          flags?: number | null
          id?: never
          latitude?: number | null
          likes?: number | null
          location?: string | null
          longitude?: number | null
          pseudonym?: string | null
          red_flags?: string[] | null
          roast_level?: string | null
          screenshots?: string[] | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
          verdict?: string | null
        }
        Relationships: []
      }
      private_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          read_at: string | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read_at?: string | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          affiliate_code: string | null
          affiliate_earnings: number | null
          age: number | null
          avatar_url: string | null
          background_check_tokens: number | null
          color: string | null
          created_at: string | null
          email: string | null
          emoji: string | null
          forum_username: string | null
          id: string
          is_admin: boolean | null
          name: string | null
          persona: string | null
          school_id: string | null
          streak: number | null
          token_balance: number | null
          tokens: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          affiliate_code?: string | null
          affiliate_earnings?: number | null
          age?: number | null
          avatar_url?: string | null
          background_check_tokens?: number | null
          color?: string | null
          created_at?: string | null
          email?: string | null
          emoji?: string | null
          forum_username?: string | null
          id: string
          is_admin?: boolean | null
          name?: string | null
          persona?: string | null
          school_id?: string | null
          streak?: number | null
          token_balance?: number | null
          tokens?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          affiliate_code?: string | null
          affiliate_earnings?: number | null
          age?: number | null
          avatar_url?: string | null
          background_check_tokens?: number | null
          color?: string | null
          created_at?: string | null
          email?: string | null
          emoji?: string | null
          forum_username?: string | null
          id?: string
          is_admin?: boolean | null
          name?: string | null
          persona?: string | null
          school_id?: string | null
          streak?: number | null
          token_balance?: number | null
          tokens?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      question_packs: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string | null
          is_premium: boolean
          name: string
          price: number
          question_count: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          is_premium?: boolean
          name: string
          price?: number
          question_count?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          is_premium?: boolean
          name?: string
          price?: number
          question_count?: number
        }
        Relationships: []
      }
      race_chat: {
        Row: {
          created_at: string
          id: string
          message: string
          message_type: string
          race_session_id: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          message_type?: string
          race_session_id?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          message_type?: string
          race_session_id?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "race_chat_race_session_id_fkey"
            columns: ["race_session_id"]
            isOneToOne: false
            referencedRelation: "race_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      race_participants: {
        Row: {
          coins_earned: number
          current_stage: number
          final_position: number | null
          finished_at: string | null
          id: string
          joined_at: string
          lives: number
          race_session_id: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          coins_earned?: number
          current_stage?: number
          final_position?: number | null
          finished_at?: string | null
          id?: string
          joined_at?: string
          lives?: number
          race_session_id?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          coins_earned?: number
          current_stage?: number
          final_position?: number | null
          finished_at?: string | null
          id?: string
          joined_at?: string
          lives?: number
          race_session_id?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "race_participants_race_session_id_fkey"
            columns: ["race_session_id"]
            isOneToOne: false
            referencedRelation: "race_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      race_sessions: {
        Row: {
          created_at: string
          current_players: number
          finished_at: string | null
          host_user_id: string | null
          id: string
          max_players: number
          session_code: string
          stage_count: number
          started_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          current_players?: number
          finished_at?: string | null
          host_user_id?: string | null
          id?: string
          max_players?: number
          session_code: string
          stage_count?: number
          started_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          current_players?: number
          finished_at?: string | null
          host_user_id?: string | null
          id?: string
          max_players?: number
          session_code?: string
          stage_count?: number
          started_at?: string | null
          status?: string
        }
        Relationships: []
      }
      rate_limit_tiers: {
        Row: {
          burst_limit: number
          cost_per_request: number | null
          created_at: string
          id: string
          name: string
          requests_per_hour: number
          requests_per_minute: number
        }
        Insert: {
          burst_limit?: number
          cost_per_request?: number | null
          created_at?: string
          id?: string
          name: string
          requests_per_hour?: number
          requests_per_minute?: number
        }
        Update: {
          burst_limit?: number
          cost_per_request?: number | null
          created_at?: string
          id?: string
          name?: string
          requests_per_hour?: number
          requests_per_minute?: number
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          api_key_id: string | null
          calls_limit: number
          created_at: string | null
          endpoint: string | null
          id: string
          time_window_seconds: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          api_key_id?: string | null
          calls_limit: number
          created_at?: string | null
          endpoint?: string | null
          id?: string
          time_window_seconds: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          api_key_id?: string | null
          calls_limit?: number
          created_at?: string | null
          endpoint?: string | null
          id?: string
          time_window_seconds?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rate_limits_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      red_flag_votes: {
        Row: {
          created_at: string
          id: string
          is_red_flag: boolean
          red_flag_id: string
          round_id: string
          target_player_id: string
          voter_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_red_flag: boolean
          red_flag_id: string
          round_id: string
          target_player_id: string
          voter_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_red_flag?: boolean
          red_flag_id?: string
          round_id?: string
          target_player_id?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "red_flag_votes_red_flag_id_fkey"
            columns: ["red_flag_id"]
            isOneToOne: false
            referencedRelation: "game_red_flags"
            referencedColumns: ["id"]
          },
        ]
      }
      red_flags: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          is_custom: boolean
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          is_custom?: boolean
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          is_custom?: boolean
        }
        Relationships: []
      }
      referral_conversions: {
        Row: {
          conversion_type: string
          created_at: string
          id: string
          referral_code: string
          referred_user_id: string
          referrer_id: string
        }
        Insert: {
          conversion_type?: string
          created_at?: string
          id?: string
          referral_code: string
          referred_user_id: string
          referrer_id: string
        }
        Update: {
          conversion_type?: string
          created_at?: string
          id?: string
          referral_code?: string
          referred_user_id?: string
          referrer_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_email: string
          referred_user_id: string | null
          referrer_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_email: string
          referred_user_id?: string | null
          referrer_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_email?: string
          referred_user_id?: string | null
          referrer_id?: string
          status?: string
        }
        Relationships: []
      }
      relationships: {
        Row: {
          confidence: number | null
          created_at: string
          id: string
          investigation_id: string | null
          label: string | null
          metadata: Json | null
          source_id: string | null
          target_id: string | null
          type: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          id?: string
          investigation_id?: string | null
          label?: string | null
          metadata?: Json | null
          source_id?: string | null
          target_id?: string | null
          type: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          id?: string
          investigation_id?: string | null
          label?: string | null
          metadata?: Json | null
          source_id?: string | null
          target_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "relationships_investigation_id_fkey"
            columns: ["investigation_id"]
            isOneToOne: false
            referencedRelation: "investigations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relationships_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relationships_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          additional_info: string | null
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          reason: string
          reporter_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          additional_info?: string | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          reason: string
          reporter_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          additional_info?: string | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          reason?: string
          reporter_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      revealed_votes: {
        Row: {
          created_at: string
          id: string
          poll_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          poll_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          poll_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "revealed_votes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      revenue_stats: {
        Row: {
          id: number
          jackpots_awarded: number | null
          total_usd: number | null
        }
        Insert: {
          id?: number
          jackpots_awarded?: number | null
          total_usd?: number | null
        }
        Update: {
          id?: number
          jackpots_awarded?: number | null
          total_usd?: number | null
        }
        Relationships: []
      }
      room_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order: number
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      room_participants: {
        Row: {
          id: string
          is_ready: boolean
          joined_at: string
          room_id: string
          score: number
          user_id: string
          username: string
        }
        Insert: {
          id?: string
          is_ready?: boolean
          joined_at?: string
          room_id: string
          score?: number
          user_id: string
          username: string
        }
        Update: {
          id?: string
          is_ready?: boolean
          joined_at?: string
          room_id?: string
          score?: number
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "multiplayer_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_reports: {
        Row: {
          created_at: string | null
          description: string | null
          evidence_links: string[] | null
          id: string
          platform: string
          report_type: string
          reported_profile_url: string | null
          reported_username: string
          reporter_id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          evidence_links?: string[] | null
          id?: string
          platform: string
          report_type: string
          reported_profile_url?: string | null
          reported_username: string
          reporter_id: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          evidence_links?: string[] | null
          id?: string
          platform?: string
          report_type?: string
          reported_profile_url?: string | null
          reported_username?: string
          reporter_id?: string
          status?: string | null
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          created_at: string
          filters: Json | null
          id: string
          name: string
          search_term: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          filters?: Json | null
          id?: string
          name: string
          search_term?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          filters?: Json | null
          id?: string
          name?: string
          search_term?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scan_analytics: {
        Row: {
          content_items_analyzed: number
          created_at: string
          id: string
          platforms_analyzed: Json
          scan_duration_ms: number | null
          scan_report_id: string | null
          scan_type: string
          tokens_consumed: number
          user_id: string
        }
        Insert: {
          content_items_analyzed?: number
          created_at?: string
          id?: string
          platforms_analyzed: Json
          scan_duration_ms?: number | null
          scan_report_id?: string | null
          scan_type: string
          tokens_consumed?: number
          user_id: string
        }
        Update: {
          content_items_analyzed?: number
          created_at?: string
          id?: string
          platforms_analyzed?: Json
          scan_duration_ms?: number | null
          scan_report_id?: string | null
          scan_type?: string
          tokens_consumed?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scan_analytics_scan_report_id_fkey"
            columns: ["scan_report_id"]
            isOneToOne: false
            referencedRelation: "scan_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_reports: {
        Row: {
          analyzed_content: Json | null
          behavior_report: Json | null
          content_moderation: Json | null
          created_at: string
          flagged_content: Json | null
          id: string
          pdf_url: string | null
          platforms: Json | null
          profile_data: Json | null
          risk_score: number | null
          search_term: string
          search_type: string
          sentiment_data: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analyzed_content?: Json | null
          behavior_report?: Json | null
          content_moderation?: Json | null
          created_at?: string
          flagged_content?: Json | null
          id?: string
          pdf_url?: string | null
          platforms?: Json | null
          profile_data?: Json | null
          risk_score?: number | null
          search_term: string
          search_type: string
          sentiment_data?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analyzed_content?: Json | null
          behavior_report?: Json | null
          content_moderation?: Json | null
          created_at?: string
          flagged_content?: Json | null
          id?: string
          pdf_url?: string | null
          platforms?: Json | null
          profile_data?: Json | null
          risk_score?: number | null
          search_term?: string
          search_type?: string
          sentiment_data?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scheduled_replies: {
        Row: {
          approved_by: string | null
          bot_id: string
          comment_id: string | null
          content: string
          created_at: string
          id: string
          post_id: string | null
          scheduled_at: string | null
          status: string
          thread_id: string | null
          updated_at: string
        }
        Insert: {
          approved_by?: string | null
          bot_id: string
          comment_id?: string | null
          content: string
          created_at?: string
          id?: string
          post_id?: string | null
          scheduled_at?: string | null
          status?: string
          thread_id?: string | null
          updated_at?: string
        }
        Update: {
          approved_by?: string | null
          bot_id?: string
          comment_id?: string | null
          content?: string
          created_at?: string
          id?: string
          post_id?: string | null
          scheduled_at?: string | null
          status?: string
          thread_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_replies_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bot_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "forum_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "recovery_champions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "retirement_archive_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "top_streaks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "recovery_champions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "retirement_archive_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_replies_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "top_streaks_view"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      screenshots: {
        Row: {
          created_at: string | null
          id: number
          image_url: string
          post_id: number
        }
        Insert: {
          created_at?: string | null
          id?: never
          image_url: string
          post_id: number
        }
        Update: {
          created_at?: string | null
          id?: never
          image_url?: string
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "screenshots_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      search_history: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          query: string | null
          scan_report_id: string | null
          search_type: string
          tokens_used: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          query?: string | null
          scan_report_id?: string | null
          search_type: string
          tokens_used: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          query?: string | null
          scan_report_id?: string | null
          search_type?: string
          tokens_used?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_history_scan_report_id_fkey"
            columns: ["scan_report_id"]
            isOneToOne: false
            referencedRelation: "scan_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      search_logs: {
        Row: {
          created_at: string
          id: string
          search_data: Json | null
          search_type: string
          tokens_spent: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          search_data?: Json | null
          search_type: string
          tokens_spent?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          search_data?: Json | null
          search_type?: string
          tokens_spent?: number | null
          user_id?: string
        }
        Relationships: []
      }
      search_reports: {
        Row: {
          created_at: string
          display_name: string
          download_count: number
          file_path: string
          file_size: number | null
          file_url: string | null
          id: string
          is_public: boolean
          report_type: string
          session_id: string
          subject_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name: string
          download_count?: number
          file_path: string
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_public?: boolean
          report_type: string
          session_id: string
          subject_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          download_count?: number
          file_path?: string
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_public?: boolean
          report_type?: string
          session_id?: string
          subject_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_reports_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "search_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      search_results: {
        Row: {
          created_at: string | null
          id: string
          profile_id: string | null
          result_data: Json | null
          search_query: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_id?: string | null
          result_data?: Json | null
          search_query: string
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_id?: string | null
          result_data?: Json | null
          search_query?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_search_results_profile"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_results_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      search_sessions: {
        Row: {
          actual_cost: number
          ai_summary: string | null
          created_at: string
          estimated_cost: number
          id: string
          original_query: string
          raw_results: Json | null
          recommended_searches: Json
          session_name: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_cost?: number
          ai_summary?: string | null
          created_at?: string
          estimated_cost?: number
          id?: string
          original_query: string
          raw_results?: Json | null
          recommended_searches?: Json
          session_name?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_cost?: number
          ai_summary?: string | null
          created_at?: string
          estimated_cost?: number
          id?: string
          original_query?: string
          raw_results?: Json | null
          recommended_searches?: Json
          session_name?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      searches: {
        Row: {
          follow_up_flags: Json | null
          id: string
          input_data: Json
          result_url: string | null
          search_result: Json | null
          search_type: string
          status: string
          timestamp: string
          tokens_used: number
          user_id: string
        }
        Insert: {
          follow_up_flags?: Json | null
          id?: string
          input_data: Json
          result_url?: string | null
          search_result?: Json | null
          search_type: string
          status?: string
          timestamp?: string
          tokens_used: number
          user_id: string
        }
        Update: {
          follow_up_flags?: Json | null
          id?: string
          input_data?: Json
          result_url?: string | null
          search_result?: Json | null
          search_type?: string
          status?: string
          timestamp?: string
          tokens_used?: number
          user_id?: string
        }
        Relationships: []
      }
      security_audit_logs: {
        Row: {
          action: string
          created_at: string
          error_message: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          resource: string | null
          success: boolean
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          resource?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          resource?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string
          details: Json
          event_type: string
          id: string
          ip_address: string | null
          session_id: string | null
          severity: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json
          event_type: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          severity: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json
          event_type?: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          severity?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          created_at: string
          host_id: string
          id: string
          session_type: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          host_id: string
          id?: string
          session_type?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          host_id?: string
          id?: string
          session_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      shared_ghost_files: {
        Row: {
          access_code: string
          anonymized: boolean
          created_at: string
          expires_at: string
          ghost_file_id: string
          id: string
          share_type: string
        }
        Insert: {
          access_code: string
          anonymized?: boolean
          created_at?: string
          expires_at: string
          ghost_file_id: string
          id?: string
          share_type?: string
        }
        Update: {
          access_code?: string
          anonymized?: boolean
          created_at?: string
          expires_at?: string
          ghost_file_id?: string
          id?: string
          share_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_ghost_files_ghost_file_id_fkey"
            columns: ["ghost_file_id"]
            isOneToOne: false
            referencedRelation: "ghost_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_ghost_files_ghost_file_id_fkey"
            columns: ["ghost_file_id"]
            isOneToOne: false
            referencedRelation: "shared_ghost_files_view"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_usage: {
        Row: {
          created_at: string
          id: string
          media_url: boolean | null
          message_body: string
          message_type: string | null
          phone_number: string
          recipient: string
          status: string
          twilio_message_sid: string | null
          twilio_messaging_service_sid: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          media_url?: boolean | null
          message_body: string
          message_type?: string | null
          phone_number: string
          recipient: string
          status?: string
          twilio_message_sid?: string | null
          twilio_messaging_service_sid?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          media_url?: boolean | null
          message_body?: string
          message_type?: string | null
          phone_number?: string
          recipient?: string
          status?: string
          twilio_message_sid?: string | null
          twilio_messaging_service_sid?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      social_media_platforms: {
        Row: {
          active: boolean
          base_url: string | null
          created_at: string
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          base_url?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          active?: boolean
          base_url?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      social_profiles: {
        Row: {
          created_at: string
          discovered_via: string | null
          display_name: string | null
          followers: number | null
          id: string
          last_active: string | null
          mentions: number | null
          platform_id: string | null
          platform_name: string | null
          profile_url: string
          recent_mentions: number | null
          search_results: number | null
          sentiment: string | null
          updated_at: string
          user_id: string | null
          username: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          discovered_via?: string | null
          display_name?: string | null
          followers?: number | null
          id?: string
          last_active?: string | null
          mentions?: number | null
          platform_id?: string | null
          platform_name?: string | null
          profile_url: string
          recent_mentions?: number | null
          search_results?: number | null
          sentiment?: string | null
          updated_at?: string
          user_id?: string | null
          username: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          discovered_via?: string | null
          display_name?: string | null
          followers?: number | null
          id?: string
          last_active?: string | null
          mentions?: number | null
          platform_id?: string | null
          platform_name?: string | null
          profile_url?: string
          recent_mentions?: number | null
          search_results?: number | null
          sentiment?: string | null
          updated_at?: string
          user_id?: string | null
          username?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "social_profiles_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "social_media_platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      spins: {
        Row: {
          created_at: string | null
          id: string
          prize_description: string | null
          result: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          prize_description?: string | null
          result: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          prize_description?: string | null
          result?: number
          user_id?: string
        }
        Relationships: []
      }
      spinwheel_logs: {
        Row: {
          created_at: string
          id: string
          prize_type: string
          token_amount: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          prize_type: string
          token_amount?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          prize_type?: string
          token_amount?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      stories: {
        Row: {
          comments_count: number | null
          content: string
          created_at: string
          id: string
          likes: number | null
          title: string
          updated_at: string
          user_id: string
          views: number | null
        }
        Insert: {
          comments_count?: number | null
          content: string
          created_at?: string
          id?: string
          likes?: number | null
          title: string
          updated_at?: string
          user_id: string
          views?: number | null
        }
        Update: {
          comments_count?: number | null
          content?: string
          created_at?: string
          id?: string
          likes?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          views?: number | null
        }
        Relationships: []
      }
      story_likes: {
        Row: {
          created_at: string
          id: string
          story_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          story_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_likes_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          broadcasting_enabled: boolean | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          email_notifications_enabled: boolean
          id: string
          phone: string | null
          phone_verified: boolean
          postal_code: string | null
          sms_credits_remaining: number
          state: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_period_end: string | null
          subscription_period_start: string | null
          subscription_plan_id: string | null
          subscription_status: string
          subscription_tier: string | null
          subscription_type: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          broadcasting_enabled?: boolean | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          email_notifications_enabled?: boolean
          id?: string
          phone?: string | null
          phone_verified?: boolean
          postal_code?: string | null
          sms_credits_remaining?: number
          state?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_period_end?: string | null
          subscription_period_start?: string | null
          subscription_plan_id?: string | null
          subscription_status?: string
          subscription_tier?: string | null
          subscription_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          broadcasting_enabled?: boolean | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          email_notifications_enabled?: boolean
          id?: string
          phone?: string | null
          phone_verified?: boolean
          postal_code?: string | null
          sms_credits_remaining?: number
          state?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_period_end?: string | null
          subscription_period_start?: string | null
          subscription_plan_id?: string | null
          subscription_status?: string
          subscription_tier?: string | null
          subscription_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscribers_subscription_plan_id_fkey"
            columns: ["subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean
          name: string
          price_monthly: number
          price_yearly: number | null
          sms_credits: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean
          name: string
          price_monthly: number
          price_yearly?: number | null
          sms_credits?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean
          name?: string
          price_monthly?: number
          price_yearly?: number | null
          sms_credits?: number
          updated_at?: string
        }
        Relationships: []
      }
      system_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          severity: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          severity?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          severity?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category: string | null
          completed: boolean | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          points: number | null
          title: string
          user_id: string
        }
        Insert: {
          category?: string | null
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          points?: number | null
          title: string
          user_id: string
        }
        Update: {
          category?: string | null
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          points?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          completed: boolean
          created_at: string
          description: string
          id: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          description: string
          id?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          description?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      token_history: {
        Row: {
          change: number
          created_at: string
          id: string
          reason: string
          user_id: string
        }
        Insert: {
          change: number
          created_at?: string
          id?: string
          reason: string
          user_id: string
        }
        Update: {
          change?: number
          created_at?: string
          id?: string
          reason?: string
          user_id?: string
        }
        Relationships: []
      }
      token_purchases: {
        Row: {
          amount_paid: number
          id: string
          source: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          timestamp: string
          tokens_purchased: number
          user_id: string | null
        }
        Insert: {
          amount_paid: number
          id?: string
          source: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          timestamp?: string
          tokens_purchased: number
          user_id?: string | null
        }
        Update: {
          amount_paid?: number
          id?: string
          source?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          timestamp?: string
          tokens_purchased?: number
          user_id?: string | null
        }
        Relationships: []
      }
      token_redemptions: {
        Row: {
          admin_notes: string | null
          audit_log: Json | null
          gift_id: string | null
          id: string
          payout_status: string | null
          processed_at: string | null
          requested_at: string
          reward_type: string
          status: string
          token_amount: number
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          audit_log?: Json | null
          gift_id?: string | null
          id?: string
          payout_status?: string | null
          processed_at?: string | null
          requested_at?: string
          reward_type?: string
          status?: string
          token_amount: number
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          audit_log?: Json | null
          gift_id?: string | null
          id?: string
          payout_status?: string | null
          processed_at?: string | null
          requested_at?: string
          reward_type?: string
          status?: string
          token_amount?: number
          user_id?: string
        }
        Relationships: []
      }
      token_tips: {
        Row: {
          amount: number
          created_at: string
          id: string
          message: string | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          message?: string | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          message?: string | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          plan_id: string | null
          referral_code: string | null
          referred_by_affiliate_id: string | null
          stripe_payment_id: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          plan_id?: string | null
          referral_code?: string | null
          referred_by_affiliate_id?: string | null
          stripe_payment_id?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          plan_id?: string | null
          referral_code?: string | null
          referred_by_affiliate_id?: string | null
          stripe_payment_id?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_referred_by_affiliate_id_fkey"
            columns: ["referred_by_affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      token_usage_log: {
        Row: {
          created_at: string
          description: string | null
          help_request_id: string | null
          id: string
          tokens_spent: number
          usage_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          help_request_id?: string | null
          id?: string
          tokens_spent: number
          usage_type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          help_request_id?: string | null
          id?: string
          tokens_spent?: number
          usage_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_usage_log_help_request_id_fkey"
            columns: ["help_request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "token_usage_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          balance: number
          user_id: string
        }
        Insert: {
          balance?: number
          user_id: string
        }
        Update: {
          balance?: number
          user_id?: string
        }
        Relationships: []
      }
      tournament_participants: {
        Row: {
          best_time: number | null
          final_position: number | null
          gems_won: number
          id: string
          joined_at: string
          tournament_id: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          best_time?: number | null
          final_position?: number | null
          gems_won?: number
          id?: string
          joined_at?: string
          tournament_id?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          best_time?: number | null
          final_position?: number | null
          gems_won?: number
          id?: string
          joined_at?: string
          tournament_id?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_participants_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string
          current_participants: number
          description: string | null
          ends_at: string
          entry_fee_gems: number
          id: string
          max_participants: number
          name: string
          prize_pool_gems: number
          starts_at: string
          status: string
        }
        Insert: {
          created_at?: string
          current_participants?: number
          description?: string | null
          ends_at: string
          entry_fee_gems?: number
          id?: string
          max_participants?: number
          name: string
          prize_pool_gems?: number
          starts_at: string
          status?: string
        }
        Update: {
          created_at?: string
          current_participants?: number
          description?: string | null
          ends_at?: string
          entry_fee_gems?: number
          id?: string
          max_participants?: number
          name?: string
          prize_pool_gems?: number
          starts_at?: string
          status?: string
        }
        Relationships: []
      }
      transforms: {
        Row: {
          created_at: string
          description: string | null
          endpoint: string | null
          id: string
          name: string
          provider: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          endpoint?: string | null
          id?: string
          name: string
          provider: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          endpoint?: string | null
          id?: string
          name?: string
          provider?: string
          updated_at?: string
        }
        Relationships: []
      }
      twins: {
        Row: {
          created_at: string
          data: Json
          description: string | null
          id: string
          name: string | null
          updated_at: string
          user_id: string
          voice_model_id: string | null
          voice_samples: Json | null
          voice_settings: Json | null
        }
        Insert: {
          created_at?: string
          data: Json
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string
          user_id: string
          voice_model_id?: string | null
          voice_samples?: Json | null
          voice_settings?: Json | null
        }
        Update: {
          created_at?: string
          data?: Json
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string
          user_id?: string
          voice_model_id?: string | null
          voice_samples?: Json | null
          voice_settings?: Json | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements_tracking: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_ai_preferences: {
        Row: {
          created_at: string
          id: string
          preference_data: Json | null
          preferred_host: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          preference_data?: Json | null
          preferred_host?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          preference_data?: Json | null
          preferred_host?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string | null
          id: string
          reason: string | null
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      user_coins: {
        Row: {
          balance: number
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_contestants: {
        Row: {
          contestant_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          contestant_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          contestant_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_daily_progress: {
        Row: {
          challenge_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          progress_count: number
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          progress_count?: number
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          progress_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_daily_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_endings: {
        Row: {
          ending_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          ending_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          ending_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_endings_ending_id_fkey"
            columns: ["ending_id"]
            isOneToOne: false
            referencedRelation: "game_endings"
            referencedColumns: ["id"]
          },
        ]
      }
      user_friends: {
        Row: {
          created_at: string
          friend_id: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          friend_id?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_friends_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_friends_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_onboarding_progress: {
        Row: {
          completed_at: string
          created_at: string
          id: string
          step_name: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          id?: string
          step_name: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          id?: string
          step_name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          age: string | null
          avatar: string | null
          chat_coins: number
          custom_status: string | null
          id: string
          interests: string | null
          joined_at: string
          last_active: string | null
          location: string | null
          nickname: string
          sex: string | null
          status: string | null
          theme: string | null
          total_messages: number
        }
        Insert: {
          age?: string | null
          avatar?: string | null
          chat_coins?: number
          custom_status?: string | null
          id: string
          interests?: string | null
          joined_at?: string
          last_active?: string | null
          location?: string | null
          nickname: string
          sex?: string | null
          status?: string | null
          theme?: string | null
          total_messages?: number
        }
        Update: {
          age?: string | null
          avatar?: string | null
          chat_coins?: number
          custom_status?: string | null
          id?: string
          interests?: string | null
          joined_at?: string
          last_active?: string | null
          location?: string | null
          nickname?: string
          sex?: string | null
          status?: string | null
          theme?: string | null
          total_messages?: number
        }
        Relationships: []
      }
      user_question_packs: {
        Row: {
          id: string
          pack_id: string
          purchased_at: string
          user_id: string
        }
        Insert: {
          id?: string
          pack_id: string
          purchased_at?: string
          user_id: string
        }
        Update: {
          id?: string
          pack_id?: string
          purchased_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_question_packs_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "question_packs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_red_flags: {
        Row: {
          conversation_id: string | null
          created_at: string
          custom_description: string | null
          id: string
          red_flag_id: string
          user_email: string
          user_phone: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          custom_description?: string | null
          id?: string
          red_flag_id: string
          user_email: string
          user_phone?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          custom_description?: string | null
          id?: string
          red_flag_id?: string
          user_email?: string
          user_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_red_flags_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_red_flags_red_flag_id_fkey"
            columns: ["red_flag_id"]
            isOneToOne: false
            referencedRelation: "red_flags"
            referencedColumns: ["id"]
          },
        ]
      }
      user_referrals: {
        Row: {
          coins_earned: number
          created_at: string
          id: string
          referral_code: string
          referral_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          coins_earned?: number
          created_at?: string
          id?: string
          referral_code: string
          referral_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          coins_earned?: number
          created_at?: string
          id?: string
          referral_code?: string
          referral_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_reports: {
        Row: {
          created_at: string
          details: string | null
          id: string
          reason: string
          reported_by: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          target_user_id: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          reason: string
          reported_by: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          target_user_id: string
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          reason?: string
          reported_by?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          target_user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          analytics_enabled: boolean | null
          api_usage_limit: number
          created_at: string
          default_scan_depth: string
          help_enabled: boolean | null
          notification_preferences: Json
          onboarding_completed: boolean | null
          settings_data: Json | null
          theme_preference: string
          updated_at: string
          user_id: string
        }
        Insert: {
          analytics_enabled?: boolean | null
          api_usage_limit?: number
          created_at?: string
          default_scan_depth?: string
          help_enabled?: boolean | null
          notification_preferences?: Json
          onboarding_completed?: boolean | null
          settings_data?: Json | null
          theme_preference?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          analytics_enabled?: boolean | null
          api_usage_limit?: number
          created_at?: string
          default_scan_depth?: string
          help_enabled?: boolean | null
          notification_preferences?: Json
          onboarding_completed?: boolean | null
          settings_data?: Json | null
          theme_preference?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          comments_made: number
          created_at: string
          current_streak: number
          last_login_date: string | null
          level: number
          longest_streak: number
          posts_created: number
          searches_completed: number
          total_points: number
          updated_at: string
          user_id: string
          votes_cast: number
        }
        Insert: {
          comments_made?: number
          created_at?: string
          current_streak?: number
          last_login_date?: string | null
          level?: number
          longest_streak?: number
          posts_created?: number
          searches_completed?: number
          total_points?: number
          updated_at?: string
          user_id: string
          votes_cast?: number
        }
        Update: {
          comments_made?: number
          created_at?: string
          current_streak?: number
          last_login_date?: string | null
          level?: number
          longest_streak?: number
          posts_created?: number
          searches_completed?: number
          total_points?: number
          updated_at?: string
          user_id?: string
          votes_cast?: number
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          created_at: string
          current_streak: number
          id: string
          last_action_date: string | null
          longest_streak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number
          id?: string
          last_action_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number
          id?: string
          last_action_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_verification: {
        Row: {
          created_at: string
          expires_at: string | null
          external_id: string | null
          id: string
          updated_at: string
          user_id: string
          verification_chain_id: string | null
          verification_data: Json | null
          verification_provider: string
          verification_status: string
          verification_type: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          external_id?: string | null
          id?: string
          updated_at?: string
          user_id: string
          verification_chain_id?: string | null
          verification_data?: Json | null
          verification_provider: string
          verification_status?: string
          verification_type: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          external_id?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          verification_chain_id?: string | null
          verification_data?: Json | null
          verification_provider?: string
          verification_status?: string
          verification_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_verification_verification_chain_id_fkey"
            columns: ["verification_chain_id"]
            isOneToOne: false
            referencedRelation: "verification_chain"
            referencedColumns: ["id"]
          },
        ]
      }
      user_verification_requests: {
        Row: {
          created_at: string
          id: string
          image_url: string
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
          user_id: string
          verification_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id: string
          verification_type: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          verification_type?: string
        }
        Relationships: []
      }
      user_verification_status: {
        Row: {
          background_check_status: string | null
          created_at: string | null
          document_url: string | null
          document_verification_status: string | null
          id: string
          selfie_url: string | null
          selfie_verification_status: string | null
          updated_at: string | null
          user_id: string
          verification_level: string | null
        }
        Insert: {
          background_check_status?: string | null
          created_at?: string | null
          document_url?: string | null
          document_verification_status?: string | null
          id?: string
          selfie_url?: string | null
          selfie_verification_status?: string | null
          updated_at?: string | null
          user_id: string
          verification_level?: string | null
        }
        Update: {
          background_check_status?: string | null
          created_at?: string | null
          document_url?: string | null
          document_verification_status?: string | null
          id?: string
          selfie_url?: string | null
          selfie_verification_status?: string | null
          updated_at?: string | null
          user_id?: string
          verification_level?: string | null
        }
        Relationships: []
      }
      user_verifications: {
        Row: {
          created_at: string | null
          id: string
          status: string
          updated_at: string | null
          user_id: string
          verification_data: Json | null
          verification_type: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string
          updated_at?: string | null
          user_id: string
          verification_data?: Json | null
          verification_type: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
          verification_data?: Json | null
          verification_type?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          anon_avatar: string | null
          anon_name: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          hall_of_shame_access: boolean | null
          id: string
          last_renewal_date: string | null
          role: string | null
          subscription_status: string | null
          token_balance: number | null
          updated_at: string | null
        }
        Insert: {
          anon_avatar?: string | null
          anon_name?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          hall_of_shame_access?: boolean | null
          id?: string
          last_renewal_date?: string | null
          role?: string | null
          subscription_status?: string | null
          token_balance?: number | null
          updated_at?: string | null
        }
        Update: {
          anon_avatar?: string | null
          anon_name?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          hall_of_shame_access?: boolean | null
          id?: string
          last_renewal_date?: string | null
          role?: string | null
          subscription_status?: string | null
          token_balance?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      verification_badges: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          level: number
          name: string
          requirements: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          level?: number
          name: string
          requirements?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          level?: number
          name?: string
          requirements?: string | null
        }
        Relationships: []
      }
      verification_chain: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          last_verified_at: string | null
          updated_at: string
          user_id: string
          verification_level: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_verified_at?: string | null
          updated_at?: string
          user_id: string
          verification_level?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_verified_at?: string | null
          updated_at?: string
          user_id?: string
          verification_level?: string
        }
        Relationships: []
      }
      verifications: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          incident_id: string | null
          user_id: string | null
          verdict: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          incident_id?: string | null
          user_id?: string | null
          verdict: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          incident_id?: string | null
          user_id?: string | null
          verdict?: string
        }
        Relationships: [
          {
            foreignKeyName: "verifications_incident_id_fkey"
            columns: ["incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
        ]
      }
      vetting_group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vetting_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "vetting_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      vetting_groups: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          id: string
          min_members_required: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          min_members_required?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          min_members_required?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      vetting_posts: {
        Row: {
          author_id: string
          city: string
          content: string
          created_at: string
          downvotes: number | null
          flags: number
          id: string
          images: string[] | null
          latitude: number | null
          longitude: number | null
          reward_given: boolean
          tips: number | null
          type: string
          upvotes: number
        }
        Insert: {
          author_id: string
          city: string
          content: string
          created_at?: string
          downvotes?: number | null
          flags?: number
          id?: string
          images?: string[] | null
          latitude?: number | null
          longitude?: number | null
          reward_given?: boolean
          tips?: number | null
          type: string
          upvotes?: number
        }
        Update: {
          author_id?: string
          city?: string
          content?: string
          created_at?: string
          downvotes?: number | null
          flags?: number
          id?: string
          images?: string[] | null
          latitude?: number | null
          longitude?: number | null
          reward_given?: boolean
          tips?: number | null
          type?: string
          upvotes?: number
        }
        Relationships: []
      }
      vibe_votes: {
        Row: {
          created_at: string
          id: string
          round_id: string | null
          vote_reason: string | null
          voted_for_id: string | null
          voter_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          round_id?: string | null
          vote_reason?: string | null
          voted_for_id?: string | null
          voter_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          round_id?: string | null
          vote_reason?: string | null
          voted_for_id?: string | null
          voter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vibe_votes_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "game_rounds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vibe_votes_voted_for_id_fkey"
            columns: ["voted_for_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vibe_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      votes: {
        Row: {
          created_at: string
          id: string
          option_id: string
          poll_id: string
          voter_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          option_id: string
          poll_id: string
          voter_id: string
        }
        Update: {
          created_at?: string
          id?: string
          option_id?: string
          poll_id?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "poll_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      webhook_deliveries: {
        Row: {
          attempt_number: number
          created_at: string
          delivered_at: string | null
          error_message: string | null
          id: string
          next_retry_at: string | null
          response_body: string | null
          response_status_code: number | null
          status: string
          webhook_event_uuid: string
          webhook_subscription_id: string
        }
        Insert: {
          attempt_number?: number
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          next_retry_at?: string | null
          response_body?: string | null
          response_status_code?: number | null
          status?: string
          webhook_event_uuid: string
          webhook_subscription_id: string
        }
        Update: {
          attempt_number?: number
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          next_retry_at?: string | null
          response_body?: string | null
          response_status_code?: number | null
          status?: string
          webhook_event_uuid?: string
          webhook_subscription_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_deliveries_webhook_event_uuid_fkey"
            columns: ["webhook_event_uuid"]
            isOneToOne: false
            referencedRelation: "webhook_events"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "webhook_deliveries_webhook_subscription_id_fkey"
            columns: ["webhook_subscription_id"]
            isOneToOne: false
            referencedRelation: "webhook_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          event_type: string
          payload: Json | null
          uuid: string
        }
        Insert: {
          event_type: string
          payload?: Json | null
          uuid?: string
        }
        Update: {
          event_type?: string
          payload?: Json | null
          uuid?: string
        }
        Relationships: []
      }
      webhook_subscriptions: {
        Row: {
          application_id: string
          created_at: string
          endpoint_url: string
          event_types: string[]
          id: string
          is_active: boolean
          secret_key: string
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          endpoint_url: string
          event_types?: string[]
          id?: string
          is_active?: boolean
          secret_key: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          endpoint_url?: string
          event_types?: string[]
          id?: string
          is_active?: boolean
          secret_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_subscriptions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "oauth_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      wildcard_questions: {
        Row: {
          category: string
          created_at: string | null
          id: string
          question: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          question: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          question?: string
        }
        Relationships: []
      }
      wildcard_responses: {
        Row: {
          answer_text: string
          created_at: string | null
          game_id: string
          id: string
          picker_id: string
          question_text: string
        }
        Insert: {
          answer_text: string
          created_at?: string | null
          game_id: string
          id?: string
          picker_id: string
          question_text: string
        }
        Update: {
          answer_text?: string
          created_at?: string | null
          game_id?: string
          id?: string
          picker_id?: string
          question_text?: string
        }
        Relationships: []
      }
    }
    Views: {
      all_time_donors_leaderboard: {
        Row: {
          donor_id: string | null
          donor_name: string | null
          last_donation: string | null
          requests_helped: number | null
          total_donations: number | null
          total_tokens: number | null
        }
        Relationships: [
          {
            foreignKeyName: "help_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      community_pot_balance: {
        Row: {
          total_pot: number | null
          total_tips: number | null
        }
        Relationships: []
      }
      community_pot_entrants: {
        Row: {
          anonymous_username: string | null
          author_id: string | null
          diamonds: number | null
          post_id: string | null
          tips_received: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_tips_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tips_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "recovery_champions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tips_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "retirement_archive_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tips_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "top_streaks_view"
            referencedColumns: ["id"]
          },
        ]
      }
      hall_of_champions: {
        Row: {
          awarded_at: string | null
          month: string | null
          reward_amount: number | null
          type: string | null
          winner_id: string | null
          winner_username: string | null
        }
        Relationships: []
      }
      recovery_champions_view: {
        Row: {
          anonymous_username: string | null
          author_id: string | null
          content: string | null
          created_at: string | null
          diamonds: number | null
          id: string | null
          title: string | null
          truth_badge: boolean | null
          unblur_count: number | null
        }
        Relationships: []
      }
      retirement_archive_view: {
        Row: {
          anonymous_username: string | null
          author_id: string | null
          content: string | null
          created_at: string | null
          diamonds: number | null
          id: string | null
          retirement_date: string | null
          streak_days: number | null
          title: string | null
          unblur_count: number | null
        }
        Insert: {
          anonymous_username?: string | null
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          diamonds?: number | null
          id?: string | null
          retirement_date?: string | null
          streak_days?: number | null
          title?: string | null
          unblur_count?: number | null
        }
        Update: {
          anonymous_username?: string | null
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          diamonds?: number | null
          id?: string | null
          retirement_date?: string | null
          streak_days?: number | null
          title?: string | null
          unblur_count?: number | null
        }
        Relationships: []
      }
      shared_ghost_files_view: {
        Row: {
          contact_info: Json | null
          created_at: string | null
          description: string | null
          id: string | null
          is_private: boolean | null
          share_count: number | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          is_private?: boolean | null
          share_count?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          is_private?: boolean | null
          share_count?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      top_streaks_view: {
        Row: {
          anonymous_username: string | null
          author_id: string | null
          content: string | null
          created_at: string | null
          diamonds: number | null
          id: string | null
          streak_30_badge: boolean | null
          streak_days: number | null
          title: string | null
        }
        Relationships: []
      }
      weekly_donors_leaderboard: {
        Row: {
          donor_id: string | null
          donor_name: string | null
          last_donation: string | null
          requests_helped: number | null
          weekly_donations: number | null
          weekly_tokens: number | null
        }
        Relationships: [
          {
            foreignKeyName: "help_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      add_tokens: {
        Args: { user_uuid: string; token_amount: number }
        Returns: boolean
      }
      adjust_user_tokens: {
        Args: { uid: string; token_change: number; reason: string }
        Returns: boolean
      }
      award_achievement: {
        Args: { user_uuid: string; achievement_name: string }
        Returns: string
      }
      award_achievement_points: {
        Args: { p_user_id: string; p_achievement_id: string }
        Returns: boolean
      }
      award_donation_spin: {
        Args: { p_donor_id: string; p_tokens: number }
        Returns: Json
      }
      award_verification_coins: {
        Args: {
          p_user_id: string
          p_verification_type: string
          p_amount: number
        }
        Returns: boolean
      }
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      can_user_post_shame: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      check_school_by_code: {
        Args: { code_to_check: string }
        Returns: string
      }
      check_user_exists: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      cleanup_expired_backups: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_typing_indicators: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_affiliate_account: {
        Args: { p_user_id: string; p_name: string; p_email: string }
        Returns: string
      }
      create_invite_code: {
        Args: { user_uuid: string }
        Returns: string
      }
      create_user_if_not_exists: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      credit_affiliate_tokens: {
        Args: {
          p_affiliate_code: string
          p_referred_user_id: string
          p_purchase_amount: number
          p_token_amount: number
          p_purchase_tier: string
        }
        Returns: boolean
      }
      decay_posts: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      deduct_tokens: {
        Args: { user_uuid: string; token_amount: number; search_type: string }
        Returns: boolean
      }
      deduct_tokens_amount: {
        Args: { user_uuid: string; token_amount: number; description: string }
        Returns: boolean
      }
      delete_comment_with_auth: {
        Args: { p_comment_id: string; p_user_id: string }
        Returns: Json
      }
      delete_hall_of_shame_post: {
        Args: { post_id: string; user_id: string }
        Returns: undefined
      }
      ensure_anon_identity: {
        Args: { user_id_input: string }
        Returns: Json
      }
      generate_anonymous_username: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_deterministic_anon_emoji: {
        Args: { user_id_input: string }
        Returns: string
      }
      generate_deterministic_anon_name: {
        Args: { user_id_input: string }
        Returns: string
      }
      generate_invite_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_behavioral_patterns: {
        Args: { p_user_id: string; p_data_type: string; p_days?: number }
        Returns: Json
      }
      get_daily_ai_usage: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_emoji_from_username: {
        Args: { username: string }
        Returns: string
      }
      get_recent_user_interactions: {
        Args: { p_user_id: string; p_host_type: string; p_limit?: number }
        Returns: {
          content: string
          context: Json | null
          conversation_id: string | null
          created_at: string
          host_type: string
          id: string
          interaction_type: string
          model_id: string | null
          provider_id: string | null
          response_time_ms: number | null
          sentiment: string | null
          tokens_used: number | null
          user_id: string
          voice_audio_url: string | null
          voice_enabled: boolean | null
        }[]
      }
      get_similar_context: {
        Args: {
          p_user_id: string
          p_query_embedding: string
          p_limit?: number
          p_similarity_threshold?: number
        }
        Returns: {
          conversation_id: string
          content_text: string
          content_type: string
          importance_score: number
          similarity: number
          created_at: string
        }[]
      }
      get_twin_data: {
        Args: { p_user_id: string }
        Returns: Json
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      has_purchased_packages: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      increment: {
        Args: { inc: number }
        Returns: number
      }
      increment_chat_coins: {
        Args: { user_uuid: string; amount: number }
        Returns: undefined
      }
      increment_followers_count: {
        Args: { influencer_id: string; increment_value: number }
        Returns: undefined
      }
      increment_post_downvotes: {
        Args: { post_id: string }
        Returns: undefined
      }
      increment_post_metric: {
        Args: { post_id: string; metric_type: string; increment_value: number }
        Returns: undefined
      }
      increment_post_upvotes: {
        Args: { post_id: string }
        Returns: undefined
      }
      increment_tokens: {
        Args: { user_email: string; amount: number }
        Returns: undefined
      }
      increment_user_stats: {
        Args: { user_id: string; score_to_add: number; was_ghosted?: number }
        Returns: undefined
      }
      increment_user_tokens: {
        Args: { user_uuid: string; amount: number }
        Returns: boolean
      }
      increment_view_count: {
        Args: { story_id: string }
        Returns: undefined
      }
      is_user_verified: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      log_ai_usage: {
        Args: {
          p_user_id: string
          p_provider_name: string
          p_model_name: string
          p_interaction_id: string
          p_tokens_used: number
          p_response_time_ms: number
          p_success?: boolean
          p_error_message?: string
        }
        Returns: string
      }
      log_redemption_audit: {
        Args: {
          p_redemption_id: string
          p_admin_id: string
          p_action: string
          p_metadata?: Json
        }
        Returns: string
      }
      log_security_event: {
        Args: {
          p_user_id: string
          p_action: string
          p_resource?: string
          p_success?: boolean
          p_error_message?: string
          p_metadata?: Json
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: boolean
      }
      record_ai_host_interaction: {
        Args: {
          p_user_id: string
          p_host_type: string
          p_interaction_type: string
          p_content: string
          p_context?: Json
          p_sentiment?: string
        }
        Returns: string
      }
      reveal_poll_votes: {
        Args: { poll_uuid: string; user_uuid: string }
        Returns: boolean
      }
      save_behavioral_data: {
        Args: {
          p_user_id: string
          p_data_type: string
          p_data_value: Json
          p_timestamp?: string
        }
        Returns: string
      }
      save_twin_data: {
        Args: { p_user_id: string; p_data: Json }
        Returns: Json
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      spend_request_tokens: {
        Args: {
          p_user_id: string
          p_help_request_id: string
          p_tokens_spent: number
          p_usage_type?: string
          p_description?: string
        }
        Returns: boolean
      }
      spin_wheel: {
        Args: { p_user_id: string }
        Returns: Json
      }
      store_context_embedding: {
        Args: {
          p_user_id: string
          p_conversation_id: string
          p_content_text: string
          p_embedding: string
          p_content_type: string
          p_importance_score?: number
        }
        Returns: string
      }
      transfer_tips_to_pot: {
        Args: { p_post_id: string }
        Returns: number
      }
      transfer_tokens: {
        Args: {
          sender_uuid: string
          recipient_uuid: string
          tip_amount: number
          tip_message?: string
        }
        Returns: boolean
      }
      update_application_analytics: {
        Args: {
          p_application_id: string
          p_success: boolean
          p_response_time_ms: number
          p_cost?: number
        }
        Returns: boolean
      }
      update_daily_progress: {
        Args: {
          p_user_id: string
          p_challenge_type: string
          p_increment?: number
        }
        Returns: boolean
      }
      update_leaderboard_ranks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_relationship_memory: {
        Args: {
          p_user_id: string
          p_relationship_type: string
          p_entity_name: string
          p_relationship_data: Json
          p_emotional_valence?: number
        }
        Returns: string
      }
      update_revenue: {
        Args: { amount_usd: number }
        Returns: boolean
      }
      update_streak_badges: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      update_token_balance: {
        Args: { user_uuid: string; token_amount: number }
        Returns: undefined
      }
      upvote_ghost_file: {
        Args: { share_id: string }
        Returns: undefined
      }
      use_invite_code: {
        Args: { invite_code: string; user_uuid: string }
        Returns: boolean
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vote_on_case: {
        Args: { case_id_input: string; vote_type: string }
        Returns: Json
      }
      vote_on_comment_with_tokens: {
        Args: { p_comment_id: string; p_user_id: string; p_vote_type: string }
        Returns: Json
      }
      vote_on_post_with_tokens: {
        Args: { p_post_id: string; p_user_id: string; p_vote_type: string }
        Returns: Json
      }
    }
    Enums: {
      app_role: "admin" | "affiliate" | "merchant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "affiliate", "merchant"],
    },
  },
} as const
