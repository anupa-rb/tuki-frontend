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
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

const items = [
  {
    label: "Duna",
    company: "Rs.5",
  },
  {
    label: "Tapari",
    company: "Rs. 20",
  },
  {
    label: "Doko",
    company: "Rs.50",
  },
];
const reviews = [
  {
    user: "John Doe",
    review: "Excellent service and quality! Highly recommended.",
    rating: 5,
  },
  {
    user: "Jane Smith",
    review: "Good product, but delivery was a bit late.",
    rating: 4,
  },
  {
    user: "Samuel Green",
    review: "Not satisfied with the product quality.",
    rating: 2,
  },
  {
    user: "Emily White",
    review: "Great experience! Will definitely purchase again.",
    rating: 5,
  },
];

export default function MyProfile({ navigation }) {
  const [name, setName] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [products, setProducts] = useState([]);

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

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://your-backend-url.com/products");
        const data = await response.json();
        setProducts(data); // Populate the products list
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchUserName();
    fetchProducts();
  }, []);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

const handleLogOut = async () =>{
  try {
    // Remove the access token from AsyncStorage
    await AsyncStorage.removeItem("accessToken");
    
    // Navigate to the login screen after logout (or reset the navigation stack if needed)
    navigation.navigate("Login"); // Replace "Login" with the actual screen name
  } catch (error) {
    console.error("Failed to log out:", error);
  }
}

  const handleAddProduct = () => {
    navigation.navigate("AddProduct", {
      onGoBack: async () => {
        // Refresh the products list after adding a product
        const response = await fetch("https://your-backend-url.com/products");
        const data = await response.json();
        setProducts(data);
      },
    });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`https://your-backend-url.com/products/${productId}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // const handleDeleteProduct = async (productId) => {
  //   try {
  //     const token = await AsyncStorage.getItem("authToken"); // Assuming you store the token in AsyncStorage
  //     const response = await fetch(`https://your-backend-url.com/gigs/${productId}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // Add token for authentication
  //       },
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || "Failed to delete the product.");
  //     }

  //     // Update the product list after successful deletion
  //     setProducts((prev) => prev.filter((product) => product._id !== productId));

  //     alert("Product deleted successfully.");
  //   } catch (error) {
  //     console.error("Failed to delete product:", error);
  //     alert(`Error: ${error.message}`);
  //   }
  // };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{ paddingHorizontal: 10 }}
            onPress={() => {
              navigation.navigate("SNotification");
            }}
          >
            <FeatherIcon color="#fff" name="bell" size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileTop}>
          <View style={styles.avatar}>
            <Image
              source={require("../../assets/Anupa.png")}
              style={styles.avatarImg}
            />
            <View style={styles.avatarNotification} />
          </View>

          <View style={styles.profileBody}>
            {/* Dynamically set the profile title */}
            <Text style={styles.profileTitle}>{name}</Text>

            <Text style={styles.profileSubtitle}>
              Ratings:
              <FontAwesome
                color="#FFFF00"
                name="star"
                solid={true}
                size={12}
                style={{ marginBottom: 2 }}
              />
              <Text style={styles.cardStars}>5</Text>
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
            <Text style={styles.listTitle}>My Products</Text>

            <TouchableOpacity onPress={handleAddProduct}>
              <Text style={styles.listAction}>Add</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {items.map(({ label, company }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <Image
                      source={require("../../assets/Anupa.png")}
                      style={styles.cardImage}
                    />
                  </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{label}</Text>
                      <Text style={styles.cardSubtitle}>{company}</Text>
                    </View>
                    <AntDesign
                      name="delete"
                      size={24}
                      color="red"
                      onPress={() => handleDeleteProduct(id)}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>My Reviews</Text>

            <TouchableOpacity
              onPress={() => {
                // Navigate to a full review screen if required
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
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <Text style={styles.reviewText}>"{review.review}"</Text>
                <View style={styles.reviewRating}>
                  {Array.from({ length: review.rating }).map((_, starIndex) => (
                    <FontAwesome
                      key={starIndex}
                      name="star"
                      size={14}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
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
  avatarMD: {
    width: 50,
    height: 50,
    borderRadius: 9999,
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
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    paddingBottom: -105,
  },
  statsItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: "rgba(189, 189, 189, 0.32)",
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    color: "#778599",
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#121a26",
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
    backgroundColor: "#ff0000",
    borderColor: "#ff0000",
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
    marginBottom: 10,
    paddingTop: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
  cardFooterText: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    color: "#778599",
  },
  cardImage: {
    width: 180,
    height: 150,
    borderRadius: 12,
  },
  /*Review*/
  reviewCard: {
    width: 250,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
    color: "#121a26",
  },
  reviewText: {
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 8,
    color: "#778599",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
