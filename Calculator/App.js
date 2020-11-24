import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  
  const [number1  , setNumber1] = useState();
  const [number2  , setNumber2] = useState();

  const [result  , setResult] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.result}><Text>Result: {result}</Text></View>
      <View style={styles.input}>
        <TextInput numeric keyboardType = 'numeric' style={styles.text} onChangeText={number1=>  setNumber1(number1)} value={number1}></TextInput>
        <TextInput numeric keyboardType = 'numeric' style={styles.text} onChangeText={number2=>  setNumber2(number2)} value={number2}></TextInput>
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonLeft}><Button title="+" onPress={() => setResult(parseInt(number1)+parseInt(number2))}/></View>
        
        <View style={styles.buttonRight}><Button title="-" onPress={() => setResult(parseInt(number1)-parseInt(number2))}/></View>
      </View>
    </View>
    );
};



const styles = StyleSheet.create({
  container: {
    flex:1
  },
  result: {
    flex: 4,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  text: { 
    alignItems: 'center',
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  buttons: {
    flex: 3,
    flexDirection: 'row'
  },
  buttonLeft: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  buttonRight: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
})

