import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/supabase/client"; // ✅ RN-safe (AsyncStorage-backed)
import Toast from "react-native-toast-message";

interface OnboardingStep {
  id: string;
  title: string;
  content: string;
  target: string;
  placement?: "top" | "bottom" | "left" | "right";
}

export const useOnboarding = () => {
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /** ✅ Define onboarding steps */
  const onboardingSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to EchoSelf!",
      content:
        "Let's take a quick tour to get you started with creating your behavioral AI twin.",
      target: "welcome-step",
      placement: "bottom",
    },
    {
      id: "create-echo",
      title: "Create Your Echo",
      content:
        "Start by creating your first Echo – your behavioral AI twin that learns from your patterns.",
      target: "create-echo-step",
      placement: "bottom",
    },
    {
      id: "chat-echo",
      title: "Chat with Your Echo",
      content:
        "Once created, you can chat with your Echo to test how well it mimics your personality.",
      target: "chat-echo-step",
      placement: "bottom",
    },
    {
      id: "api-gateway",
      title: "API Gateway",
      content:
        "Set up external integrations to enhance your Echo's learning capabilities.",
      target: "api-gateway-step",
      placement: "bottom",
    },
  ];

  /** ✅ Start and stop onboarding */
  const startOnboarding = useCallback(() => {
    setIsOnboardingActive(true);
    setCurrentStep(0);
  }, []);

  const stopOnboarding = useCallback(() => {
    setIsOnboardingActive(false);
    markOnboardingComplete();
  }, []);

  /** ✅ Mark a step complete */
  const markStepComplete = useCallback(async (stepId: string) => {
    if (completedSteps.includes(stepId)) return;

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { error } = await supabase.from("user_onboarding_progress").insert({
        user_id: user.id,
        step_name: stepId,
      });

      if (error) {
        console.error("Error marking step complete:", error.message);
        return;
      }

      setCompletedSteps((prev) => [...prev, stepId]);
    } catch (error: any) {
      console.error("Error marking step complete:", JSON.stringify(error));
    }
  }, [completedSteps]);

  /** ✅ Mark entire onboarding as complete */
  const markOnboardingComplete = useCallback(async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { error } = await supabase.from("user_settings").upsert(
        {
          user_id: user.id,
          onboarding_completed: true,
        },
        { onConflict: "user_id" }
      );

      if (error) {
        console.error("Error marking onboarding complete:", error.message);
        return;
      }

      Toast.show({
        type: "success",
        text1: "Onboarding Complete!",
        text2: "You're all set to start using EchoSelf.",
      });
    } catch (error: any) {
      console.error("Error marking onboarding complete:", JSON.stringify(error));
    }
  }, []);

  /** ✅ Check onboarding status on first load */
  const checkOnboardingStatus = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data: settings } = await supabase
        .from("user_settings")
        .select("onboarding_completed")
        .eq("user_id", user.id)
        .single();

      const { data: completedStepsData } = await supabase
        .from("user_onboarding_progress")
        .select("step_name")
        .eq("user_id", user.id);

      if (completedStepsData) {
        setCompletedSteps(completedStepsData.map((step) => step.step_name));
      }

      if (!settings?.onboarding_completed && completedStepsData?.length === 0) {
        setTimeout(() => startOnboarding(), 800);
      }
    } catch (error: any) {
      console.error("Error checking onboarding status:", JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, [startOnboarding]);

  useEffect(() => {
    checkOnboardingStatus();
  }, [checkOnboardingStatus]);

  return {
    isOnboardingActive,
    currentStep,
    onboardingSteps,
    completedSteps,
    loading,
    startOnboarding,
    stopOnboarding,
    markStepComplete,
    setCurrentStep,
  };
};
