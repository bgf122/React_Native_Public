import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  
  const [input1  , setInput1] = useState('');
  const [input2  , setInput2] = useState('');
  const [result  , setResult] = useState('');
  const [data  , setData] = useState([]);

  const calculate = operator => {
    console.log(input1,input2,operator);
    const [number1, number2] = [Number(input1), Number(input2)];

     if (isNaN(number1) || isNaN(number2)) {
      setResult(0);

    } else {
      let result = 0;
      switch (operator) {
        case '+':
          result = number1 + number2;
          break;
        case '-':
          result = number1 - number2;
          break;
      }
      setResult(result);

      const text = `${number1} ${operator} ${number2} = ${result}`;
      setData([...data, {key: text}]);

      setInput1('');
      setInput2('');

    } 
  }

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text>Result: {result}</Text>
      </View>
      <View style={styles.input}>
        <TextInput keyboardType = 'numeric' style={styles.text} onChangeText={text=>  setInput1(text)} value={input1}></TextInput>
        <TextInput keyboardType = 'numeric' style={styles.text} onChangeText={text=>  setInput2(text)} value={input2}></TextInput>
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonLeft}><Button title="+" onPress={() => calculate('+')}/></View>
        <View style={styles.buttonRight}><Button title="-" onPress={() => calculate('-')}/></View>
      </View>
      <View style={styles.history}>
        <Text>History</Text>
        <FlatList 
          data={data} 
          renderItem = {({ item }) => 
          <Text>{item.key}</Text>}
        />
      </View>
    </View>
    
    );
};



const styles = StyleSheet.create({
  container: {
    flex:1
  },
  result: {
    flex: 3,
    backgroundColor: 'white',
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
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  buttons: {
    flex: 2,
    flexDirection: 'row'
  },
  buttonLeft: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  buttonRight: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  history: {
    flex: 4, 
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})

