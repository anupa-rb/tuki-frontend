import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";

export default function ChooseRole({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/LOGO.png")} style={styles.logo} />
        </View>
        <View>
          <Text style={styles.header}>Choose your Role</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/buyer.png")} style={styles.image} />
          <Image source={require("../assets/seller.png")} style={styles.image} />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Bottom Navigation");
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 25,
    fontWeight: "700",
    color: "#1d1d1d",
    alignSelf: "center",
    marginTop: 0,
  },
  logo: {
    width: 300, // Set the desired width
    height: 100, // Set the desired height
    resizeMode: "contain",
  },
  logoContainer: {
    marginTop: 50,
    justifyContent: "center", // Vertically centers the content
    alignItems: "center", // Horizontally centers the content
    backgroundColor: "#fff",
    marginBottom: 30,
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
  btn: {
    backgroundColor: "#DC5440",
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 100,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
