import React from "react";
import styled from "styled-components/native";

interface AvatarProps {
  uri?: string;
  size?: number;
  fallbackText?: string;
}

const Container = styled.View<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  overflow: hidden;
  background-color: #ddd;
`;

const Fallback = styled.View<{ size: number }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${({ size }) => size / 2}px;
  background-color: #6c4ee3;
`;

const FallbackText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 14px;
`;

const ImageStyled = styled.Image<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
`;

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 40,
  fallbackText = "U",
}) => {
  return (
    <Container size={size}>
      {uri ? (
        <ImageStyled source={{ uri }} size={size} />
      ) : (
        <Fallback size={size}>
          <FallbackText>{fallbackText}</FallbackText>
        </Fallback>
      )}
    </Container>
  );
};
