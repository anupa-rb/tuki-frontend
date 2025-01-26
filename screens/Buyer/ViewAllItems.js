import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

const ViewAllItems = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const handleProductClick = (title, price, coverImage, description) => {
    navigation.navigate("Product", { title, price, coverImage, description });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products data
        const response = await fetch(`${API_URL}/gig/get`);
        const data = await response.json();

        if (Array.isArray(data.data)) {
          // Fetch seller data for each product
          const productsWithSellers = await Promise.all(
            data.data.map(async (product) => {
              try {
                const sellerResponse = await fetch(
                  `${API_URL}/auth/get/${product.sellerId}`
                );
                const sellerData = await sellerResponse.json();

                return {
                  ...product,
                  sellerName: sellerData.data.name || "Unknown Seller",
                };
              } catch (error) {
                console.error(
                  `Failed to fetch seller for product ${product.id}`
                );
                return { ...product, sellerName: "Unknown Seller" };
              }
            })
          );
          setProducts(productsWithSellers);
        } else {
          console.error("Products data is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require("../../assets/LOGO.png")}
            style={styles.image}
          />
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
                navigation.navigate("BuyerProfile");
              }}
            >
              <Image
                source={require("../../assets/Anurag.png")}
                style={styles.avatarMD}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.Title}>New Items</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.listContent}>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleProductClick(
                      product.title,
                      product.price,
                      product.coverImage,
                      product.description
                    )
                  }
                >
                  <View style={styles.card}>
                    <View style={styles.cardTop}>
                      <Image
                        source={{ uri: product.coverImage }}
                        style={styles.cardImage}
                      />
                    </View>
                    <View style={styles.cardFooter}>
                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{product.title}</Text>
                        <Text style={styles.cardSubtitle}>
                          {product.sellerName}
                        </Text>
                        <Text style={styles.cardPrice}>Rs.{product.price}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No products available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarMD: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    // borderWidth: 2,
    // borderColor: "#6a99e3", // Add border around avatar for a neat look
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  Title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    paddingVertical: 15,
    textAlign: "center", // Center title text
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  listContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  card: {
    width: 330,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5, // Add shadow for a card-like effect
    flexDirection: "row",
    shadowColor: "#000",
  },
  cardTop: {
    borderBottomColor: "#f1f1f1",
  },
  cardImage: {
    width: 120, // Image width adjusted for left side
    height: 120,
    borderRadius: 10,
    resizeMode: "cover", // To maintain the image aspect ratio
  },
  cardFooter: {
    padding: 10,
  },
  cardBody: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Darker color for better contrast
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#28a745", // Green for price to highlight it
  },
});

export default ViewAllItems;
