import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Seller/Home";
import Search from "../screens/Seller/Search";
import MyProfile from "../screens/Seller/SellerProfile";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Orders from "../screens/Seller/Orders";
import Message from "../screens/Seller/Message";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKey: true,
  headerShown: false,
};

const SellerTabNavigation = () => {
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
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({ focused }) => {
            return <AntDesign name="message1" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
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

export default SellerTabNavigation;
