import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const items = [
  {
    icon: "figma",
    label: "Senior UI/UX Designer",
    company: "Figma",
    jobType: "Full Time",
    years: "2019-2023",
  },
  {
    icon: "github",
    label: "Mid-level Designer",
    company: "GitHub",
    jobType: "Full Time",
    years: "2017-2019",
  },
  {
    icon: "twitter",
    label: "Junior Designer",
    company: "Twitter",
    jobType: "Full Time",
    years: "2015-2017",
  },
];
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
const CARD_WIDTH = Math.min(Dimensions.get("screen").width * 0.75, 400);

const { width } = Dimensions.get("window");

const data = [
  {
    id: "1",
    title: "Big Sale",
    subtitle: "Up to 50%",
    description: "Happening Now",
    image: "https://via.placeholder.com/400x200", // Replace with your image URL
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "Check them out!",
    description: "Limited Offer",
    image: "https://via.placeholder.com/400x200", // Replace with your image URL
  },
];

const Home = () => {
  const [physician, setPhysician] = useState([]);

  useEffect(() => {
    fetch("https://example.com/physician/get") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPhysician(data.physician); // Set the physician data in the state
      });
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cCard}>
      <View style={styles.textContainer}>
        <Text style={styles.cTitle}>{item.title}</Text>
        <Text style={styles.cSubtitle}>{item.subtitle}</Text>
        <Text style={styles.cDescription}>{item.description}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );

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
        {/* <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Consult our professionals</Text>
          <View style={styles.separator} />
          <View style={styles.cardContainer}>
            {physician &&
              physician.map((phy, index) => (
                <View key={index} style={styles.card}>
                  <Image
                    source={{ uri: phy.imageURL }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{phy.name}</Text>
                    <Text style={styles.cardSubtitle}>{phy.speciality}</Text>
                    <Text style={styles.cardSubtitle}>{phy.qualification}</Text>
                    <Text style={styles.cardDescription}>
                      Description: {phy.description}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // Handle navigation or consultation action
                      }}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Consult Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView> */}
      </View>
      <View style={styles.list}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>New Items</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <Text style={styles.listAction}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.listContent}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {items_2.map(({ icon, label, company, jobType, years }, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={styles.cardIcon}>
                    <Image
                      source={require("../../assets/Anupa.png")}
                      style={styles.avatarMD}
                    />
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{label}</Text>
                    <Text style={styles.cardSubtitle}>{company}</Text>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardFooterText}>{jobType}</Text>
                  <Text style={styles.cardFooterText}>{years}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  // Header Styles
  header: {
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Vertically align items
    justifyContent: "space-between", // Space between logo and right container
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  rightContainer: {
    flexDirection: "row", // Arrange bell and avatar in a row
    alignItems: "flex-start", // Align items to the top
  },
  bellContainer: {
    justifyContent: "flex-start", // Position the bell at the top
    padding: 8,
    marginRight: 12, // Add spacing between the bell and avatar
  },
  avatarMD: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },

  // General Image Styles
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  // List Content and Card Layout
  list: {
    marginBottom: 24,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22,
    color: "#121a26",
  },
  listAction: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#778599",
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  /** Card */
  card: {
    width: CARD_WIDTH,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginHorizontal: 6,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eff1f5",
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 18,
    color: "#121a26",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#778599",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },
  
//Carousel
  carousel: {
    marginTop: 20,
  },
  cCard: {
    width: width - 40,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#DC5440", // Carousel background color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White text for better contrast
  },
  cSubtitle: {
    fontSize: 18,
    color: "#fff", // White text for better contrast
    marginTop: 8,
  },
  cDescription: {
    fontSize: 16,
    color: "#fff", // White text for better contrast
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
});
