import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  FlatList,
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
        setGigs([]);
        setSearchErrorText("");
      } else {
        setSearchErrorText("Please enter at least 3 characters for searching.");
      }
    }, 1000);

    return () => clearTimeout(fetchTimer);
  }, [searchGigText]);

  const fetchGigs = async () => {
    setLoading(true);
    setSearchErrorText("");

    try {
      const response = await fetch(
        `${API_URL}/gig/search?search=${encodeURIComponent(searchGigText)}`
      );
      const data = await response.json();

      if (response.ok) {
        setGigs(data.data || []);
      } else {
        setSearchErrorText(data.message || "Error fetching gigs");
      }
    } catch (error) {
      setSearchErrorText("Cannot fetch gig information!");
    } finally {
      setLoading(false);
    }
  };

  const renderGig = ({ item }) => (
    <View style={styles.gigCard}>
      <Text style={styles.gigTitle}>{item.title}</Text>
      <Text style={styles.gigCategory}>{item.category}</Text>
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

        {isError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{errorText}</Text>
          </View>
        ) : (
          <View style={styles.gigsContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : gigs.length < 1 ? (
              <Text>No Gigs Found</Text>
            ) : (
              <FlatList
                data={gigs}
                renderItem={renderGig}
                keyExtractor={(item) => item._id.toString()}
              />
            )}
          </View>
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
  errorContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: "#fff",
  },
  gigsContainer: {
    flex: 1,
    backgroundColor: "#e7e7e7",
    padding: 10,
  },
  gigCard: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  gigTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  gigCategory: {
    fontSize: 14,
    color: "#888",
  },
});

export default Search;
