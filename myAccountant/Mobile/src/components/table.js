import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import styles from '../styles/tableStyle'

export default class Table extends React.Component {

    async retrieveItem(key) {
      try {
        console.log(key)
        const retrievedItem =  await AsyncStorage.getItem(key)
        console.log(retrievedItem)
        console.warn(retrievedItem)
        const item = JSON.parse(retrievedItem);
        return item;
      } catch (error) {
        console.log(error.message);
      }
      return
    }
   
    render() {
      this.retrieveItem("token").then((goals) => {
        console.warn(goals)
        }).catch((error) => {
        console.log('Promise is rejected with error: ' + error);
        }); 

      return (
        <View style={styles.container}>
          <Text style={styles.text}>Table! </Text>
        </View>
      );
    }
}