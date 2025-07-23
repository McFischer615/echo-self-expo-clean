// components/ui/input-otp.tsx
import React from "react";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import styled from "styled-components/native";

interface OTPProps {
  value: string;
  setValue: (v: string) => void;
  cellCount?: number;
}

const Root = styled.View`
  margin-top: 10px;
`;

const Cell = styled.Text<{ isFocused: boolean }>`
  width: 40px;
  height: 40px;
  border-width: 1px;
  border-color: ${({ isFocused }) => (isFocused ? "#6C4EE3" : "#ccc")};
  text-align: center;
  line-height: 38px;
  font-size: 20px;
`;

export const InputOTP: React.FC<OTPProps> = ({ value, setValue, cellCount = 6 }) => {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      rootStyle={{ marginTop: 10 }}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <Cell
          isFocused={isFocused}
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          testID={`otp-cell-${index}`}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Cell>
      )}
    />
  );
};
