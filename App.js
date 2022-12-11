import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Button,
} from "react-native";
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';

// get data from this URL!
const movieURL = "https://reactnative.dev/movies.json";
let x = 1;
let myArray = [];
const App = () => {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  // const initaliseState = {};
  // console.log('====================================');
  // for (let i = 0; i < data.length; i++) {
  //   data[i].isSelected = false;
    
  // }
  // console.log(data.length)
  // console.log('====================================');
  // x++;
  // const handleOnChange = (position) => {
  //   const updatedCheckedState = isChecked.map((item, index) =>
  //     item.id === position ? !item : item
  //   );
  //   setChecked(updatedCheckedState);
  // }
  // const initialState = data.map((item) =>{
  //   item.id:false;
  // });
  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(movieURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json.movies);
        setTitle(json.title);
        setDescription(json.description);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);

  // Also get call asynchronous function
  async function getMoviesAsync() {
    try {
      let response = await fetch(movieURL);
      let json = await response.json();
      setData(json.movies);
      setTitle(json.title);
      setDescription(json.description);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  // Store selection in local async storage
  function onchecked(id) { 
    console.log(id); 
   }
  // Save the user's selection to local storage
  const saveSelection = async (selection) => {
    try {
      await AsyncStorage.setItem("userSelection", selection);
    } catch (error) {
      // Error saving data
    }
  };

  // Retrieve the user's selection from local storage
  const getSelection = async () => {
    try {
      const selection = await AsyncStorage.getItem("userSelection");
      if (selection !== null) {
        // We have data!
        return selection;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // end

  return (
    <SafeAreaView style={styles.container}>
      {/* While fetching show the indicator, else show response*/}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* Title from URL */}
          <Text style={styles.title}>{title}</Text>
          {/* Display each movie */}
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
                <View style={styles.row}>
                <Checkbox style={styles.checkbox} value = {isChecked} onValueChange = {setChecked}/>
                <StatusBar style='auto'/>
                </View>
                <Text>{item.title}</Text>
              </View>
            )}
          />
          <View>
          <Button
          onPress={() => setToggleButton(toggleButton => !toggleButton)}
          title="Save"
        />
          </View>
          {/* Show the description */}
          <Text style={styles.description}>{description}</Text>

          {/* {toggleButton && (
        <View style={styles.resultContainer}>
          {Object.entries(state).map(([key, value]) => {
            return (
              value && (
                <View key={key} style={{paddingHorizontal: 5}}>
                  <Text>{key}</Text>
                </View>
              )
            );
          })}
        </View>
      )} */}

        </View>
        
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  movieText: {
    fontSize: 26,
    fontWeight: "200",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    color: "green",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    flexDirection: "row",
    marginBottom: 20,
  }
});

export default App;
