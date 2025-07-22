// components/ui/drawer.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ visible, onClose, title, children }) => (
  <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modal: { justifyContent: "flex-end", margin: 0 },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
});
