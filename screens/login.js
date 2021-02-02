import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

class Login extends Component{

    constructor (props) {
        super(props);
        this.state = {email:'', password:''}
      
      }

    render(){
        
        const navigation = this.props.navigation;

        return(
            <View>
              <Text>This is the Login screen</Text>
                  
                  
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

                <TouchableOpacity style={styles.enterButton} onPress={this.login}>
                <Text style={styles.enterButtonText}
                
                >Login</Text>
                
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
      }
  
  });
export default Login;