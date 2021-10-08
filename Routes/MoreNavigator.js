import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BMIScreen from "../Screens/BMIScreen";
import ConversionScreen from "../Screens/ConversionScreen";
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
      <moreStack.Screen
        name="Length"
        component={ConversionScreen}
        options={{ title: "Length Converter" }}
      />
      <moreStack.Screen
        name="Mass"
        component={ConversionScreen}
        options={{ title: "Mass Converter" }}
      />
      <moreStack.Screen
        name="Time"
        component={ConversionScreen}
        options={{ title: "Time Converter" }}
      />
      <moreStack.Screen
        name="Temperature"
        component={ConversionScreen}
        options={{ title: "Temperature Converter" }}
      />
      <moreStack.Screen
        name="Volume"
        component={ConversionScreen}
        options={{ title: "Volume Converter" }}
      />
      <moreStack.Screen
        name="Speed"
        component={ConversionScreen}
        options={{ title: "Speed Converter" }}
      />
    </moreStack.Navigator>
  );
};

export default MoreNavigator;
