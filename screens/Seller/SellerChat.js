import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import FeatherIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api";

export default function Chat({ route, navigation }) {
  const { conversationID } = route.params; // Get conversationID passed from the previous screen
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("");

  const scrollViewRef = useRef();

  useEffect(() => {
    const fetchCurrentUserID = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          setCurrentUserID(decodedToken._id);
          setCurrentUserName(decodedToken.name);
        }
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    };
    fetchCurrentUserID();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const response = await axios.get(
          `${API_URL}/messages/${conversationID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(response.data.data); // Assuming `data` contains the messages array
      } catch (err) {
        Alert.alert(
          "Error",
          err.response?.data?.message || "Failed to load messages"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationID]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Optimistically add the message to the state
    const newMessageData = {
      _id: new Date().toISOString(), // Generate a temporary ID for the new message
      userID: { _id: currentUserID, name: currentUserName }, // Set the current user ID
      description: newMessage,
      createdAt: new Date().toISOString(), // Set the timestamp for the message
    };

    // Update the messages state immediately
    setMessages((prevMessages) => [...prevMessages, newMessageData]);

    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.post(
        `${API_URL}/messages`,
        {
          conversationID,
          description: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Once the message is successfully sent, update the message with actual data from the response
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === newMessageData._id
            ? { ...msg, _id: response.data.data._id }
            : msg
        )
      );

      setNewMessage(""); // Reset the input field
    } catch (err) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to send the message"
      );
      // Optionally, remove the optimistically added message if sending fails
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== newMessageData._id)
      );
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={28} color="#6a99e3" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        ref={scrollViewRef} // Attach the ref to ScrollView
      >
        {loading ? (
          <Text style={styles.loadingText}>Loading messages...</Text>
        ) : messages.length === 0 ? (
          <Text style={styles.noMessagesText}>No messages yet.</Text>
        ) : (
          messages.map(({ _id, userID, description, createdAt }) => (
            <View
              key={_id}
              style={[
                styles.messageBubble,
                userID._id === currentUserID // Replace with the current user's ID
                  ? styles.outgoing
                  : styles.incoming,
              ]}
            >
              <Text style={styles.senderName}>{userID.name}</Text>
              <Text style={styles.messageText}>{description}</Text>
              <Text style={styles.messageTimestamp}>
                {new Date(createdAt).toLocaleTimeString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <FeatherIcon name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#efefef",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 15,
  },
  loadingText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  noMessagesText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  messageBubble: {
    maxWidth: "75%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 12,
  },
  incoming: {
    backgroundColor: "#f0f0f0", // Light grey for other user
    alignSelf: "flex-start",
  },
  outgoing: {
    backgroundColor: "#ffcccc", // Slight red for current user
    alignSelf: "flex-end",
    color: "#fff", // White text for readability
  },
  messageText: {
    fontSize: 16,
    color: "#333", // Default text color for messages
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "right",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#efefef",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#ff2400",
    borderRadius: 25,
    padding: 10,
  },
});
