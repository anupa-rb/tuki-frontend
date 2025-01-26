import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api";

const getTimeDisplay = (updatedAt) => {
  const now = new Date();
  const updatedTime = new Date(updatedAt);
  const diffInMinutes = Math.floor((now - updatedTime) / 60000);

  if (diffInMinutes === 0) {
    return "now";
  } else if (diffInMinutes > 0 && diffInMinutes <= 5) {
    return `${diffInMinutes} min ago`;
  } else {
    return updatedTime
      .toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  }
};

export default function Message({ navigation }) {
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch conversations from the backend
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        // console.log("Retrieved Token:", token);
        const response = await axios.get(`${API_URL}/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your auth token logic
          },
        });

        setConversations(response.data.data); // Assuming `data` contains the conversations array
      } catch (err) {
        Alert.alert(
          "Error",
          err.response?.data?.message || "Failed to load conversations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image source={require("../../assets/LOGO.png")} style={styles.logo} />
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={{ paddingHorizontal: 10, alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <FeatherIcon color="#6a99e3" name="bell" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyProfile");
            }}
          >
            <Image
              source={require("../../assets/Anurag.png")}
              style={styles.avatarMD}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Inbox</Text>
        <View style={styles.searchWrapper}>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FeatherIcon color="#848484" name="search" size={17} />
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(val) => setInput(val)}
              placeholder="Type user name"
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={input}
            />
          </View>
        </View>
        {loading ? (
          <Text style={styles.loadingText}>Loading conversations...</Text>
        ) : (
          conversations
            .filter(({ buyerID, sellerID }) => {
              const participantName =
                buyerID?.name || sellerID?.name || "Unknown";
              return participantName
                .toLowerCase()
                .includes(input.trim().toLowerCase());
            })
            .map(
              ({
                _id,
                conversationID,
                buyerID,
                sellerID,
                lastMessage,
                updatedAt,
              }) => {
                const participant = sellerID; // Depending on the logged-in user
                console.log(participant);
                return (
                  <TouchableOpacity
                    key={conversationID}
                    onPress={() => {
                      navigation.navigate("Chat", {
                        conversationID,
                      });
                    }}
                  >
                    <View style={styles.card}>
                      <Image
                        alt=""
                        resizeMode="cover"
                        style={styles.cardImg}
                        source={{
                          uri: participant?.profileImage,
                        }}
                      />

                      <View>
                        <Text style={styles.cardTitle}>
                          {participant?.name || "Unknown"}
                        </Text>
                        <Text style={styles.cardMessage}>
                          {lastMessage || "No messages yet."}
                        </Text>
                        <Text style={styles.cardSubtitle}>
                          {getTimeDisplay(updatedAt)}
                        </Text>
                      </View>

                      <View style={styles.cardAction}>
                        <FeatherIcon
                          color="#9ca3af"
                          name="chevron-right"
                          size={22}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  /** Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 37.5,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarMD: {
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  /** Search */
  search: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  searchWrapper: {
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#efefef",
  },
  searchIcon: {
    position: "flex",
    top: 0,
    bottom: 0,
    left: 25,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  searchControl: {
    paddingVertical: 10,
    paddingLeft: 34,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
  },
  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardImg: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  cardMessage: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#636a73",
  },
  cardAction: {
    marginLeft: "auto",
  },
  loadingText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
});
