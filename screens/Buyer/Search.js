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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

const Search = () => {
  const [gigs, setGigs] = useState([]);
  const [searchGigText, setSearchGigText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState("");
  const [loading, setLoading] = useState(false);

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

  const fetchGigs = async () => {
    setLoading(true);
    setSearchErrorText("");

    try {
      const response = await fetch(
        `${API_URL}/gig/search?search=${encodeURIComponent(searchGigText)}`
      );
      const data = await response.json();
      console.log("API Response Data:", data);  // Add this log to inspect the response

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

  const renderGig = ({ item }) => (
    <View style={styles.gigCard}>
      <TouchableOpacity
        onPress={() => {
          // Handle gig press (e.g., navigate to details)
        }}
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
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.navBar}>Product Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Type product title or category"
          value={searchGigText}
          onChangeText={(text) => setSearchGigText(text)}
        />
        {searchErrorText ? (
          <Text style={styles.errorText}>{searchErrorText}</Text>
        ) : null}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
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
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  navBar: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
