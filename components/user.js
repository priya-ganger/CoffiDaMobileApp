import React, { Component } from 'react';
import { Text, View, ActivityIndicator, ToastAndroid, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

class User extends Component{
    // This component returns a user.
    constructor(props)
    {
        super(props);

        this.state = {
            isLoading: true,
            userData: [],
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
          throw 'Unauthorised';
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

    render(){

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
           {/* <Text>User ID: {item.user_id}</Text> */}
           <Text> First Name:  {item.first_name}</Text>
            <Text> Last Name: {item.last_name}</Text>
            <Text> Email Address: {item.email}</Text>
            {/* <Text> Password: </Text> */}
      </View>

            )
        }
     }
}
export default User;