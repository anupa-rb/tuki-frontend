import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import BuyerTabNavigation from "./navigation/BuyerTabNavigation";
import SellerTabNavigation from "./navigation/SellerTabNavigation";
import FirstScreen from "./screens/FirstScreen";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ChooseRole from "./screens/ChooseRole";
import SecondScreen from "./screens/SecondScreen";
import Notification from "./screens/Buyer/Notification";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First Screen">
        <Stack.Screen
          name="First Screen"
          component={FirstScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SecondScreen"
          component={SecondScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Buyer Navigation"
          component={BuyerTabNavigation}
          options={{ headerShown: false }}
        />
                <Stack.Screen
          name="Seller Navigation"
          component={SellerTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseRole"
          component={ChooseRole}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
