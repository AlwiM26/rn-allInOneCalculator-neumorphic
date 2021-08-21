import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CalculatorScreen from "../Screens/CalculatorScreen";
import MoreScreen from "../Screens/MoreScreen";

const tab = createMaterialTopTabNavigator();

const TopBarNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <tab.Navigator
        initialRouteName="Home"
        style={{
          backgroundColor: "black",
          marginTop: insets.top,
        }}
        screenOptions={{
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "pink",
          tabBarShowLabel: false,
        }}
      >
        <tab.Screen
          name="Home"
          component={CalculatorScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="calculate" size={24} color="#F85E18" />
            ),
            title: "",
          }}
        />
        <tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="grid-view" size={24} color="#F85E18" />
            ),
            title: "",
          }}
        />
      </tab.Navigator>
    </NavigationContainer>
  );
};

export default TopBarNavigator;
