import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function App(){
  const [isChecked, setChecked] = useState(false);
  return(
    <View style={styles.container}>
      <View style={styles.row}>
      <Checkbox style={styles.checkbox} value = {isChecked} onValueChange = {setChecked}/>
      <StatusBar style='auto'/>
      </View>
      <Text>My Option</Text>
    </View>
  );

}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    matgin:8
  }
})