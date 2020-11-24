import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, FlatList } from 'react-native';

export default function App() {

  const [desc, setDesc] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    console.log(desc)
    const url = 'http://www.recipepuppy.com/api/?q=' + desc;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      setRecipes(responseJson);
      console.log(recipes.results)

    })
    .catch((error) => {
      Alert.alert('Error', error);
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <FlatList
          style={{marginLeft : "5%"}}
          data={recipes.results}
          keyExtractor={item => item.href}
          ItemSeparatorComponent={listSeparator}
          renderItem={({ item }) => 
          <View>
            <Text style={{fontSize: 16, fontWeight: "bold", }}>{item.title}</Text>
            <View style={styles.image}>
            <Image
            style= {{margin: '1%'}}
            source={ `${item.thumbnail}` ? {
            uri: `${item.thumbnail}`, width: 50, height: 50} : null}
            />
            <Text>{item.ingredients}</Text>
            </View>
          </View>
          } 
      />
      <View style={styles.search}>
      <TextInput placeholder="Find recipes" style={styles.input} onChangeText={text => setDesc(text)}></TextInput>
      <Button title="FIND" onPress={getRecipes}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '6%',
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: 200
  },
  image: {
    flexDirection: "row",
  },
  search: {
    marginTop: '1%',
  },
  input: {
    alignItems: 'center',
    fontSize: 13,
    borderColor: 'black',
    borderWidth: 1,

  }
});
