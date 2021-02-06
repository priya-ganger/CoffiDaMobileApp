
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, TextInput } from 'react-native';

class SignUp extends Component{

    constructor(props){
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        }
    }

    signUp = () => {
        //need to add some validation. make sure email + pw are valid

        return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)

        })
        .then((response) => {
            if(response.status === 201){
               return response.json()
            }
            else if(response.status === 400){
                throw 'Failed validation';
            }
            else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
            console.log("User created", responseJson);
            ToastAndroid.show("Account created", ToastAndroid.SHORT);
            this.props.navigation.navigate("Login");

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
              <Text>This is the SignUp screnn</Text>
                  
                  
            <TextInput
                placeholder="Enter your first name"
                onChangeText={(first_name)=>this.setState({first_name})}
                value={this.state.first_name}
             />

             <TextInput
                placeholder="Enter your last name"
                onChangeText={(last_name)=>this.setState({last_name})}
                value={this.state.last_name}
               
              />
            
            <TextInput 
                placeholder="Email"
                onChangeText={(email)=>this.setState({email})}
                value={this.state.email}
             />

             <TextInput 
                placeholder="Password"
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}
             />

                <Button 
                title="Create an account"
                onPress={() => this.signUp()}
                ></Button>
            </View>
        )
    }
}
export default SignUp;