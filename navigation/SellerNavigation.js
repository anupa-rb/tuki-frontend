import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "../screens/Seller/MyProfile";
import Notification from "../screens/Seller/Notification";

const Stack = createNativeStackNavigator();
const SellerNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notificatiom"
          component={Notification}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SellerNavigation;
