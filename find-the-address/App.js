import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [address, setAddress] = useState('');
  const key = '';
  const [location, setLocation] = useState({latitude:60.201373, longitude: 24.934041, latitudeDelta: 0.0322,longitudeDelta:0.0221,});
 

  const getLocation = async () => {
    console.log(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
    
    try {
      const response = await fetch(url);
      const region = await response.json();
      const lat = region.results[0].geometry.location.lat;
      const lng = region.results[0].geometry.location.lng;


      setLocation({latitude: lat, longitude: lng, latitudeDelta: 0.0322, longitudeDelta:0.0221});

      console.log(location);
    } catch(e) {
      Alert.alert('Error', error);
    };
  } 

 
  
  return (
    <View style={styles.container}>
      <View style={styles.map}>
      <MapView 
      style={{flex: 1}}
      region={location}
      >
        <Marker
          coordinate={{latitude: location.latitude, longitude: location.longitude}}
          
        />
      </MapView>
      </View>
      <View style={styles.search}>
        <TextInput style={{width: '100%', fontSize: 20, fontWeight: 'bold', }} placeholder="enter address here" onChangeText={text => setAddress(text)}></TextInput>
        <Button title='SHOW' onPress={getLocation}/>
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
  map: {
    height: '85%',
    width: '100%',
  },
  search: {
    height: '15%',
    width: '100%',
  },

});
