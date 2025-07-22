import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { echoselfTheme } from "@/theme/echoself-theme";

const Footer: React.FC = () => {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>© {new Date().getFullYear()} EchoSelf</Text>
      <View style={styles.linksRow}>
        <TouchableOpacity onPress={() => handleLinkPress("https://echoself.ai/terms")}>
          <Text style={styles.link}>Terms</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress("https://echoself.ai/privacy")}>
          <Text style={styles.link}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress("https://echoself.ai/support")}>
          <Text style={styles.link}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: echoselfTheme.spacing.md,
    borderTopWidth: 1,
    borderColor: echoselfTheme.colors.muted,
    alignItems: "center",
    backgroundColor: echoselfTheme.colors.surface,
  },
  brand: {
    fontSize: 12,
    color: echoselfTheme.colors.textSecondary,
    marginBottom: echoselfTheme.spacing.xs,
  },
  linksRow: { flexDirection: "row", justifyContent: "center" },
  link: {
    fontSize: 12,
    color: echoselfTheme.colors.primary,
    marginHorizontal: echoselfTheme.spacing.sm,
    fontWeight: "600",
  },
});

export default Footer;
