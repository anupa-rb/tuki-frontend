import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeatherIcon from "react-native-vector-icons/Feather";

const items = [
  {

    label: "Duna Tapari",
    company: "Sita Thapa",
    jobType: "",
    years: "2025-01-01",
  },
  {
    label: "Crochet",
    company: "Rama Sapkota",
    jobType: "",
    years: "201",
  },

];
const CARD_WIDTH = Math.min(Dimensions.get("screen").width * 0.75, 400);

export default function BuyerProfile({navigation}) {
  const [name, setName] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const handleLogOut = async () => {
    try {
      // Remove the access token from AsyncStorage
      await AsyncStorage.removeItem("accessToken");
  
      // Reset the navigation stack to ensure no back navigation
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }], // Replace "Login" with your login screen name
        })
      );
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken"); // Get token from AsyncStorage
        if (token) {
          const userDetails = jwtDecode(token); // Decode the token directly
          console.log("Decoded User Details:", userDetails);
          if (userDetails) {
            setName(userDetails.name);
          }
        } else {
          console.error("No token found.");
        }
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      }
    };
    fetchUserName();
  }, []);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{ paddingHorizontal: 10 }}
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <FeatherIcon color="#fff" name="bell" size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileTop}>
          <View style={styles.avatar}>
            <Image
              source={require("../../assets/user.jpg")}
              style={styles.avatarImg}
            />
            <View style={styles.avatarNotification} />
          </View>

          <View style={styles.profileBody}>
            {/* Dynamically set the profile title */}
            <Text style={styles.profileTitle}>{name}</Text>

            <Text style={styles.profileSubtitle}>
              Buyer{" · "}
              <Text style={{ color: "#fff" }}></Text>
            </Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentActions}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={{ flex: 1, paddingHorizontal: 6 }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogOut}
            style={{ flex: 1, paddingHorizontal: 6 }}
          >
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>My Last Orders</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <Text style={styles.listAction}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {items.map(({ icon, label, company, jobType, years }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <FeatherIcon color="#000" name={icon} size={24} />
                    </View>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{label}</Text>

                      <Text style={styles.cardSubtitle}>{company}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>{jobType}</Text>

                    <Text style={styles.cardFooterText}>{years}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Recommended for you</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <Text style={styles.listAction}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {items.map(({ icon, label, company, jobType, years }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <FeatherIcon color="#000" name={icon} size={24} />
                    </View>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{label}</Text>

                      <Text style={styles.cardSubtitle}>{company}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>{jobType}</Text>

                    <Text style={styles.cardFooterText}>{years}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: "space-around",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  /** Header */
  header: {
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: "#DC5440",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerAction: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  /** Search */
  search: {
    position: "relative",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingLeft: 34,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
  },
  /** Content */
  content: {
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  contentActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    marginHorizontal: -6,
    marginBottom: 0,
  },
  /** Profile */
  profileTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#fff",
    marginBottom: 6,
    marginTop: 15,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#778599",
  },
  profileTags: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: "#DC5440",
    marginRight: 4,
  },
  /** Avatar */
  avatar: {
    marginTop: 10,
    position: "relative",
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: "absolute",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#fff",
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: "#22C55E",
  },
  /** Stats */
  stats: {
    backgroundColor: "#fff",
    marginTop: 15,
    flexDirection: "row",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "#DC5440",
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "##DC5440",
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: "#DC5440",
    borderColor: "#DC5440",
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#fff",
  },
  /** List */
  list: {
    marginTop: 16,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22,
    color: "#121a26",
  },
  listAction: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#778599",
  },
  listContent: {
    paddingVertical: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginRight: 12,
  },
  cardTop: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardIcon: {
    backgroundColor: "#F0F0F0",
    borderRadius: 9999,
    padding: 6,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 18,
    color: "#121a26",
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    color: "#778599",
  },
  cardFooter: {
    padding: 12,
    paddingTop: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardFooterText: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    color: "#778599",
  },
});
