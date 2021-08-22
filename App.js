import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopBarNavigator from "./Routes/TopBarNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#E2E3EB" }}>
      <TopBarNavigator />
    </SafeAreaProvider>
  );
};

export default App;
