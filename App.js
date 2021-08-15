import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const App = () => {

  const [n, setN] = useState('');
  const op = [
    [ {text: 'AC'}, {text: 'x'}, {text: '%'}, {text: ' / '} ],
    [ {text: '7'}, {text: '8'}, {text: '9'}, {text: ' * '} ],
    [ {text: '4'}, {text: '5'}, {text: '6'}, {text: ' - '} ],
    [ {text: '1'}, {text: '2'}, {text: '3'}, {text: ' + '} ],
    [ {text: '+/-'}, {text: '0'}, {text: '.'}, {text: '='} ],
  ];  

  const handleOperator = (operator) => {
    setN(n + operator);
  }

  return (
    <View style={styles.mainContainer}>
      {/* Container for the number input */}
      <View style={styles.numContainer}>
        <Text style={styles.numText}>{n}</Text>
      </View>      
      
      {/* Container for all the operator button */}
      <View style={styles.operatorContainer}>

        {op.map((item, id) => {
          return (
          <View style={styles.row} key={id}>
            {item.map((operator, id) => {
              return (          
                <TouchableOpacity style={styles.btnOperator} onPress={() => handleOperator(operator.text)} key={id}>
                  <Text style={styles.textOperator}>{operator.text}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          )
        })}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  numContainer: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  numText: {
    fontSize: 40,    
    padding: 15
  },
  operatorContainer: {
    flex: 1,
    backgroundColor: 'green',
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  btnOperator: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  textOperator: {
    fontSize: 34,
  },
});

export default App;