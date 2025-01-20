import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import FirstScreen from "./screens/FirstScreen";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName="First Screen">
  <Stack.Screen
    name = 'First Screen'
    component={FirstScreen}
    options = {{headerShown:false}}
    />
    <Stack.Screen
    name = 'Bottom Navigation'
    component={BottomTabNavigation}
    options = {{headerShown:false}}
    />
        <Stack.Screen
    name = 'Login'
    component={Login}
    options = {{headerShown:false}}
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