import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OtherScreen = ({ navigation }) => {
  const calculatorMenu = [
    {
      name: "BMI",
      icon: (
        <MaterialCommunityIcons
          name="scale-bathroom"
          size={30}
          color="#686c71"
        />
      ),
    },
    {
      name: "Length",
      icon: <MaterialCommunityIcons name="ruler" size={30} color="#686c71" />,
    },
    {
      name: "Mass",
      icon: <MaterialCommunityIcons name="weight" size={30} color="#686c71" />,
    },
    {
      name: "Time",
      icon: (
        <MaterialCommunityIcons
          name="clock-time-three-outline"
          size={30}
          color="#686c71"
        />
      ),
    },
    {
      name: "Temperature",
      icon: (
        <MaterialCommunityIcons name="thermometer" size={30} color="#686c71" />
      ),
    },
    {
      name: "Area",
      icon: (
        <MaterialCommunityIcons name="arrow-expand" size={30} color="#686c71" />
      ),
    },
    {
      name: "Volume",
      icon: (
        <MaterialCommunityIcons name="cube-outline" size={30} color="#686c71" />
      ),
    },
    {
      name: "Speed",
      icon: (
        <MaterialCommunityIcons name="speedometer" size={30} color="#686c71" />
      ),
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.btnContainer}>
        {calculatorMenu.map((menu, id) => {
          return (
            <View style={styles.btn} key={id}>
              <TouchableOpacity
                style={styles.btnInner}
                onPress={() => navigation.navigate(menu.name)}
              >
                {menu.icon}
                <Text style={styles.btnText}>{menu.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#E2E3Eb",
    alignItems: "center",
  },
  btnContainer: {
    flex: 1,
    margin: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  btn: {
    width: "27.5%",
    height: "auto",
    marginVertical: 16,
    marginHorizontal: 10,
    shadowColor: "#b9bac1",
    shadowOffset: {
      height: 12,
      width: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  btnInner: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
    backgroundColor: "#E2E3EB",
    shadowColor: "#FFFFFF",
    shadowOffset: {
      height: -12,
      width: -12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  btnText: {
    marginTop: 10,
  },
});

export default OtherScreen;
