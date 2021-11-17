import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import convert from "convert-units";
import BottomModal from "../components/BottomModal";

const ConversionScreen = ({ route }) => {
  const { opt } = route.params;

  const [topInput, setTopInput] = useState("0");
  const [bottomInput, setBottomInput] = useState("0");

  const [topIsClicked, setTopIsClicked] = useState(true);
  const [topHavePoint, setTopHavePoint] = useState(false);
  const [botHavePoint, setBotHavePoint] = useState(false);

  const [topUnit, setTopUnit] = useState(opt[0]);
  const [bottomUnit, setBottomUnit] = useState(opt[1]);

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
    ],
    [
      { text: "0", type: "number" },
      { text: ".", type: "point" },
    ],
  ];

  useEffect(() => {
    topIsClicked
      ? setBottomInput(
          "" +
            convert(+topInput)
              .from(topUnit.code)
              .to(bottomUnit.code)
        )
      : setTopInput(
          "" +
            convert(+bottomInput)
              .from(bottomUnit.code)
              .to(topUnit.code)
        );
  }, [topInput, topUnit, bottomInput, bottomUnit]);

  let topRef = React.createRef();
  let botRef = React.createRef();

  const handleTap = (type, val) => {
    switch (type) {
      case "point":
        handlePoint(val);
        break;
      case "number":
        topIsClicked
          ? topInput.length < 15 &&
            setTopInput(topInput === "0" ? val : topInput + val)
          : bottomInput.length < 10 &&
            setBottomInput(bottomInput === "0" ? val : bottomInput + val);
        break;
      case "clear":
        if (topIsClicked) {
          setTopInput("0");
          setTopHavePoint(false);
        } else {
          setBottomInput("0");
          setBotHavePoint(false);
        }
        break;
      case "backspace":
        if (topIsClicked) {
          if (topInput.length <= 1) {
            setTopInput("0");
          } else {
            topInput[topInput.length - 1] === "." && setTopHavePoint(false);
            setTopInput(topInput.substring(0, topInput.length - 1));
          }
        } else {
          if (bottomInput.length <= 1) {
            setBottomInput("0");
          } else {
            bottomInput[bottomInput.length - 1] === "." &&
              setBotHavePoint(false);
            setBottomInput(bottomInput.substring(0, bottomInput.length - 1));
          }
        }
    }
  };

  const handlePoint = (val) => {
    if (topIsClicked) {
      if (!topHavePoint) {
        setTopInput(topInput + val);
        setTopHavePoint(true);
      }
    } else {
      if (!botHavePoint) {
        setBottomInput(bottomInput + val);
        setBotHavePoint(true);
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
              onPress={() => topRef.show()}
            >
              <Text style={styles.txtBtnType}>{topUnit.code}</Text>
              <MaterialCommunityIcons
                name="menu-down"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <BottomModal
            ref={(target) => (topRef = target)}
            title={"Select Unit"}
            onTouch={() => topRef.close()}
            options={opt}
            setUnit={(val) => {
              topRef.close();
              setTopUnit(val);
            }}
          />
          <View style={styles.outerBtnType}>
            <TouchableOpacity
              style={styles.btnType}
              onPress={() => botRef.show()}
            >
              <Text style={styles.txtBtnType}>{bottomUnit.code}</Text>
              <MaterialCommunityIcons
                name="menu-down"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <BottomModal
            ref={(target) => (botRef = target)}
            title={"Select Unit"}
            onTouch={() => botRef.close()}
            options={opt}
            setUnit={(val) => {
              botRef.close();
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
                textAlign: "right",
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
                textAlign: "right",
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
                        onPress={() => handleTap(operator.type, operator.text)}
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
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.modifierContainer}>
          {op.map((item) => {
            return item.map((operator, id) => {
              return operator.type !== "number" && operator.type !== "point" ? (
                <View style={styles.outerBtnOperator} key={id}>
                  <TouchableOpacity
                    style={styles.btnOperator}
                    onPress={() => handleTap(operator.type)}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        color: operator.type === "number" ? "black" : "#F85E18",
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
    marginRight: 15,
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
    flex: 1.8,
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

export default ConversionScreen;
