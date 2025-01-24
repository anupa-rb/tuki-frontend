import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function SellerHome({ navigation }) {
  const [name, setName] = useState("Seller Name"); // Replace with dynamic data
  const [earnings, setEarnings] = useState(0);
  const [activeProjects, setActiveProjects] = useState([]);

  useEffect(() => {
    // Fetch user and project data from API
    const fetchData = async () => {
      try {
        // Replace with API calls
        const projects = [
          { id: "1", title: "Knitting Sweater", client: "Sita Baral" },
          { id: "2", title: "Lakh Batti", client: "Hari Sharma" },
          { id: "3", title: "Tapari", client: "Nisha Chaudhary" },
        ];
        const userEarnings = 5000; // Example data

        setActiveProjects(projects);
        setEarnings(userEarnings);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateProduct = () => {
    navigation.navigate("AddProduct");
  };

  const renderProject = ({ item }) => (
    <View style={styles.projectCard}>
      <View style={styles.projectDetails}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <Text style={styles.projectClient}>Client: {item.client}</Text>
      </View>
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
              navigation.navigate("BuyerProfile");
            }}
          >
            <Image
              source={require("../../assets/user.jpg")}
              style={styles.avatarMD}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Earnings Overview */}
          <View style={styles.earningsCard}>
            <Text style={styles.earningsTitle}>Total Earnings</Text>
            <Text style={styles.earningsAmount}>Rs.{earnings}</Text>
          </View>

          {/* Active Projects */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Projects</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Projects")}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={activeProjects}
            renderItem={renderProject}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.projectList}
          />

          {/* Create New Project */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateProduct}
          >
            <FeatherIcon name="plus" size={20} color="#fff" />
            <Text style={styles.createButtonText}>Add a New Service</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
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
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  avatarMD: {
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
  subtitle: {
    fontSize: 16,
    color: "#778599",
  },
  earningsCard: {
    backgroundColor: "#DC5440",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  earningsTitle: {
    fontSize: 18,
    color: "#fff",
  },
  earningsAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#121a26",
  },
  viewAll: {
    fontSize: 14,
    color: "#DC5440",
  },
  projectList: {
    paddingVertical: 10,
  },
  projectCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  projectDetails: {
    alignItems: "flex-start",
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#121a26",
  },
  projectClient: {
    fontSize: 14,
    color: "#778599",
    marginTop: 5,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC5440",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 10,
  },
});
