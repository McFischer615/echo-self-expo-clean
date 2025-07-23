import React from "react";
import styled, { css } from "styled-components/native";

interface AlertProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

const Container = styled.View<{ variant: "default" | "destructive" }>`
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  border-width: 1px;
  margin-vertical: 5px;

  ${(props) =>
    props.variant === "destructive"
      ? css`
          background-color: #fff5f5;
          border-color: #b00020;
        `
      : css`
          background-color: #f7f7ff;
          border-color: #6c4ee3;
        `}
`;

const Title = styled.Text<{ variant: "default" | "destructive" }>`
  font-weight: 600;
  font-size: 15px;
  color: ${(props) => (props.variant === "destructive" ? "#b00020" : "#333")};
`;

const Description = styled.Text`
  font-size: 13px;
  color: #555;
  margin-top: 4px;
`;

export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  variant = "default",
}) => {
  return (
    <Container variant={variant}>
      <Title variant={variant}>{title}</Title>
      {description ? <Description>{description}</Description> : null}
    </Container>
  );
};
