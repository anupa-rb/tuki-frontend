import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/LOGO.png")}
            style={styles.image}
          />
          <View style={styles.rightContainer}>
            <View style={styles.bellContainer}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={{ alignSelf: "baseline" }}>
                  <FeatherIcon color="#6a99e3" name="bell" size={22} />
                </View>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../../assets/Anupa.png")}
              style={styles.avatarMD}
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.listContent}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        ></ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  header: {
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Vertically align items
    justifyContent: "space-between", // Space between logo and right container
    paddingHorizontal: 16,
    backgroundColor: "#fffff",
  },
  rightContainer: {
    flexDirection: "row", // Arrange bell and avatar in a row
    alignItems: "flex-start", // Align items to the top
  },
  bellContainer: {
    justifyContent: "flex-start", // Position the bell at the top
    padding: 8,
    marginRight: 12,
    // Add spacing between the bell and avatar
  },
  avatarMD: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
});
