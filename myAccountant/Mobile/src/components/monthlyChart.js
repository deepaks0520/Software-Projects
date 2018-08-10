import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View  } from 'react-native';
import styles from '../styles/monthlyChartStyle'

export default class Table extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Monthly Chart!</Text>
        </View>
      );
    }
}