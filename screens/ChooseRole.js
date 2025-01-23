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

export default function ChooseRole({ navigation }) {
  const [isSeller, setIsSeller] = useState(null);

  const handleBuyerClick = () => {
    setIsSeller("false");
    navigation.navigate("SignUp");
  };

  const handlseSellerClick = () => {
    setIsSeller("true");
    navigation.navigate("SignUp");
  };
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
          <TouchableOpacity onPress={handleBuyerClick}>
            <Image
              source={require("../assets/buyer.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlseSellerClick}>
            <Image
              source={require("../assets/seller.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
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
  imageContainer: {
    flexDirection: "row", // Align children in a row
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    marginVertical: 20, // Add vertical margin
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
