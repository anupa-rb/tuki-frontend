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
import BNotification from "./screens/Buyer/Notification";
import SNotification from "./screens/Seller/Notification";
import Chat from "./screens/Buyer/Chat";
import Message from "./screens/Buyer/Message";
import AddProduct from "./screens/Seller/AddProduct";
import MyProfile from "./screens/Seller/MyProfile";
import ProductAdded from "./screens/Seller/ProductAdded";
import SellerChat from "./screens/Seller/SellerChat";
import Product from "./screens/Buyer/Product";
import Categories from "./screens/Buyer/Categories";

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
          name="BNotification"
          component={BNotification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SNotification"
          component={SNotification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Message"
          component={Message}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SellerChat"
          component={SellerChat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductAdded"
          component={ProductAdded}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product"
          component={Product}
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
