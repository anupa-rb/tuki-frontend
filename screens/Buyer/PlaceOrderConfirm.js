import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PlaceOrderConfirm({ navigation }) {
    useEffect(() => {
      // Set a delay (e.g., 3 seconds) before navigating to the next screen
      const timer = setTimeout(() => {
        navigation.navigate("Buyer Navigation");
      }, 1000); // Delay time in milliseconds

      return () => clearTimeout(timer);
    }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
            <AntDesign name="checkcircle" size={120} color="#DC5440" />

            <Text style={styles.alertTitle}>Order Placed</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:200,
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems:"center"
  },
  /** Alert */
  alertTitle: {
    marginTop: 40,
    fontSize: 45,
    lineHeight: 44,
    fontWeight: "700",
    color: "#DC5440",
    textAlign: "center",
  },
  orderbtn:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#28a745",
    borderColor: "#28a745",
    marginBottom: 10,
  },
})