// components/ui/slider.tsx
import React from "react";
import Slider from "@react-native-community/slider";

export const AppSlider: React.FC<{ value: number; onValueChange: (v: number) => void }> = ({
  value,
  onValueChange,
}) => (
  <Slider
    minimumValue={0}
    maximumValue={100}
    step={1}
    value={value}
    onValueChange={onValueChange}
    minimumTrackTintColor="#6C4EE3"
    maximumTrackTintColor="#ddd"
    thumbTintColor="#6C4EE3"
  />
);
