import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Image, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  

  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState('');
  const [rates, setRates] = useState({});
  const [eur, setEur] = useState('');

  const getData = async () => {
    const url = 'https://api.exchangeratesapi.io/latest'

    try {
      const response = await fetch(url);
      const currencyData = await response.json();
      setRates(currencyData.rates);
      console.log(rates);
    } 
    catch(e) {
      Alert.alert('Error', error);
    };
  }

  useEffect(() => { getData() }, []);

  const convert = () => {
    const amountEur = Number(amount) / rates[selected];
    setEur(`${amountEur.toFixed(2)}€`);
  }

  return (
    <View style={styles.container}>
      <Image source={{uri:'https://p2.piqsels.com/preview/986/548/23/cash-coins-currency-finance-thumbnail.jpg'}}style={{width: 200, height: 200}}></Image>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{eur}</Text>
      <View style={styles.input}>
        <TextInput style={{fontSize: 16, fontWeight: 'bold'}} placeholder="amount" keyboardType="numeric" value={amount} onChangeText={text => setAmount(text)}></TextInput>
        
        <Picker style={{height: 50, width: 100, fontSize: 18, fontWeight: 'bold'}}
          mode="dropdown"
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) => {setSelected(itemValue)}}>
          {Object.keys(rates).map(key => (<Picker.Item label={key} value={key} key={key}/>))}
        </Picker>
        <Button title="CONVERT" onPress={convert}></Button>
      </View>
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
    alignItems: 'center',
    margin: '1%',
    

  }
});
