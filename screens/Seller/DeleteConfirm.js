import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { NavigationHelpersContext } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // API URL

const DeleteConfirm = ({ route, navigation }) => {
  const { productId } = route.params;
  console.log(productId);
  const handleDeleteNo = () => {
    navigation.navigate("Seller Navigation");
  };

  const handleDeleteYes = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("Token:", token);
      console.log("API URL:", `${API_URL}/gig/delete/${productId}`);
      
      const response = await fetch(`${API_URL}/gig/delete/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Product deleted:", data);
      } else {
        console.log("Product deleted successfully, but no JSON response.");
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
    navigation.navigate("Seller Navigation");
  };
  

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Are you sure you want to Delete?</Text>
        <TouchableOpacity onPress={handleDeleteYes}>
          <View style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>Yes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteNo}>
          <View style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>No</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: "space-around",
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
      headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 10,
      },
});

export default DeleteConfirm;
