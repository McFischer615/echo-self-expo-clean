// components/ui/sheet.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface SheetProps {
  visible: boolean;
  onClose: () => void;
  side?: "top" | "bottom" | "left" | "right";
  title?: string;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({
  visible,
  onClose,
  side = "right",
  title,
  children,
}) => {
  const animationIn = side === "bottom" ? "slideInUp" : side === "top" ? "slideInDown" : "slideInRight";
  const animationOut = side === "bottom" ? "slideOutDown" : side === "top" ? "slideOutUp" : "slideOutRight";

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} animationIn={animationIn} animationOut={animationOut}>
      <View style={[styles.container, side === "bottom" && styles.bottom]}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  bottom: { position: "absolute", bottom: 0, width: "100%" },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
});
