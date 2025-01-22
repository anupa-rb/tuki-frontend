import { View, Text } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Seller/Home';
import Search from '../screens/Seller/Search';
import Profile from '../screens/Seller/MyProfile';
import { Ionicons } from "@expo/vector-icons"


const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKey: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70
    }
}

const SellerTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
            tabBarIcon:({focused}) => {
                return <Ionicons name ={focused ? "home" : "home-outline"} 
                size={24}
                //color={focused ? black : gray}
                />
            }
        }}
        />
        <Tab.Screen 
        name="Search" 
        component={Search}
        options={{
            tabBarIcon:({focused}) => {
                return <Ionicons name ={"search-sharp"} 
                size={24}
                //color={focused ? black : gray}
                />
            }
        }}
        />
        <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
            tabBarIcon:({focused}) => {
                return <Ionicons name ={focused ? "person" : "person-outline"} 
                size={24}
                //color={focused ? black : gray}
                />
            }
        }}
        />
    </Tab.Navigator>
  )
}

export default SellerTabNavigation