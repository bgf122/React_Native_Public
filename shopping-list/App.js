import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {

  var [text  , setText] = useState('');
  const [data  , setData] = useState([]);

  add = () => {
    setData([...data, {key: text}]);
  }

  clear = () => {
    setData([]);    
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      </View>
      <View style={styles.input}>
        <TextInput style={styles.text} onChangeText={text=>  setText(text)} value={text}></TextInput>
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonLeft}><Button title="ADD" onPress={add}/></View>
        <View style={styles.buttonRight}><Button title="CLEAR" onPress={clear}/></View>
      </View>
      <View style={styles.list}>
        <Text style={styles.tag}>Shopping List</Text>
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
  header: {
    flex: 3,
  },
  text: { 
    alignItems: 'center',
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: 'white'
  },
  input: {
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  buttons: {
    flex: 2,
    flexDirection: 'row'
  },
  buttonLeft: {
    flex: 1,
    backgroundColor: 'white',

  },
  buttonRight: {
    flex: 1,
    backgroundColor: 'white',

  },
  list: {
    flex: 10, 
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tag: {
    color: 'blue',
    fontSize: 18,
  }
})

