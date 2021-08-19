import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const App = () => {

  const [n, setN] = useState('0');
  const [result, setResult] = useState('');
  const [havePoint, setHavePoint] = useState(false);
  const op = [
    [ {text: 'AC', type: 'clear'}, {text:  <Ionicons name="md-backspace-outline" size={25} color="#F85E18" />, type: 'backspace'}, {text: '%', type: 'percent'}, {text: '/', type: 'operator'} ],
    [ {text: '7', type: 'number'}, {text: '8', type: 'number'}, {text: '9', type: 'number'}, {text: '*', type: 'operator'} ],
    [ {text: '4', type: 'number'}, {text: '5', type: 'number'}, {text: '6', type: 'number'}, {text: '-', type: 'operator'} ],
    [ {text: '1', type: 'number'}, {text: '2', type: 'number'}, {text: '3', type: 'number'}, {text: '+', type: 'operator'} ],
    [ {text: '0', type: 'number'}, {text: '.', type: 'point'}, {text: '=', type: 'equal'} ],
  ];  

  const handleTap = (type, val) => {
    switch (type) {
      case 'clear': 
        setHavePoint(false);
        setN('0');
        break;
      case 'backspace': 
        return handleBackspace();
      case 'percent': 
        n !== '0' ? setN(`= ${eval(n) / 100}`) : setN('0');
        break;
      case 'equal':
        setHavePoint(false);
        setResult(`= ${eval(n)}`);
        break;
      case 'point':
        if (!havePoint) {
          setN(n + val);
          setHavePoint(true);
        }
        break;
      case 'operator': 
        setHavePoint(false);
        return handleOperator(val);
      case 'number':
        if (n === '0') { 
          setN(val);
        } else {
          setN(n + val);
        }
        break;
    }
  }

  handleOperator = (val) => {
    if (n[n.length - 1] !== '*' && n[n.length - 1] !=='/' && n[n.length - 1] !=='+' && n[n.length - 1] !=='-' ) {
      if (val !== n[n.length - 1]) {
        setN(n + val);
      } else {
        return;
      }
    } else {
      if (val !== n[n.length - 1]) {
        if (val !== '/' && val !== '*') {
          setN(n + val);
        } else {
          return;
        }
      } else {
        return;
      }
    }
  }

  const handleBackspace = () => {
    setHavePoint(false);
    if ( n[0] === '=' || n.length <= 1) {
      setN('0');
    } else {
      setN(n.substring(0, n.length - 1));
    }
  }

  return (
    <View style={styles.mainContainer}>
      {/* Container for the number input */}
      <View style={styles.numContainer}>
        <Text style={styles.numText}>{n}</Text>
        {!result || <Text style={styles.resultText}>{result}</Text>}
      </View>      

      <View style={{borderBottomColor: '#dedee0', borderBottomWidth: 1, marginHorizontal: 10}} />
      
      {/* Container for all the operator button */}
      <View style={styles.operatorContainer}>

        {op.map((item, id) => {
          return (
          <View style={styles.row} key={id}>
            {item.map((operator, id) => {
              return (          
                <TouchableOpacity style={operator.type === 'equal' ? styles.btnEqual : styles.btnOperator} onPress={() => handleTap(operator.type, operator.text)} key={id}>
                  <Text style={{fontSize: 25, color: operator.type === 'number' ? 'black' : '#F85E18'}}>{operator.text}</Text>
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  numText: {
    fontSize: 40,    
    padding: 15
  },
  resultText: {
    fontSize: 25,
    padding: 15,
    color: '#808080',
  },  
  operatorContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  btnOperator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
    borderRadius: 100,
    borderColor: '#DEDEE0',
    borderWidth: 1,
  },
  btnEqual: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
    borderRadius: 100,
    borderColor: '#DEDEE0',
    borderWidth: 1,
  },
});

export default App;