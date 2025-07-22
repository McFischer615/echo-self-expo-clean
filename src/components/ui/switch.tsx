// components/ui/switch.tsx
import React, { useState } from "react";
import { Switch as RNSwitch } from "react-native";

export const Switch: React.FC<{ value: boolean; onValueChange: (v: boolean) => void }> = ({
  value,
  onValueChange,
}) => <RNSwitch value={value} onValueChange={onValueChange} trackColor={{ true: "#6C4EE3" }} />;
