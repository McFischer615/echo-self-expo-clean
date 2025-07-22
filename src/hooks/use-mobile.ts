import { useState, useEffect } from "react";
import { Dimensions, ScaledSize } from "react-native";

const MOBILE_BREAKPOINT = 768; // ✅ Adjust based on design requirements

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    Dimensions.get("window").width < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const updateLayout = ({ window }: { window: ScaledSize }) => {
      setIsMobile(window.width < MOBILE_BREAKPOINT);
    };

    const subscription = Dimensions.addEventListener("change", updateLayout);

    return () => {
      subscription.remove(); // ✅ Proper cleanup for RN >= 0.65
    };
  }, []);

  return isMobile;
}
