import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import styles from '../styles/loginStyle'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {username: ' ' , password: ' ', validateUsername: false, validatePassword: false};
    }

    componentDidMount (){
        this.loadInitialState().done();
    }

    loadInitialState = async() => {
        var value = await AsyncStorage.getItem('token');
        if (value != null) {
            this.props.navigation.navigate('MainUser');
        }
    }

    validateFields(text, type) {

        if (type == 'username'){
            this.setState({
                username: text,
            })
            if (this.state.username == ''){ 
                this.setState({
                    validateUsername: false,
                })
            }
            else {
                this.setState({
                    validateUsername: true,
                })
            }
        }
        else {
            this.setState({
                password: text,
            })
            if (this.state.password == ''){
                this.setState({
                    validatePassword: false,
                })
            }
            else{
                this.setState({
                    validatePassword: true,
                })
            }
        }       
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style ={styles.container} keyboardVerticalOffset={0}>

                    <Text style={styles.header}> LOGIN </Text>

                    <TextInput 
                        style={[styles.textInput, !this.state.validateUsername ? styles.error : null]} 
                        placeholder='Username' 
                        onChangeText={ (username) => this.validateFields(username, "username")} 
                        underlineColorAndroid='transparent'
                    />
                    <Text> {this.state.validateUsername ? " " : "Please enter your Username"} </Text>
                    <TextInput 
                        style={[styles.textInput, !this.state.validatePassword ? styles.error : null]}
                        placeholder='Password' 
                        onChangeText={ (password) => this.validateFields(password, "password")}
                        underlineColorAndroid='transparent'
                        secureTextEntry
                    />
                    <Text> {this.state.validatePassword ? " " : "Please enter your Password"} </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.login}>
                        <Text> Log In </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.back}>
                        <Text> Go Back</Text>
                    </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }

    back = () => {
        this.props.navigation.navigate('Home')
    }

    async storeData (token) {
        try {
          var value = await AsyncStorage.setItem("token", JSON.stringify(token));
          console.log(value)
        }
        catch (error) {
            console.log('saving data has error')
        }
      }

    login = () => {
        if (this.state.validatePassword && this.state.validateUsername){
            const user = {
                username: this.state.username,
                password: this.state.password,
            }
            fetch('http://10.0.2.2:4000/users/signIn', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .then((res=> { 
                if (res.success === true){
                    this.storeData(res.token);
                    this.props.navigation.navigate('MainUser');
                }
                else{
                    alert('Cannot find User. Please try again.');
                }
            }))
            .done();
        }
        else{
            alert('Please fix above errors before logging in!')
        }
    }
}


