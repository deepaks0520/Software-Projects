import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomeStyle from './src/styles/HomeStyle.js'

export default class App extends Component {
  render() {
    return (
      <View style={HomeStyle.container}>
        <Text> Hello</Text>
      </View>
    );
  }
}