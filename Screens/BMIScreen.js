import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomModal from "../components/BottomModal";

const BMIScreen = () => {
  const [topInput, setTopInput] = useState("0");
  const [bottomInput, setBottomInput] = useState("0");
  const [result, setResult] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("Underweight");
  const [weightHavePoint, setWeightHavePoint] = useState(false);
  const [heightHavePoint, setHeightHavePoint] = useState(false);

  const [topIsClicked, setTopIsClicked] = useState(true);

  const weightOptions = [
    { name: "Kilograms", code: "kg" },
    { name: "Pounds", code: "lb" },
  ];
  const heightOptions = [
    { name: "Centimeters", code: "cm" },
    { name: "Meters", code: "m" },
    { name: "Feet", code: "ft" },
    { name: "Inches", code: "in" },
  ];

  const [topUnit, setTopUnit] = useState(weightOptions[0]);
  const [bottomUnit, setBottomUnit] = useState(heightOptions[0]);
  let weightModalRef = React.createRef();
  let heightModalRef = React.createRef();

  // useEffect(() => {}, [topInput, bottomInput]);

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
      { text: ".", type: "point" },
    ],
  ];

  const handleTap = (type, val) => {
    switch (type) {
      case "point":
        handlePoint(val);
        break;
      case "number":
        handleNumber(val);
        break;
      case "clear":
        handleClear();
        break;
      case "backspace":
        handleBackspace();
        break;
      case "calculate":
        handleCalculate();
        break;
      case "clearResult":
        setResult(null);
        break;
    }
  };

  const handlePoint = (val) => {
    if (topIsClicked) {
      if (!weightHavePoint) {
        setTopInput(topInput + val);
        setWeightHavePoint(true);
      }
    } else {
      if (!heightHavePoint) {
        setBottomInput(bottomInput + val);
        setHeightHavePoint(true);
      }
    }
  };

  const handleNumber = (val) => {
    if (topIsClicked) {
      !weightHavePoint
        ? topInput.length < 3 &&
          setTopInput(topInput === "0" ? val : topInput + val)
        : topInput.length < 5 &&
          setTopInput(topInput === "0" ? val : topInput + val);
    } else {
      !heightHavePoint
        ? bottomInput.length < 3 &&
          setBottomInput(bottomInput === "0" ? val : bottomInput + val)
        : bottomInput.length < 5 &&
          setBottomInput(bottomInput === "0" ? val : bottomInput + val);
    }
  };

  const handleClear = () => {
    if (topIsClicked) {
      setTopInput("0");
      setWeightHavePoint(false);
    } else {
      setBottomInput("0");
      setHeightHavePoint(false);
    }
  };

  const handleBackspace = () => {
    if (topIsClicked) {
      if (topInput.length <= 1) {
        setTopInput("0");
      } else {
        topInput[topInput.length - 1] === "." && setWeightHavePoint(false);
        setTopInput(topInput.substring(0, topInput.length - 1));
      }
    } else {
      if (bottomInput.length <= 1) {
        setBottomInput("0");
      } else {
        bottomInput[bottomInput.length - 1] === "." &&
          setHeightHavePoint(false);
        setBottomInput(bottomInput.substring(0, bottomInput.length - 1));
      }
    }
  };

  const handleCalculate = () => {
    if (topInput <= 0 || bottomInput <= 0) {
      Alert.alert(
        "Error",
        "Make sure the weight and height you entered are correct",
        [{ text: "Ok" }]
      );
    } else {
      let weight = 0;
      let height = 0;

      // weight conversions
      if (topUnit.name === "Pounds") {
        weight = topInput * 0.453;
      } else {
        weight = topInput;
      }

      // height conversions
      if (bottomUnit.name === "Meters") {
        height = bottomInput * 100;
      } else if (bottomUnit.name === "Feet") {
        height = bottomInput * 30.48;
      } else if (bottomUnit.name === "Inches") {
        height = bottomInput * 2.54;
      } else {
        height = bottomInput;
      }

      let n = eval(
        weight + " / " + height + " / " + height + " * 10000"
      ).toFixed(1);
      if (n > 50) {
        Alert.alert(
          "Error",
          "Make sure the weight and height you entered are correct",
          [{ text: "Ok" }]
        );
      } else {
        setResult(n);
        setBmiStatus(
          n < 18.5
            ? "Underweight"
            : n >= 18.5 && n < 25.0
            ? "Normal"
            : "Overweight"
        );
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Number container */}
      <View style={styles.topContainer}>
        <View style={styles.typeContainer}>
          <View style={styles.outerBtnType}>
            <TouchableOpacity
              style={styles.btnType}
              onPress={() => weightModalRef.show()}
            >
              <Text style={styles.txtBtnType}>Weights</Text>
              <MaterialCommunityIcons
                name="menu-down"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <BottomModal
            ref={(target) => (weightModalRef = target)}
            title={"Weight"}
            onTouch={() => weightModalRef.close()}
            options={weightOptions}
            setUnit={(val) => {
              weightModalRef.close();
              setTopUnit(val);
            }}
          />
          <View style={styles.outerBtnType}>
            <TouchableOpacity
              style={styles.btnType}
              onPress={() => heightModalRef.show()}
            >
              <Text style={styles.txtBtnType}>Height</Text>
              <MaterialCommunityIcons
                name="menu-down"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <BottomModal
            ref={(target) => (heightModalRef = target)}
            title={"Height"}
            onTouch={() => heightModalRef.close()}
            options={heightOptions}
            setUnit={(val) => {
              heightModalRef.close();
              setBottomUnit(val);
            }}
          />
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
            <Text style={styles.txtUnit}>{topUnit.name}</Text>
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
            <Text style={styles.txtUnit}>{bottomUnit.name}</Text>
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
      {result === null ? (
        <View style={styles.operatorContainer}>
          <View style={styles.column}>
            {op.map((item, id) => {
              return (
                <View style={styles.row} key={id}>
                  {item.map((operator, id) => {
                    return operator.type === "number" ||
                      operator.type === "point" ? (
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
                    ) : null;
                  })}
                </View>
              );
            })}
          </View>
          <View style={styles.modifierContainer}>
            {op.map((item) => {
              return item.map((operator, id) => {
                return operator.type !== "number" &&
                  operator.type !== "point" ? (
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
                ) : null;
              });
            })}
          </View>
        </View>
      ) : (
        <View style={styles.containerResult}>
          <View style={styles.cardContainerOuter}>
            <View style={styles.cardContainer}>
              <View style={styles.cardTopSec}>
                <Text style={styles.txtResult}>{result}</Text>
                <View style={styles.statusContainer}>
                  <Text style={styles.txtBMI}>BMI</Text>
                  <Text style={styles.txtStatus}>{bmiStatus}</Text>
                </View>
              </View>
              <View style={styles.cardBotSec}>
                <View style={styles.containerTxtCat}>
                  <Text style={[styles.txtCat, { color: "#499de9" }]}>
                    Underweight
                  </Text>
                  <Text style={[styles.txtCat, { color: "#63cf75" }]}>
                    Normal
                  </Text>
                  <Text style={[styles.txtCat, { color: "#f37a7a" }]}>
                    Overweight
                  </Text>
                </View>
                <View style={styles.containerCatBar}>
                  <View
                    style={{
                      borderBottomColor: "#499de9",
                      borderBottomWidth: 5,
                      flex: 1,
                    }}
                  />
                  <View
                    style={{
                      borderBottomColor: "#63cf75",
                      borderBottomWidth: 5,
                      flex: 1,
                    }}
                  />
                  <View
                    style={{
                      borderBottomColor: "#f37a7a",
                      borderBottomWidth: 5,
                      flex: 1,
                    }}
                  />
                </View>
                <View style={styles.containerTxtCatNum}>
                  <Text style={styles.txtCatNum}>16.0</Text>
                  <Text style={styles.txtCatNum}>18.5</Text>
                  <Text style={[styles.txtCatNum, { textAlign: "right" }]}>
                    25.0
                  </Text>
                  <Text style={[styles.txtCatNum, { textAlign: "right" }]}>
                    40.0
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.containerBtnBack}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => handleTap("clearResult", 0)}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={35}
                color="#F85E18"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    padding: 5,
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
  containerResult: {
    flex: 1,
    marginBottom: 24,
  },
  cardContainerOuter: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 10,
    borderRadius: 30,
    shadowColor: "#b9bac1",
    shadowOffset: {
      height: 12,
      width: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E2E3EB",
    borderRadius: 30,
    shadowColor: "#FFFFFF",
    shadowOffset: {
      height: -12,
      width: -12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
    alignItems: "center",
    padding: 10,
  },
  cardTopSec: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  txtResult: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: "700",
    color: "#F85E18",
    marginRight: 10,
  },
  statusContainer: {
    alignItems: "center",
  },
  txtBMI: {
    color: "#787c84",
    fontSize: 40,
    fontWeight: "600",
  },
  txtStatus: {
    fontSize: 13,
    color: "#F85E18",
  },
  cardBotSec: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  containerTxtCat: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  txtCat: {
    flex: 1,
    textAlign: "center",
  },
  containerCatBar: {
    marginVertical: 8,
    flexDirection: "row",
  },
  containerTxtCatNum: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtCatNum: {
    flex: 1,
    marginHorizontal: 2,
  },
  containerBtnBack: {
    alignSelf: "center",
    alignContent: "center",
    width: 80,
    height: 80,
    padding: 10,
    borderRadius: 20,
    shadowColor: "#b9bac1",
    shadowOffset: {
      height: 12,
      width: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  btnBack: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E2E3EB",
    justifyContent: "space-around",
    borderRadius: 20,
    shadowColor: "#FFFFFF",
    shadowOffset: {
      height: -12,
      width: -12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
});

export default BMIScreen;
