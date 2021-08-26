import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BMIScreen = () => {
  const [topInput, setTopInput] = useState("0");
  const [bottomInput, setBottomInput] = useState("0");

  const [topIsClicked, setTopIsClicked] = useState(true);

  const [topUnit, setTopUnit] = useState("Kilograms");
  const [bottomUnit, setBottomUnit] = useState("Centimeters");

  const op = [
    [
      { text: "7", type: "number" },
      { text: "8", type: "number" },
      { text: "9", type: "number" },
      { text: "AC", type: "clear" },
    ],
    [
      { text: "4", type: "number" },
      { text: "5", type: "number" },
      { text: "6", type: "number" },
      {
        text: (
          <MaterialCommunityIcons
            name="backspace-outline"
            size={24}
            color="#F85E18"
          />
        ),
        type: "backspace",
      },
    ],
    [
      { text: "1", type: "number" },
      { text: "2", type: "number" },
      { text: "3", type: "number" },
      { text: "GO", type: "calculate" },
    ],
    [
      { text: "0", type: "number" },
      { text: ".", type: "number" },
    ],
  ];

  const handleTap = (type, val) => {
    switch (type) {
      case "number":
        topIsClicked
          ? topInput.length < 4 &&
            setTopInput(topInput === "0" ? val : topInput + val)
          : bottomInput.length < 4 &&
            setBottomInput(bottomInput === "0" ? val : bottomInput + val);
        break;
      case "clear":
        topIsClicked ? setTopInput("0") : setBottomInput("0");
        break;
      case "backspace":
        if (topIsClicked) {
          if (topInput.length <= 1) {
            setTopInput("0");
          } else {
            setTopInput(topInput.substring(0, topInput.length - 1));
          }
        } else {
          if (bottomInput.length <= 1) {
            setBottomInput("0");
          } else {
            setBottomInput(bottomInput.substring(0, bottomInput.length - 1));
          }
        }
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Number container */}
      <View style={styles.topContainer}>
        <View style={styles.typeContainer}>
          <View style={styles.outerBtnType}>
            <TouchableOpacity style={styles.btnType}>
              <Text style={styles.txtBtnType}>Weights</Text>
              <MaterialCommunityIcons
                name="menu-down"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.outerBtnType}>
            <TouchableOpacity style={styles.btnType}>
              <Text style={styles.txtBtnType}>Height</Text>
              <MaterialCommunityIcons
                name="menu-down"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.numContainer}>
          <View style={styles.inputNumContainer}>
            <Text
              style={{
                fontSize: 30,
                color: topIsClicked ? "#F85E18" : "black",
              }}
              onPress={() => topIsClicked || setTopIsClicked(!topIsClicked)}
            >
              {topInput}
            </Text>
            <Text style={styles.txtUnit}>{topUnit}</Text>
          </View>
          <View style={styles.inputNumContainer}>
            <Text
              style={{
                fontSize: 30,
                color: !topIsClicked ? "#F85E18" : "black",
              }}
              onPress={() => topIsClicked && setTopIsClicked(!topIsClicked)}
            >
              {bottomInput}
            </Text>
            <Text style={styles.txtUnit}>{bottomUnit}</Text>
          </View>
        </View>
      </View>
      {/* Divider */}
      <View
        style={{
          borderBottomColor: "#999ea7",
          borderBottomWidth: 2,
          marginHorizontal: 10,
        }}
      />
      {/* Operator container */}
      <View style={styles.operatorContainer}>
        <View style={styles.column}>
          {op.map((item, id) => {
            return (
              <View style={styles.row} key={id}>
                {item.map((operator, id) => {
                  return (
                    operator.type === "number" && (
                      <View style={styles.outerBtnOperator} key={id}>
                        <TouchableOpacity
                          style={styles.btnOperator}
                          onPress={() =>
                            handleTap(operator.type, operator.text)
                          }
                        >
                          <Text
                            style={{
                              fontSize: 25,
                              color:
                                operator.type === "number"
                                  ? "black"
                                  : "#F85E18",
                            }}
                          >
                            {operator.text}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.modifierContainer}>
          {op.map((item) => {
            return item.map((operator, id) => {
              return (
                operator.type !== "number" && (
                  <View style={styles.outerBtnOperator} key={id}>
                    <TouchableOpacity
                      style={styles.btnOperator}
                      onPress={() => handleTap(operator.type)}
                    >
                      <Text
                        style={{
                          fontSize: 25,
                          color:
                            operator.type === "number" ? "black" : "#F85E18",
                        }}
                      >
                        {operator.text}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              );
            });
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#E2E3EB",
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
  },
  typeContainer: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  outerBtnType: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 40,
    borderRadius: 100,
    shadowColor: "#b9bac1",
    shadowOffset: {
      height: 12,
      width: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  btnType: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E3EB",
    borderRadius: 100,
    shadowColor: "#FFFFFF",
    shadowOffset: {
      height: -12,
      width: -12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  txtBtnType: {
    fontSize: 18,
  },
  numContainer: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  inputNumContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: "flex-end",
    marginRight: 20,
  },
  txtUnit: {
    color: "#787c84",
  },
  operatorContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
  },
  column: {
    flex: 3,
    padding: 10,
    flexDirection: "column",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  outerBtnOperator: {
    flex: 1,
    margin: 10,
    borderRadius: 100,
    shadowColor: "#b9bac1",
    shadowOffset: {
      height: 12,
      width: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  btnOperator: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E2E3EB",
    justifyContent: "space-around",
    borderRadius: 100,
    shadowColor: "#FFFFFF",
    shadowOffset: {
      height: -12,
      width: -12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  modifierContainer: {
    flex: 1,
    padding: 10,
  },
});

export default BMIScreen;
