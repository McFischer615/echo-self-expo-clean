// components/ui/switch.tsx
import React from "react";
import styled from "styled-components/native";
import { Switch as RNSwitch } from "react-native";

export const Switch: React.FC<{ value: boolean; onValueChange: (v: boolean) => void }> = ({
  value,
  onValueChange,
}) => (
  <SwitchContainer>
    <StyledSwitch value={value} onValueChange={onValueChange} trackColor={{ true: "#6C4EE3" }} />
  </SwitchContainer>
);

const SwitchContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const StyledSwitch = styled(RNSwitch)``;
