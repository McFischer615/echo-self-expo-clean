import React from "react";
import styled, { css } from "styled-components/native";
import type { GestureResponderEvent } from "react-native";

type ButtonVariant = "default" | "secondary" | "destructive" | "outline" | "ghost";
type ButtonSize = "sm" | "default" | "lg";

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: (event: GestureResponderEvent) => void;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "default",
  size = "default",
  onPress,
  style,
}) => {
  return (
    <StyledButton variant={variant} size={size} onPress={onPress} style={style} activeOpacity={0.8}>
      <ButtonText variant={variant}>{title}</ButtonText>
    </StyledButton>
  );
};

const variantStyles = {
  default: css`
    background-color: #6c4ee3;
  `,
  secondary: css`
    background-color: #ccc;
  `,
  destructive: css`
    background-color: #b00020;
  `,
  outline: css`
    background-color: transparent;
    border-width: 1px;
    border-color: #333;
  `,
  ghost: css`
    background-color: transparent;
  `,
};

const sizeStyles = {
  sm: css`
    padding: 6px 10px;
  `,
  default: css`
    padding: 8px 14px;
  `,
  lg: css`
    padding: 12px 20px;
  `,
};

const StyledButton = styled.TouchableOpacity<{ variant: ButtonVariant; size: ButtonSize }>`
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  ${({ variant }) => variantStyles[variant]};
  ${({ size }) => sizeStyles[size]};
`;

const ButtonText = styled.Text<{ variant: ButtonVariant }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ variant }) =>
    variant === "outline" || variant === "ghost" ? "#333" : "#fff"};
`;
