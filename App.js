import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CalculatorScreen from "./Screens/CalculatorScreen";
import MoreScreen from "./Screens/MoreScreen";
import TopBarNavigator from "./Routes/TopBarNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <TopBarNavigator />
    </SafeAreaProvider>
  );
};

export default App;
