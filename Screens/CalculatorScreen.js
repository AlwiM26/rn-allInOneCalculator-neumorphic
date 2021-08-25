import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CalculatorScreen = () => {
  const [n, setN] = useState("0");
  const [result, setResult] = useState("");
  const [havePoint, setHavePoint] = useState(false);
  const op = [
    [
      { text: "AC", type: "clear" },
      {
        text: (
          <Ionicons name="md-backspace-outline" size={25} color="#F85E18" />
        ),
        type: "backspace",
      },
      { text: "%", type: "percent" },
      { text: "/", type: "operator" },
    ],
    [
      { text: "7", type: "number" },
      { text: "8", type: "number" },
      { text: "9", type: "number" },
      { text: "*", type: "operator" },
    ],
    [
      { text: "4", type: "number" },
      { text: "5", type: "number" },
      { text: "6", type: "number" },
      { text: "-", type: "operator" },
    ],
    [
      { text: "1", type: "number" },
      { text: "2", type: "number" },
      { text: "3", type: "number" },
      { text: "+", type: "operator" },
    ],
    [
      { text: "0", type: "number" },
      { text: ".", type: "point" },
      { text: "=", type: "equal" },
    ],
  ];

  const handleTap = (type, val) => {
    switch (type) {
      case "clear":
        setHavePoint(false);
        setN("0");
        setResult("");
        break;
      case "backspace":
        return handleBackspace();
      case "percent":
        n !== "0" ? setResult(`= ${eval(n) / 100}`) : setN("0");
        break;
      case "equal":
        return handleEqual();
      case "point":
        if (!havePoint) {
          setN(n + val);
          setHavePoint(true);
        }
        break;
      case "operator":
        setHavePoint(false);
        return handleOperator(val);
      case "number":
        if (result[0] === "=") {
          setResult("");
          setN(val);
        } else {
          if (n === "0") {
            setN(val);
          } else {
            setN(n + val);
          }
        }
        break;
    }
  };

  const handleEqual = () => {
    if (result[0] === "=") {
      return;
    } else {
      if (
        n[n.length - 1] !== "*" &&
        n[n.length - 1] !== "/" &&
        n[n.length - 1] !== "+" &&
        n[n.length - 1] !== "-"
      ) {
        setHavePoint(false);
        setResult(`= ${eval(n)}`);
      } else {
        return;
      }
    }
  };

  const handleOperator = (val) => {
    if (result[0] === "=") {
      setN(result.substring(1) + val);
      setResult("");
    } else {
      if (
        n[n.length - 1] !== "*" &&
        n[n.length - 1] !== "/" &&
        n[n.length - 1] !== "+" &&
        n[n.length - 1] !== "-"
      ) {
        if (val !== n[n.length - 1]) {
          setN(n + val);
        } else {
          return;
        }
      } else {
        if (val !== n[n.length - 1]) {
          if (val !== "/" && val !== "*") {
            setN(n + val);
          } else {
            return;
          }
        } else {
          return;
        }
      }
    }
  };

  const handleBackspace = () => {
    setHavePoint(false);
    if (result[0] === "=") {
      setN("0");
      setResult("");
    } else {
      if (n.length <= 1) {
        setResult("");
        setN("0");
      } else {
        setN(n.substring(0, n.length - 1));
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Container for the number input */}
      <View style={styles.numContainer}>
        <Text style={result !== "" ? styles.numTextAfter : styles.numText}>
          {n}
        </Text>
        {!result || <Text style={styles.resultText}>{result}</Text>}
      </View>

      <View
        style={{
          borderBottomColor: "#999ea7",
          borderBottomWidth: 2,
          marginHorizontal: 10,
        }}
      />

      {/* Container for all the operator button */}
      <View style={styles.operatorContainer}>
        {op.map((item, id) => {
          return (
            <View style={styles.row} key={id}>
              {item.map((operator, id) => {
                return (
                  <View
                    style={
                      operator.type === "equal"
                        ? styles.outerBtnEqual
                        : styles.outerBtn
                    }
                    key={id}
                  >
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
                );
              })}
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
  },
  numContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  numText: {
    fontSize: 40,
    padding: 15,
    textAlign: "right",
  },
  numTextAfter: {
    fontSize: 25,
    padding: 15,
  },
  resultText: {
    fontSize: 40,
    padding: 15,
  },
  operatorContainer: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  outerBtn: {
    flex: 1,
    margin: 10,
    // backgroundColor: "green",
    shadowColor: "#b9bac1",
    shadowOffset: {
      height: 12,
      width: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  outerBtnEqual: {
    flex: 2,
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
});

export default CalculatorScreen;
