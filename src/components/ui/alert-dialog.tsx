// components/ui/alert-dialog.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface AlertDialogProps {
  visible: boolean;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  title = "Alert",
  description = "",
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.6}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C4EE3", // SafeTea purple
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    marginLeft: 5,
    padding: 12,
    backgroundColor: "#6C4EE3",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});
