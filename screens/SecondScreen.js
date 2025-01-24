import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";

const Stack = createNativeStackNavigator();

const SecondScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/LOGO.png")} style={styles.image} />
      <Text style={styles.nepaliText}>-----आत्मनिर्भरता को ज्योति-----</Text>
      {/* Nepali Text */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Vertically centers the content
    alignItems: "center", // Horizontally centers the content
    backgroundColor: "#fff",
  },
  image: {
    width: 200, // Set the desired width
    height: 140, // Set the desired height
    resizeMode: "contain", // Adjust how the image scales
  },
  nepaliText: {
    color: "#DC5440",
    marginLeft: 33,
    // alignSelf: "center",
  },
  button: {
    backgroundColor: "#DC5440",
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});