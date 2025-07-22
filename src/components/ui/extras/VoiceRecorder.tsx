import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { echoselfTheme } from "@/theme/echoself-theme";

const VoiceRecorder: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedURI, setRecordedURI] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Microphone permission not granted");
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedURI(uri || null);
    } catch (err) {
      console.error("Failed to stop recording:", err);
    } finally {
      setIsRecording(false);
      setRecording(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Voice Recorder</Text>

      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordingActive]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons
          name={isRecording ? "stop-circle" : "mic-circle"}
          size={48}
          color={isRecording ? echoselfTheme.colors.error : echoselfTheme.colors.primary}
        />
        <Text style={styles.recordLabel}>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
      </TouchableOpacity>

      {recordedURI && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Recorded File:</Text>
          <Text style={styles.uri}>{recordedURI}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: echoselfTheme.spacing.md,
    alignItems: "center",
    backgroundColor: echoselfTheme.colors.surface,
    borderRadius: echoselfTheme.radius.lg,
  },
  header: {
    fontSize: echoselfTheme.typography.heading.fontSize,
    fontWeight: "bold",
    color: echoselfTheme.colors.primary,
    marginBottom: echoselfTheme.spacing.md,
  },
  recordButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: echoselfTheme.spacing.md,
    borderRadius: echoselfTheme.radius.lg,
    backgroundColor: echoselfTheme.colors.background,
    borderWidth: 1,
    borderColor: echoselfTheme.colors.muted,
  },
  recordingActive: {
    backgroundColor: echoselfTheme.colors.surface,
    borderColor: echoselfTheme.colors.error,
  },
  recordLabel: {
    fontSize: 14,
    color: echoselfTheme.colors.text,
    marginTop: echoselfTheme.spacing.xs,
  },
  resultBox: {
    marginTop: echoselfTheme.spacing.md,
    padding: echoselfTheme.spacing.sm,
    backgroundColor: echoselfTheme.colors.background,
    borderRadius: echoselfTheme.radius.sm,
    borderWidth: 1,
    borderColor: echoselfTheme.colors.muted,
    width: "100%",
  },
  resultText: {
    fontSize: 12,
    fontWeight: "600",
    color: echoselfTheme.colors.text,
  },
  uri: {
    fontSize: 10,
    color: echoselfTheme.colors.textSecondary,
    marginTop: 2,
  },
});

export default VoiceRecorder;
