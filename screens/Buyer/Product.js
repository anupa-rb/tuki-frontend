import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const Product = ({ navigation }) => {
  const route = useRoute();
  const { title, price, coverImage, description } = route.params;
  console.log(coverImage);

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
              navigation.navigate("BuyerProfile");
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
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Image source={{ uri: coverImage }} style={styles.cardImage} />
          </View>
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>Rs.{price}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Product;

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
  /*Card*/
  cardImage: {
    width: "auto",
    height: 250,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  cardSDesc: {
    fontSize: 18,
    color: "#778599",
  },
});
