
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import home from './src/components/home'
import login from './src/components/login'
import signup from './src/components/signUp'
import mainUser from './src/components/mainUser'

import {StackNavigator} from 'react-navigation'

const Application = StackNavigator({
  Home: {screen: home},
  Login: {screen: login},
  SignUp: {screen: signup},
  MainUser: {screen: mainUser}
  }, 
  {
    navigationOption: {
      header: false,
    }
  }
);

export default class App extends Component {
  render() {
    return (
     <Application />
    );
  }
}


