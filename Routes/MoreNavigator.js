import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BMIScreen from "../Screens/BMIScreen";
import AgeScreen from "../Screens/AgeScreen";
import LengthScreen from "../Screens/LengthScreen";
import MassScreen from "../Screens/MassScreen";
import TimeScreen from "../Screens/TimeScreen";
import TempScreen from "../Screens/TempScreen";
import AreaScreen from "../Screens/AreaScreen";
import VolumeScreen from "../Screens/VolumeScreen";
import SpeedScreen from "../Screens/SpeedScreen";
import OtherScreen from "../Screens/OtherScreen";

const moreStack = createNativeStackNavigator();

const MoreNavigator = () => {
  return (
    <moreStack.Navigator
      initialRouteName="Other"
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#E2E3EB" },
        headerTintColor: "#F85E18",
      }}
    >
      <moreStack.Screen
        name="Other"
        component={OtherScreen}
        options={{ headerShown: false }}
      />
      <moreStack.Screen name="BMI" component={BMIScreen} />
      <moreStack.Screen name="Age" component={AgeScreen} />
      <moreStack.Screen name="Length" component={LengthScreen} />
      <moreStack.Screen name="Mass" component={MassScreen} />
      <moreStack.Screen name="Time" component={TimeScreen} />
      <moreStack.Screen name="Temperature" component={TempScreen} />
      <moreStack.Screen name="Area" component={AreaScreen} />
      <moreStack.Screen name="Volume" component={VolumeScreen} />
      <moreStack.Screen name="Speed" component={SpeedScreen} />
    </moreStack.Navigator>
  );
};

export default MoreNavigator;
