import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { supabase } from "../services/supabaseClient";

interface ChatMessage {
  id: string;
  sender: "user" | "echo";
  content: string;
  created_at: string;
}

const ChatWithEchoScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("echo_chat_messages")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }
      setMessages(data as any);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    flatListRef.current?.scrollToEnd({ animated: true });

    try {
      setLoading(true);

      // Save user message
      await supabase.from("echo_chat_messages").insert([
        {
          sender: "user",
          content: userMessage.content,
        },
      ]);

      // Simulate Echo AI response
      const echoResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "echo",
        content: `Echo: I understand you said "${userMessage.content}". Let's dive deeper!`,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, echoResponse]);

      await supabase.from("echo_chat_messages").insert([
        {
          sender: "echo",
          content: echoResponse.content,
        },
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.echoMessage,
      ]}
    >
      <Card style={styles.messageCard}>
        <Text
          style={[
            styles.messageText,
            item.sender === "user" ? styles.userText : styles.echoText,
          ]}
        >
          {item.content}
        </Text>
      </Card>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor={echoselfTheme.colors.textSecondary}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={loading}
        >
          <Ionicons
            name="send"
            size={22}
            color={loading ? echoselfTheme.colors.muted : echoselfTheme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: echoselfTheme.colors.surface,
    padding: echoselfTheme.spacing.md,
  },
  chatContainer: {
    paddingBottom: echoselfTheme.spacing.md,
  },
  messageContainer: {
    marginBottom: echoselfTheme.spacing.sm,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  echoMessage: {
    alignSelf: "flex-start",
  },
  messageCard: {
    padding: echoselfTheme.spacing.sm,
  },
  messageText: {
    fontSize: 14,
  },
  userText: {
    color: echoselfTheme.colors.text,
  },
  echoText: {
    color: echoselfTheme.colors.textSecondary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: echoselfTheme.colors.muted,
    paddingVertical: echoselfTheme.spacing.xs,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: echoselfTheme.colors.muted,
    borderRadius: echoselfTheme.radius.sm,
    padding: echoselfTheme.spacing.sm,
    backgroundColor: echoselfTheme.colors.background,
    color: echoselfTheme.colors.text,
    marginRight: echoselfTheme.spacing.xs,
  },
  sendButton: {
    padding: echoselfTheme.spacing.xs,
  },
});

export default ChatWithEchoScreen;
