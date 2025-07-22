import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client"; // ✅ RN-safe (AsyncStorage-backed)
import Toast from "react-native-toast-message";

interface HelpContent {
  id: string;
  title: string;
  content: string;
  category: string;
}

export const useHelp = () => {
  const [isHelpMode, setIsHelpMode] = useState(false);
  const [helpEnabled, setHelpEnabled] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  /** ✅ Local help content library */
  const helpContent: Record<string, HelpContent> = {
    "create-echo": {
      id: "create-echo",
      title: "Creating Your Echo",
      content:
        "Your Echo is a behavioral AI twin that learns your communication patterns, decision-making style, and personality traits.",
      category: "echo-management",
    },
    "chat-echo": {
      id: "chat-echo",
      title: "Chatting with Your Echo",
      content:
        "Test how well your Echo mimics your personality by having conversations. The more you interact, the better it becomes.",
      category: "interaction",
    },
    "api-gateway": {
      id: "api-gateway",
      title: "API Gateway",
      content:
        "Connect external platforms like Gmail, Slack, and social media to enhance your Echo's learning with real behavioral data.",
      category: "integrations",
    },
    "echo-edit": {
      id: "echo-edit",
      title: "Editing Your Echo",
      content:
        "You can modify your Echo's personality traits, communication style, and training data to improve its accuracy.",
      category: "echo-management",
    },
    analytics: {
      id: "analytics",
      title: "Analytics Dashboard",
      content:
        "Track your Echo's performance, conversation patterns, and learning progress over time.",
      category: "analytics",
    },
  };

  /** ✅ Toggles help mode */
  const toggleHelpMode = () => {
    setIsHelpMode((prev) => !prev);
    setActiveTooltip(null);
  };

  /** ✅ Tooltip management */
  const showTooltip = (tooltipId: string) => {
    if (helpEnabled) {
      setActiveTooltip(tooltipId);
    }
  };
  const hideTooltip = () => setActiveTooltip(null);

  const getHelpContent = (id: string): HelpContent | null =>
    helpContent[id] || null;

  /** ✅ Load help settings from Supabase */
  const loadHelpSettings = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data, error } = await supabase
        .from("user_settings")
        .select("help_enabled")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error loading help settings:", error.message);
        return;
      }

      if (data) {
        setHelpEnabled(data.help_enabled);
      }
    } catch (error: any) {
      console.error("Error loading help settings:", JSON.stringify(error));
    }
  };

  /** ✅ Update help settings in Supabase */
  const updateHelpSettings = async (enabled: boolean) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { error } = await supabase.from("user_settings").upsert(
        {
          user_id: user.id,
          help_enabled: enabled,
        },
        { onConflict: "user_id" }
      );

      if (error) {
        console.error("Error updating help settings:", error.message);
        return;
      }

      setHelpEnabled(enabled);
      Toast.show({
        type: enabled ? "success" : "info",
        text1: enabled ? "Help Mode Enabled" : "Help Mode Disabled",
        text2: enabled
          ? "Tooltips and onboarding hints are now active."
          : "Help mode turned off.",
      });
    } catch (error: any) {
      console.error("Error updating help settings:", JSON.stringify(error));
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Could not update help settings. Please try again.",
      });
    }
  };

  useEffect(() => {
    loadHelpSettings();
  }, []);

  return {
    isHelpMode,
    helpEnabled,
    activeTooltip,
    toggleHelpMode,
    showTooltip,
    hideTooltip,
    getHelpContent,
    updateHelpSettings,
  };
};
