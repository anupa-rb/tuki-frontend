import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api";

const BuyerChat = () => {
  const route = useRoute();
  const { conversationID } = route.params; // Access conversation ID from navigation
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch messages from backend
  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/messages/${conversationID}`);
      setMessages(response.data);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to fetch messages."
      );
    } finally {
      setLoading(false);
    }
  }, [conversationID]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(`${API_URL}/messages`, {
        conversationID,
        description: newMessage,
      });
      setNewMessage("");
      fetchMessages(); // Refresh messages
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to send message."
      );
    }
  };

  const renderMessage = ({ item }) => {
    const isOwner = item.userID._id === "userID"; // Replace with logged-in user's ID
    return (
      <View style={[styles.message, isOwner && styles.owner]}>
        <Image
          source={{
            uri: item.userID.image || "https://example.com/no-avatar.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.messageText}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0078FF" style={styles.loader} />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={renderMessage}
          style={styles.messageList}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loader: { marginTop: 20 },
  messageList: { flex: 1 },
  message: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    maxWidth: "75%",
  },
  owner: {
    alignSelf: "flex-end",
    backgroundColor: "#0078FF",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageText: { color: "#333", fontSize: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0078FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: { color: "#fff", fontWeight: "bold" },
});

export default BuyerChat;
