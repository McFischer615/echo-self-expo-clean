import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TextInput as RNTextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { echoselfTheme } from "@/theme/echoself-theme";
import { Card } from "@/components/ui";
import { supabase } from "../services/supabaseClient";
import styled from "styled-components/native";

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
    <MessageContainer sender={item.sender}>
      <Card style={{ padding: echoselfTheme.spacing.sm }}>
        <MessageText sender={item.sender}>{item.content}</MessageText>
      </Card>
    </MessageContainer>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: echoselfTheme.spacing.md }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <InputRow>
          <StyledInput
            placeholder="Type your message..."
            placeholderTextColor={echoselfTheme.colors.textSecondary}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            editable={!loading}
          />
          <SendButton onPress={sendMessage} disabled={loading}>
            <Ionicons
              name="send"
              size={22}
              color={
                loading
                  ? echoselfTheme.colors.muted
                  : echoselfTheme.colors.primary
              }
            />
          </SendButton>
        </InputRow>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default ChatWithEchoScreen;

//
// ✅ Styled Components
//
const Container = styled.View`
  flex: 1;
  background-color: ${echoselfTheme.colors.surface};
  padding: ${echoselfTheme.spacing.md}px;
`;

const MessageContainer = styled.View<{ sender: "user" | "echo" }>`
  margin-bottom: ${echoselfTheme.spacing.sm}px;
  max-width: 80%;
  align-self: ${(props) =>
    props.sender === "user" ? "flex-end" : "flex-start"};
`;

const MessageText = styled.Text<{ sender: "user" | "echo" }>`
  font-size: 14px;
  color: ${(props) =>
    props.sender === "user"
      ? echoselfTheme.colors.text
      : echoselfTheme.colors.textSecondary};
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-color: ${echoselfTheme.colors.muted};
  padding-vertical: ${echoselfTheme.spacing.xs}px;
`;

const StyledInput = styled(RNTextInput)`
  flex: 1;
  border-width: 1px;
  border-color: ${echoselfTheme.colors.muted};
  border-radius: ${echoselfTheme.radius.sm}px;
  padding: ${echoselfTheme.spacing.sm}px;
  background-color: ${echoselfTheme.colors.background};
  color: ${echoselfTheme.colors.text};
  margin-right: ${echoselfTheme.spacing.xs}px;
`;

const SendButton = styled(TouchableOpacity)`
  padding: ${echoselfTheme.spacing.xs}px;
`;
