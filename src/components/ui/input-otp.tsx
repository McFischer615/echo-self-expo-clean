// components/ui/input-otp.tsx
import React from "react";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { StyleSheet } from "react-native";

interface OTPProps {
  value: string;
  setValue: (v: string) => void;
  cellCount?: number;
}

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
      rootStyle={styles.root}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <Text style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)} key={index}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  root: { marginTop: 10 },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    lineHeight: 38,
  },
  focusCell: { borderColor: "#6C4EE3" },
});
