import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

const Chat = ({ route, navigation }) => {
  const { name = "User" } = route.params || {}; // Provide a fallback value for `name`
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Optimistic UI update
      const newMessage = {
        id: messages.length + 1,
        text: message,
        isSender: true,
      };
      setMessages([newMessage, ...messages]);
      setMessage("");

      try {
        // Send message to the backend
        await fetch("https://unique-burro-surely.ngrok-free.app/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: message }),
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <FeatherIcon
            color="#1D2A32"
            name="chevron-left"
            size={32}
            onPress={() => {
              navigation.navigate("Message");
            }}
          />
          <Text style={styles.chatHeader}>{name}</Text>
        </View>
      </SafeAreaView>

      <View style={styles.chatContainer}>
        <ScrollView contentContainerStyle={styles.messageContainer}>
          {messages.map(({ id, text, isSender }) => (
            <View
              key={id}
              style={[
                styles.messageBubble,
                isSender ? styles.senderBubble : styles.receiverBubble,
              ]}
            >
              <Text style={styles.messageText}>{text}</Text>
            </View>
          ))}
        </ScrollView>
        </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chatHeader: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
  },
  messageContainer: {
    backgroundColor: "#0078FF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  messageContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  senderBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#0084ff",
  },
  receiverBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0078FF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Chat;
