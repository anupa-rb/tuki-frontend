import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

const Search = ({navigation}) => {
  const [gigs, setGigs] = useState([]);
  const [searchGigText, setSearchGigText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      if (searchGigText.length > 2) {
        fetchGigs();
      } else if (searchGigText.length < 1) {
        setGigs([]); // Reset gigs if search text is empty
        setSearchErrorText(""); // Clear any error text
      } else {
        setSearchErrorText("Please enter at least 3 characters for searching.");
      }
    }, 1000);

    return () => clearTimeout(fetchTimer); // Cleanup timeout
  }, [searchGigText]);

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

  const fetchGigs = async () => {
    setLoading(true);
    setSearchErrorText("");

    try {
      const response = await fetch(
        `${API_URL}/gig/search?search=${encodeURIComponent(searchGigText)}`
      );
      const data = await response.json();
      console.log("API Response Data:", data); // Add this log to inspect the response

      if (response.ok) {
        if (data && data.gigs && Array.isArray(data.gigs)) {
          setGigs(data.gigs || []); // Ensure we only set gigs if it's an array
        } else {
          setSearchErrorText("No gigs found.");
        }
      } else {
        setSearchErrorText(data.message || "Error fetching gigs");
      }
    } catch (error) {
      console.log("Error fetching gigs:", error); // Log the error to console
      setSearchErrorText("Cannot fetch gig information!");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (title, price, coverImage, description) => {
    navigation.navigate("Product", { title, price, coverImage, description });
    console.log(coverImage); // Pass data to Product screen
  };

  const renderGig = ({ item }) => (
    <View style={styles.gigCard}>
      <TouchableOpacity
        onPress={() =>
          handleProductClick(
            item.title,
            item.price,
            item.coverImage,
            item.description
          )
        }
      >
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Image
              source={{ uri: item.coverImage }} // Update to the correct image field
              style={styles.cardImage}
            />
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

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
              source={require("../../assets/Anupa.png")}
              style={styles.avatarMD}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Product Search</Text>
        <View style={styles.searchWrapper}>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FeatherIcon color="#848484" name="search" size={17} />
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              placeholder="Type product title or category"
              value={searchGigText}
              onChangeText={(text) => setSearchGigText(text)}
            />
          </View>
        </View>
        {searchErrorText ? (
          <Text style={styles.errorText}>{searchErrorText}</Text>
        ) : null}

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        ) : gigs.length < 1 ? (
          <Text></Text>
        ) : (
          <FlatList
            data={gigs}
            renderItem={renderGig}
            keyExtractor={(item) => item._id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

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
  searchContent: {
    paddingLeft: 24,
  },
  searchEmpty: {
    textAlign: "center",
    paddingTop: 16,
    fontWeight: "500",
    fontSize: 15,
    color: "#9ca1ac",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
  },
  loader: {
    marginTop: 20,
  },
  gigCard: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTop: {
    flex: 1,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  cardFooter: {
    paddingTop: 10,
  },
  cardBody: {
    paddingLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
  },
});

export default Search;
