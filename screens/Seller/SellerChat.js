import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMessage, getMessages } from "../utilis/api";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function SellerChat({ route, navigation }) {
  const { conversationID, name } = route.params; // Ensure `conversationID` is passed in navigation params
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: name });

    const fetchMessages = async () => {
      try {
        const response = await getMessages(conversationID);
        setMessages(response.data.data);
      } catch (err) {
        Alert.alert("Error", "Unable to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationID]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await createMessage(conversationID, newMessage);
      setNewMessage("");
      // Reload messages
      const response = await getMessages(conversationID);
      setMessages(response.data.data);
    } catch (err) {
      Alert.alert("Error", "Unable to send message");
    }
  };

  return (
    <View style={styles.container}>
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
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.userID._id === conversationID.split("_")[1]
                  ? styles.buyerMessage
                  : styles.sellerMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.description}</Text>
              <Text style={styles.metaText}>By: {item.userID.name}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
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
  loading: { textAlign: "center", marginTop: 20 },
  message: { padding: 10, borderRadius: 8, marginVertical: 5 },
  buyerMessage: { alignSelf: "flex-start", backgroundColor: "#e0e0e0" },
  sellerMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0078FF",
    color: "#fff",
  },
  messageText: { fontSize: 16 },
  metaText: { fontSize: 12, color: "#888" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: "#0078FF",
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: { color: "#fff", fontWeight: "bold" },
});
