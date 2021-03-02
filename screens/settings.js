import React, { Component } from 'react'
import {  TextInput, SafeAreaView, View, TouchableOpacity, Text, Alert, Button, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { TapGestureHandler } from 'react-native-gesture-handler'


async function requestLocationPermission() {
  try{
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Lab04 Location Permission',
        message: 'This app requires access to your location',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if(granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access the location');
      return true;
    }
    else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err){
    console.warn(err);
  }
}

class Settings extends Component {

  constructor (props) {
    super(props)

    this.state = {
     location: null,
     locationPermission: false
    }
  }

  componentDidMount(){
    this.findCoordinates();
  }

  findCoordinates = () => {
    if(!this.state.locationPermission){
      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);

        this.setState({ location })
      },
      (error) => {
        Alert.alert(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000
      }
    );
  };

  render() {
  return (
    <View>
    {/* <Text>This is the Settings screen</Text>
    <Button
      title='Go back'
      onPress={() => navigation.goBack()}
    /> */}

    <Button
      title='Get my coordinates'
      onPress={() => {this.findCoordinates()}}
    /> 
    <Text>Location: {this.state.location}</Text>
  </View>
  )}
}
  
export default Settings
