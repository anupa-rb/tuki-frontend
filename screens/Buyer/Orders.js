import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const Orders = ({navigation}) => {
  return (
    <SafeAreaView>
        <View style={styles.header}>
          <Image
            source={require("../../assets/LOGO.png")}
            style={styles.logo}
          />
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
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Manage Orders</Text>
          <Text>No Orders</Text>
        </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:20,
    justifyContent: "space-around",
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
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
});

export default Orders;
