import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native"; // For accessing params
import axios from "axios";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

const Message = () => {
  const route = useRoute();
  const { conversationID } = route.params; // Get `conversationID` from route params
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/messages/${conversationID}`
        );
        setMessages(response.data);
      } catch (err) {
        Alert.alert(
          "Error",
          err.response?.data?.message || "Failed to load messages"
        );
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [conversationID]);

  // Send a new message to the backend
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(`${API_URL}/messages`, {
        conversationID,
        description: newMessage,
      });
      // Refresh messages after sending
      setNewMessage("");
      const response = await axios.get(`${API_URL}/messages/${conversationID}`);
      setMessages(response.data);
    } catch (err) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to send message"
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {loading ? (
          <Text style={styles.loader}>Loading...</Text>
        ) : error ? (
          <Text style={styles.error}>Something went wrong</Text>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageItem,
                  item.userID._id === "userID" && styles.owner,
                ]}
              >
                <Image
                  source={{
                    uri:
                      item.userID.image ||
                      "https://your-default-avatar-url/noavatar.png",
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.messageText}>{item.description}</Text>
              </View>
            )}
          />
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Write a message..."
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
  messagesContainer: { padding: 10 },
  loader: { textAlign: "center", marginTop: 20 },
  error: { color: "red", textAlign: "center", marginTop: 20 },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#eaeaea",
    borderRadius: 8,
    padding: 10,
    maxWidth: "80%",
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
  messageText: { fontSize: 16, color: "#333" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
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

export default Message;
