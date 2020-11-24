import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as firebase from 'firebase';

export default function App() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

  const firebaseConfig = {
    apiKey: "",
    authDomain: "mobiiliohjelmointi-ce7f4.firebaseapp.com",
    databaseURL: "https://mobiiliohjelmointi-ce7f4.firebaseio.com",
    projectId: "mobiiliohjelmointi-ce7f4",
    storageBucket: "mobiiliohjelmointi-ce7f4.appspot.com",
    messagingSenderId: "731116074105",
    appId: "1:731116074205:android:73ec1714a7edc006f85734",
  };
  
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [list, setList] = useState([]);

  firebase.database().ref('items/')

  const saveItem = () => {
    firebase.database().ref('items/' ).push({'product': product,  'amount': amount, 'unit' : unit});
    updateList;
  }

  const updateList = () => {
      firebase.database().ref('items/').on('value', snapshot => {
        const data = snapshot.val();
        const prods = Object.values(data);
        setList(prods);
      });   
  }

  const deleteItem = (id) => {
  
  }

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={{fontSize: 24, fontWeight: 'bold', }}>Shopping List</Text>
        <TextInput placeholder='Product' onChangeText={product => setProduct(product)} value={product}/>
        <TextInput keyboardType='numeric' placeholder='Amount' onChangeText={amount => setAmount(amount)} value={amount}/>
        <Picker style={{height: 50, width: 150, margin: '0%'}}
          mode="dropdown"
          selectedValue={unit}
          onValueChange={(itemValue, itemIndex) => {setUnit(itemValue)}}>
            <Picker.Item label="pieces" value="pcs" />
            <Picker.Item label="grams" value="grams" />
            <Picker.Item label="litres" value="litres" />
            <Picker.Item label="dozen" value="dozen" />
            <Picker.Item label="packs" value="packs" />
            <Picker.Item label="kilograms" value="kilograms" />
        </Picker>
        <Button onPress={saveItem} title='Save'/> 
      </View>
      <View style={styles.output}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) =>
          <View style={styles.list}><Text style={{fontSize: 16}}>{item.product}, {item.amount} {item.unit} </Text>
            <Text style={{color: 'red', fontSize: 16}} onPress={() => deleteItem(item.id)}>Bought</Text>
          </View>}
          data={list}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: '3%',
    justifyContent: 'flex-end',
    flex: 5,
  },
  output: {
    margin: '3%',
    flex: 6,
    justifyContent: 'flex-start',
  },
  list: {
    flexDirection: "row",
  }

});
