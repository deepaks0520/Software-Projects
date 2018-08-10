import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View  } from 'react-native';
import styles from '../styles/mainUserStyle'
import { createBottomTabNavigator } from 'react-navigation';
import Table from './table'
import MonthlyChart from './monthlyChart'
import YearlyChart from './yearlyChart'

const Tabs = createBottomTabNavigator(
    {
        Table: {screen: Table},
        MonthlyChart: {screen: MonthlyChart},
        YearlyChart: {screen: YearlyChart}
    },
    {
        navigationOption: {
            header: true,
        }
    } 
    
);

export default class Login extends Component {

    render() {
        return (
            
          <Tabs />
        );
    }
}