// components/ui/form.tsx
import React from "react";
import styled from "styled-components/native";
import { Controller, useForm, FormProvider } from "react-hook-form";

export { Controller, useForm, FormProvider };

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => (
  <Container>
    <Label>{label}</Label>
    {children}
    {error && <ErrorText>{error}</ErrorText>}
  </Container>
);

const Container = styled.View`
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-weight: 600;
  margin-bottom: 4px;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
`;
