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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const items_2 = [
  {
    icon: "code",
    label: "TypeScript",
    company: "8 endorsements",
    jobType: "2 experiences",
    years: "GitHub & Figma",
  },
  {
    icon: "git-merge",
    label: "Git",
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

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get("window").width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cCard}>
      <Text style={styles.cTitle}>{item.title}</Text>
      <Text style={styles.cSubtitle}>{item.subtitle}</Text>
      <Text style={styles.cDescription}>{item.description}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image source={require("../../assets/LOGO.png")} style={styles.image} />
        <View style={styles.rightContainer}>
          <TouchableOpacity>
            <FeatherIcon color="#6a99e3" name="bell" size={22} />
          </TouchableOpacity>
          <Image source={require("../../assets/Anupa.png")} style={styles.avatarMD} />
        </View>
      </View>
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
              { backgroundColor: index === currentIndex ? "#0000ff" : "#cccccc" },
            ]}
          />
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {items_2.map(({ label, company, jobType, years }, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{label}</Text>
            <Text style={styles.cardSubtitle}>{company}</Text>
            <Text>{jobType}</Text>
            <Text>{years}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarMD: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
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
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginHorizontal: 6,
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
});
