import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={require("../../assets/LOGO.png")} style={styles.image} />
<Text>This is Seller</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
