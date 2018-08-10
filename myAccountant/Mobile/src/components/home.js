import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import styles from '../styles/homeStyle'

export default class Login extends Component {

   /* componentDidMount (){
        this.loadInitialState().done();
    }

    loadInitialState = async() => {
        var value = await AsyncStorage.getItem('token');
        console.log(value)
        if (value != null) {
            this.props.navigation.navigate('MainUser');
        }
    }
*/
    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.header}> WELCOME TO MY ACCOUNTANT </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.login}>
                    <Text> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.signUp}>
                    <Text> Sign Up </Text>
                </TouchableOpacity>

            </View>
        );
    }

    login = () => {
       this.props.navigation.navigate('Login');
    }

    signUp = () => {
        this.props.navigation.navigate('SignUp')
    }
}


