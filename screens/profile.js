import React, { Component } from "react";
import { View, StyleSheet, Text, ActivityIndicator, FlatList, ToastAndroid, Alert, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Location from '../components/location';

class Profile extends Component {

  constructor(props)
  {
      super(props);

      this.state = {
          isLoading: true,
          userData: [],

           currentFirstName: 'h',
           currentLastName: 'g',
           currentEmail: 'h@mmu.ac.uk',
           currentPassword: 'hello12345',

          first_name: '',
          last_name: '',
          email: '',
          password: '',

         
  };
}

componentDidMount(){
  this.getUserData();
}

getUserData = async () => {
  const token = await AsyncStorage.getItem('session_token');
  const userId = await AsyncStorage.getItem('user_id');
  console.log("Trying to get user data")
  return fetch('http://10.0.2.2:3333/api/1.0.0/user/'+userId,{
    'headers': {
      'X-Authorization': token
    }
  })
  .then((response) => {
  if(response.status === 200){
   
      return response.json()

      
  }
  else if(response.status === 401){
    throw 'testing';
  }
  else{

    Alert.alert("Id: " + userId + " Token: " + token);
    console.log(response.json());
    throw 'something went wrong';

  }
})
  .then( (responseJson) => {
   console.log(responseJson);
    this.setState({
      isLoading: false,
      userData: responseJson
    })
  })
  .catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
  });
}

updateUserInfo(){
  let sendData = {};

  if(this.state.first_name != this.state.currentFirstName){
    sendData['first_name'] = this.state.first_name;

  }

  if(this.state.last_name != this.state.currentLastName){
    sendData['last_name'] = this.state.last_name;

  }

  if(this.state.email != this.state.currentEmail){
    sendData['email'] = this.state.email;

  }

  if(this.state.password != this.state.currentPassword){
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
    Alert.alert("User info updated");
})
.catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
})
}

  render() {
        const navigation = this.props.navigation;
        const item = this.state.userData;
       
       
        if(this.state.isLoading){
          return(
          <View>
          <ActivityIndicator/>
          </View>
      );
      }else{
      return (
          <View>
           <Text>User ID: {item.user_id}</Text>
           <Text>User First Name:  {item.first_name}</Text>
            <Text>User Last Name: {item.last_name}</Text>
            <Text>User Email: {item.email}</Text>
            <Text>Password:</Text>

            <TextInput
                placeholder={'Enter your first name'}
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
                title="Update info"
                onPress={() => this.updateUserInfo()}
                ></Button>


      </View>

     )
   }
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