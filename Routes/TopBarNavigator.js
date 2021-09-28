import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CalculatorScreen from "../Screens/CalculatorScreen";
import MoreNavigator from "./MoreNavigator";

const tab = createMaterialTopTabNavigator();

const TopBarNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <tab.Navigator
        initialRouteName="Home"
        style={{
          marginTop: insets.top,
        }}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#E2E3EB",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#F85E18",
          },
        }}
      >
        <tab.Screen
          name="Home"
          component={CalculatorScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="calculate" size={26} color="#F85E18" />
            ),
          }}
        />
        <tab.Screen
          name="More"
          component={MoreNavigator}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="grid-view" size={26} color="#F85E18" />
            ),
          }}
        />
      </tab.Navigator>
    </NavigationContainer>
  );
};

export default TopBarNavigator;
