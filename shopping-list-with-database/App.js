import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [list, setList] = useState([]);

  const db = SQLite.openDatabase('shoppingList.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppingList (id integer primary key not null, product text, amount double, unit text);');
    }, null, updateList);
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppingList (product, amount, unit) values (?, ?, ?);', [product, amount, unit]);
    }, null, updateList)
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppingList;', [], (_, { rows }) => 
        setList(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from shoppingList where id = ?', [id]);
    }, null, updateList)
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
