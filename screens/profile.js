import React, { Component } from "react";
import { View, StyleSheet, Text, ActivityIndicator, FlatList, ToastAndroid, Alert, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../components/user";

class Profile extends Component {

  constructor(props)
  {
      super(props);

      this.state = {
          isLoading: true,
          userData: [],

          first_name: '',
          last_name: '',
          email: '',
          password: '',
  };
}

updateUserInfo(){
  let sendData = {};

  if(this.state.userData.first_name != ''){
    sendData['first_name'] = this.state.first_name;

  }

  if(this.state.userData.last_name != ''){
    sendData['last_name'] = this.state.last_name;

  }

  if(this.state.userData.email != ''){
    sendData['email'] = this.state.email;

  }

  if(this.state.password != ''){
    sendData['password'] = this.state.password;

  }

 console.log(sendData);
    

  const token = AsyncStorage.getItem('session_token');
  const userId = AsyncStorage.getItem('user_id');
  console.log("Trying to get user data")
  return fetch('http://10.0.2.2:3333/api/1.0.0/user/'+userId, {
    method: 'patch',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token

    },
    body: JSON.stringify(sendData)

})
.then((response) => {
  if(response.status === 200){
    Alert.alert("User info updated" + token + userId);
    return response.json()
  }
  else if(response.status === 401){
    Alert.alert("Id: " + userId + " Token: " + token);
    throw 'Unauthorised'
  }
  else{
    Alert.alert("Id: " + userId + " Token: " + token);
    console.log(response.json());
    throw 'something went wrong';
  }
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
      <Text>Your Details</Text>
      <Text> </Text>
      <User/>
      <Text> </Text>


      <Text>First Name:</Text>
            <TextInput
                placeholder={'Enter your first name'}
                onChangeText={(first_name)=>this.setState({first_name})}
                value={this.state.first_name}
             />
            
            <Text>Second Name:</Text>
             <TextInput
                placeholder="Enter your last name"
                onChangeText={(last_name)=>this.setState({last_name})}
                value={this.state.last_name}
               
              />
            
            <Text>Email:</Text>
            <TextInput 
                placeholder="Email"
                onChangeText={(email)=>this.setState({email})}
                value={this.state.email}
             /> 

            <Text>Password:</Text>
              <TextInput 
                placeholder="Password"
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}
             /> 

                <Button 
                title="Update info"
                onPress={() => this.updateUserInfo()}
                ></Button> 

                <Button title="Log out"
                onPress={() => navigation.navigate('Login')} /> 

                {/* AsyncStorage.clear(),  */}
      </View>
     )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Profile;