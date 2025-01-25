import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

const data = [
  {
    id: "1",
    title: "Big Sale",
    subtitle: "Up to 50%",
    description: "Happening Now",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "Check them out!",
    description: "Limited Offer",
    image: "https://via.placeholder.com/400x200",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const navigation = useNavigation();

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width
    );
    setCurrentIndex(index);
  };

  const handleProductClick = (title, price, coverImage, description) => {
    navigation.navigate("Product", { title, price, coverImage, description });
    console.log(coverImage); // Pass data to Product screen
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/gig/get`);
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data.data)) {
          setProducts(data.data); // Update with the correct data
        } else {
          console.error("Data.products is not an array");
        } // Populate the products list
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cCard}>
      <Text style={styles.cTitle}>{item.title}</Text>
      <Text style={styles.cSubtitle}>{item.subtitle}</Text>
      <Text style={styles.cDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image source={require("../../assets/LOGO.png")} style={styles.image} />
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
              source={require("../../assets/user.jpg")}
              style={styles.avatarMD}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            style={styles.carousel}
            nestedScrollEnabled={true}
          />
          <View style={styles.pagination}>
            {data.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentIndex ? "#0000ff" : "#cccccc",
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.Title}>Categories</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <Text style={styles.listAction}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            paddingHorizontal: 18,
            justifyContent: "space-around",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Categories", { category: "dunatapari" });
            }}
          >
            <Image
              source={require("../../assets/duna_tapari.jpg")}
              style={styles.avatarXL}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Categories", { category: "clothing" });
            }}
          >
            <Image
              source={require("../../assets/knitting.jpg")}
              style={styles.avatarXL}
            />
          </TouchableOpacity>{" "}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Categories", { category: "gundruk" });
            }}
          >
            <Image
              source={require("../../assets/gundruk.jpg")}
              style={styles.avatarXL}
            />
          </TouchableOpacity>{" "}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Categories", { category: "handcraft" });
            }}
          >
            <Image
              source={require("../../assets/dhoop_batti.jpg")}
              style={styles.avatarXL}
            />
          </TouchableOpacity>{" "}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Categories");
            }}
          >
            <Image
              source={require("../../assets/duna_tapari.jpg")}
              style={styles.avatarXL}
            />
          </TouchableOpacity>{" "}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Categories");
            }}
          >
            <Image
              source={require("../../assets/duna_tapari.jpg")}
              style={styles.avatarXL}
            />
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.listHeader}>
          <Text style={styles.Title}>New Items</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <Text style={styles.listAction}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
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
                      <Text style={styles.cardSubtitle}>{product.price}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No products available</Text>
          )}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
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
  },
  avatarXL: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  carousel: {
    marginTop: 20,
  },
  cCard: {
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#DC5440",
    padding: 16,
  },
  cTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  cSubtitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 8,
  },
  cDescription: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  card: {
    width: 200,
    height: 220,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginHorizontal: 6,
    alignItems: "center",
  },
  cardImage: {
    width: 180,
    height: 150,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#778599",
  },
  Title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    paddingVertical: 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  customContainer: {
    backgroundColor: "#f0f0f0",
    marginTop: 20,
  },
  customImageStyle: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  elmStyle: {
    color: "#333",
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    marginTop: 5,
  },
  desc: {
    fontSize: 14,
    marginTop: 5,
  },
  listAction: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#778599",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  /*Card*/
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
});
