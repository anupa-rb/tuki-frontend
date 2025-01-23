import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const people = [
  {
    img: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2404&q=80",
    name: "Hari Prasad Guragai",
    cal: 22,
    duration: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1597347316205-36f6c451902a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Rama Neupane",
    cal: 12,
    duration: 15,
  },
  {
    img: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    name: "Deepak Karki",
    cal: 12,
    duration: 5,
  },
  {
    img: "https://images.unsplash.com/photo-1598266663439-2056e6900339?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80",
    name: "Anita Giri",
    cal: 33,
    duration: 12,
  },
  {
    img: "https://images.unsplash.com/photo-1632167764165-74a3d686e9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80",
    name: "Rama Sapkota",
    cal: 44,
    duration: 10,
  },
];

export default function Message({ navigation }) {
  const [input, setInput] = useState("");
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image source={require("../../assets/LOGO.png")} style={styles.logo} />
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={{ paddingHorizontal: 10, alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("SNotification");
            }}
          >
            <FeatherIcon color="#6a99e3" name="bell" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyProfile");
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
        <Text style={styles.title}>Inbox</Text>
        <View style={styles.searchWrapper}>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FeatherIcon color="#848484" name="search" size={17} />
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(val) => setInput(val)}
              placeholder="Start typing.."
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={input}
            />
          </View>
        </View>
        {people.map(({ name, cal, duration, img }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("SellerChat", { name, conversationID: index + 1 });
              }}
            >
              <View style={styles.card}>
                <Image
                  alt=""
                  resizeMode="cover"
                  style={styles.cardImg}
                  source={{ uri: img }}
                />

                <View>
                  <Text style={styles.cardTitle}>{name}</Text>

                  <View style={styles.cardStats}>
                    <View style={styles.cardStatsItem}>
                      <FeatherIcon color="#636a73" name="clock" />

                      <Text style={styles.cardStatsItemText}>
                        {duration} mins
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardAction}>
                  <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

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
    marginTop: 37.5,
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
  /** Search */
  search: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  searchWrapper: {
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#efefef",
  },
  searchIcon: {
    position: "flex",
    top: 0,
    bottom: 0,
    left: 25,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  searchControl: {
    paddingVertical: 10,
    paddingLeft: 34,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
  },
  searchContent: {
    paddingLeft: 24,
  },
  searchEmpty: {
    textAlign: "center",
    paddingTop: 16,
    fontWeight: "500",
    fontSize: 15,
    color: "#9ca1ac",
  },
  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardImg: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  cardStats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardStatsItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  cardStatsItemText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#636a73",
    marginLeft: 2,
  },
  cardAction: {
    marginLeft: "auto",
  },
});
