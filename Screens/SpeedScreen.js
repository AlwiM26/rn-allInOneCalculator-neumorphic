import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SpeedScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>BMI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E3EB",
  },
});

export default SpeedScreen;
