import React from "react";
import TopBarNavigator from "./Routes/TopBarNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#E2E3EB" }}>
      <TopBarNavigator />
    </SafeAreaProvider>
  );
};

export default App;
