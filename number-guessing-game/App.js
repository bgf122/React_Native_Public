import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';

export default function App() {

  var [guess, SetGuess] = useState();
  var [count, SetCount] = useState(0);
  var [result  , setResult] = useState('Guess a number between 1-100');

  buttonPressed = () => {
    if (guess > number) {
      SetCount(count + 1);
      setResult('Your guess '+ guess + ' is too high');
    } else if (guess < number) {
      SetCount(count + 1);
      setResult('Your guess '+ guess + ' is too low');
    } else {
      Alert.alert ('You guessed the number in ' + count + ' guesses')
      number = Math.floor(Math .random() * 100) + 1;
      SetCount(0);
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.result}><Text>{result}</Text></View>
      <View style={styles.input}>
      <View style={styles.textinput}>
        <TextInput numeric keyboardType = 'numeric' onChangeText={guess=>  SetGuess(guess)} value={guess}></TextInput>
      </View>
      </View>
      <View style={styles.button}>
        <Button onPress={buttonPressed} title="MAKE A GUESS"/>
      </View>

      
    </View>
  );
}

var number = Math.floor(Math .random() * 100) + 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  result: {
    flex: 5,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textinput: { 
    width: 200,
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  button: {
    flex: 8,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

});
