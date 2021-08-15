import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const App = () => {

  const [n, setN] = useState('69 * 420');

  return (
    <View style={styles.mainContainer}>
      {/* Container for the number input */}
      <View style={styles.numContainer}>
        <Text style={styles.numText}>{n}</Text>
      </View>      
      
      {/* Container for all the operator button */}
      <View style={styles.operatorContainer}>

        <View style={styles.column}>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOperator}>
            <Text style={styles.textOperator}>AC</Text>
          </TouchableOpacity>
        </View>

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
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    justifyContent: 'space-around',
  },
  btnOperator: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  textOperator: {
    fontSize: 34,
  },
});

export default App;