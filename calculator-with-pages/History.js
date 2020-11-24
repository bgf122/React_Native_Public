import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function History( { route } ) {

  if (route.params == null) {
    route.params = '';
  }

  var { data } = route.params;
  
  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.result}>
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
}
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  history: {
    flex: 11  , 
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  result: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
})