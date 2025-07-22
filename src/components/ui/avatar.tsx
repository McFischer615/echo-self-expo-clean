// components/ui/avatar.tsx
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface AvatarProps {
  uri?: string;
  size?: number;
  fallbackText?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 40,
  fallbackText = "U",
}) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View style={[styles.fallback, { borderRadius: size / 2 }]}>
          <Text style={styles.fallbackText}>{fallbackText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C4EE3",
  },
  fallbackText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
