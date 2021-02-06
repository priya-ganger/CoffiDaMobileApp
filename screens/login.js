import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, TouchableOpacity, StyleSheet, ToastAndroid, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component{

    constructor (props) {
        super(props);

        this.state = {
          email:"", password:""
        }
      
      }

      login = async () => {
        //need to add some validation. make sure email + pw are valid

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
            
        })
        
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }
            else if(response.status === 400){
             
                throw 'Incorrect email or password';
            }
            else{
             
                throw 'Something went wrong';
               
            }
        })
        .then(async (responseJson) => {
            console.log(responseJson);
            await AsyncStorage.setItem('@session_token', responseJson.token);
            this.props.navigation.navigate("Home");

        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    }

    render(){
        
        const navigation = this.props.navigation;

        return(
            <View>
              <Text style={styles.welcome}>Welcome to CoffiDa</Text>

                <TextInput style={styles.input} 
                placeholder="Email"
                onChangeText={(email)=>this.setState({email})}
                value={this.state.email}
                />

                <TextInput style={styles.input} 
                placeholder="Password"
                onChangeText={(password)=>this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}
                />

                 <TouchableOpacity style={styles.enterButton} onPress={() => this.login()}>
                <Text style={styles.enterButtonText}
                >Login</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.signUpButton}  onPress={() => this.props.navigation.navigate("SignUp")}>
                <Text style={styles.signUpButtonText}
                >I don't have an account</Text>
                </TouchableOpacity> 


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
       // alignItems: 'center'
      },
      
      welcome: {
        //flex: 2,
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
        backgroundColor: 'lightblue',
        fontWeight: '700'
      },
      input: {
       // flex: 1,
        margin: 10,
        height: 40,
        padding: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#D6EADF',
        backgroundColor: '#eac4d5'
      },
  
      enterButton: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#809BCE',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        padding: 10
  
      },
  
      enterButtonText: {
        fontSize: 20,
        color: '#B8E0D2',
        fontWeight: '700'
      },

      signUpButton: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        padding: 10
  
      },
  
      signUpButtonText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '700'
      }
  
  });
export default Login;