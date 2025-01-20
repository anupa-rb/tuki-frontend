import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const FirstScreen = ({}) => {
  const navigation = useNavigation(); // Initialize the navigation hook

  useEffect(() => {
    // Set a delay (e.g., 3 seconds) before navigating to the next screen
    const timer = setTimeout(() => {
      navigation.navigate("SecondScreen");
    }, 1000); // Delay time in milliseconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/LOGOw.png")} style={styles.image} />
    </View>
  );
};
export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Vertically centers the content
    alignItems: "center", // Horizontally centers the content
    backgroundColor: "#DC5440",
  },
  image: {
    width: 200, // Set the desired width
    height: 200, // Set the desired height
    resizeMode: "contain", // Adjust how the image scales
  },
});
