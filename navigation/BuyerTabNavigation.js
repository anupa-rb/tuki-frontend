import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Buyer/Home";
import Search from "../screens/Buyer/Search";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Message from "../screens/Buyer/Message";
import Orders from "../screens/Buyer/Orders";
import BuyerProfile from "../screens/Buyer/MyProfile";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKey: true,
  headerShown: false,
};

const BuyerTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                //color={focused ? black : gray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="newspaper-outline" size={24} color="black" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={"search-sharp"}
                size={24}
                //color={focused ? black : gray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({ focused }) => {
            return <AntDesign name="message1" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="BuyerProfile"
        component={BuyerProfile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                //color={focused ? black : gray}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BuyerTabNavigation;
