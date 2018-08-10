import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View  } from 'react-native';
import styles from '../styles/yearlyChartStyle'

export default class Table extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Yearly Chart</Text>
        </View>
      );
    }
}