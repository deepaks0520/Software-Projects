import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import styles from '../styles/signUpStyle'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {name: ' ', email: ' ', username: ' ' , password: ' ', 
        validateUsername: false, validatePassword: false, validateEmail: false, validateName: false};
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
        else if (type == 'password') {
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
        
        else if (type == 'email') {
            this.setState({
                email: text,    
            })
            if (this.state.email == ''){
                this.setState({
                    validateEmail: false,
                })
            }
            else if (!this.validateEmailFn(this.state.email)){
                this.setState({
                    validateEmail: false,
                })
            }
            else{
                this.setState({
                    validateEmail: true,
                })
            }
        }

        else {
            this.setState({
                name: text,    
            })
            if (this.state.name == ''){
                this.setState({
                    validateName: false,
                })
            }
            else{
                this.setState({
                    validateName: true,
                })
            }
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style ={styles.container}>

                    <Text style={styles.header}> SIGN UP </Text>

                    <TextInput 
                        style={[styles.textInput, !this.state.validateName ? styles.error : null]} 
                        placeholder='Your Name' 
                        onChangeText={ (name) => this.validateFields(name, "name")} 
                        underlineColorAndroid='transparent'
                    />
                    <Text> {this.state.validateName ? " " : "Please enter a valid Name"} </Text>

                    <TextInput 
                        style={[styles.textInput, !this.state.validateEmail ? styles.error : null]} 
                        placeholder='Your Email' 
                        onChangeText={ (email) => this.validateFields(email, "email")} 
                        underlineColorAndroid='transparent'
                    />
                    <Text> {this.state.validateEmail ? " " : "Please enter a valid Email"} </Text>
                    <TextInput 
                        style={[styles.textInput, !this.state.validateUsername ? styles.error : null]} 
                        placeholder='Username' 
                        onChangeText={ (username) => this.validateFields(username, "username")}
                        underlineColorAndroid='transparent'
                    />
                    <Text> {this.state.validateUsername ? " " : "Please enter a valid Username"} </Text>
                    <TextInput 
                        style={[styles.textInput, !this.state.validatePassword ? styles.error : null]} 
                        placeholder='Password'
                        onChangeText={ (password) => this.validateFields(password, "password")}
                        underLineColorAndroid='transparent'
                        secureTextEntry 
                    />
                    <Text> {this.state.validatePassword ? " " : "Please enter a valid Password"} </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.signUp}>
                        <Text> Sign Up </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.back}>
                        <Text> Go Back </Text>
                    </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }

    back = () => {
        this.props.navigation.navigate('Home')
    }

    validateEmailFn(email){
        console.log('checking if an email has been provided')
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    signUp = () => {
       
        if (this.state.validateEmail && this.state.validateName && this.state.validatePassword && this.state.validateUsername){
                                                                
            const user = {
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }

            fetch('http://10.0.2.2:4000/users/signUp', {
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
                    AsyncStorage.setItem('user', res.user);
                    this.props.navigation.navigate('MainUser');
                }
                else{
                    alert('Cannot have accounts with same username or email. Please enter a different email or username.');
                }

            }))
            .done();
        }
        else{
            alert('Please fix errors above!')
        }
    }
}


