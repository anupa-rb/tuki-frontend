import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const categories_items = [
  {
    icon: "code",
    label: "Duna",
    company: "8 endorsements",
    jobType: "2 experiences",
    years: "GitHub & Figma",
  },
  {
    icon: "git-merge",
    label: "Tapari",
    company: "3 endorsements",
    jobType: "1 experience",
    years: "GitHub",
  },
];

const data = [
  {
    id: "1",
    title: "Big Sale",
    subtitle: "Up to 50%",
    description: "Happening Now",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "Check them out!",
    description: "Limited Offer",
    image: "https://via.placeholder.com/400x200",
  },
];

const Home = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width
    );
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cCard}>
      <Text style={styles.cTitle}>{item.title}</Text>
      <Text style={styles.cSubtitle}>{item.subtitle}</Text>
      <Text style={styles.cDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image source={require("../../assets/LOGO.png")} style={styles.image} />
        <View style={styles.rightContainer}>
          <TouchableOpacity style={{paddingHorizontal:10, alignSelf:'center'}}>
            <FeatherIcon color="#6a99e3" name="bell" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Image
              source={require("../../assets/Anupa.png")}
              style={styles.avatarMD}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            style={styles.carousel}
          />
          <View style={styles.pagination}>
            {data.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentIndex ? "#0000ff" : "#cccccc",
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.Title}>Categories</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <Text style={styles.listAction}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            paddingHorizontal: 18,
            justifyContent: "space-around",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Image
            source={require("../../assets/Anupa.png")}
            style={styles.avatarXL}
          />
          <Image
            source={require("../../assets/Anupa.png")}
            style={styles.avatarXL}
          />
          <Image
            source={require("../../assets/Anupa.png")}
            style={styles.avatarXL}
          />
          <Image
            source={require("../../assets/Anupa.png")}
            style={styles.avatarXL}
          />
          <Image
            source={require("../../assets/Anupa.png")}
            style={styles.avatarXL}
          />
        </ScrollView>

        <View style={styles.listHeader}>
          <Text style={styles.Title}>New Items</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <Text style={styles.listAction}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {categories_items.map(({ label }, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={require("../../assets/Anupa.png")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{label}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
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
  avatarXL: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf:'center',
  },
  carousel: {
    marginTop: 20,
  },
  cCard: {
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#DC5440",
    padding: 16,
  },
  cTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  cSubtitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 8,
  },
  cDescription: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  card: {
    width: 200,
    height: 220,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginHorizontal: 6,
    alignItems: "center",
  },
  cardImage: {
    width: 180,
    height: 150,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#778599",
  },
  Title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    paddingVertical: 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  customContainer: {
    backgroundColor: "#f0f0f0",
    marginTop: 20,
  },
  customImageStyle: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  elmStyle: {
    color: "#333",
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    marginTop: 5,
  },
  desc: {
    fontSize: 14,
    marginTop: 5,
  },
  listAction: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#778599",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
});
