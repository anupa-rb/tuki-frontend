import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen
    name = 'Bottom Navigation'
    component={BottomTabNavigation}
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