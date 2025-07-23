import React from "react";
import styled, { css } from "styled-components/native";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
}

const baseStyles = css`
  padding: 4px 10px;
  border-radius: 20px;
  border-width: 1px;
  align-self: flex-start;
`;

const TextStyled = styled.Text<{ variant: BadgeVariant }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ variant }) => (variant === "outline" ? "#333" : "#fff")};
`;

const BadgeContainer = styled.View<{ variant: BadgeVariant }>`
  ${baseStyles}

  background-color: ${({ variant }) =>
    variant === "secondary"
      ? "#ccc"
      : variant === "destructive"
      ? "#b00020"
      : variant === "outline"
      ? "transparent"
      : "#6C4EE3"};

  border-color: ${({ variant }) =>
    variant === "secondary"
      ? "#ccc"
      : variant === "destructive"
      ? "#b00020"
      : variant === "outline"
      ? "#333"
      : "#6C4EE3"};
`;

export const Badge: React.FC<BadgeProps> = ({ text, variant = "default" }) => (
  <BadgeContainer variant={variant}>
    <TextStyled variant={variant}>{text}</TextStyled>
  </BadgeContainer>
);
