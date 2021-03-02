import React, { Component } from 'react'
import {  TextInput, SafeAreaView, View, TouchableOpacity, Text, Alert, Button, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

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
     locationPermission: false,
     isLoading: true
    }
  }

  findCoordinates = () => {
    if(!this.state.locationPermission){
      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (position) => {
       // const location = JSON.stringify(position);

        const location = position;
        console.log("Location1", location.coords);

        this.setState({ location: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
        }});
      this.setState({isLoading: false});
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

  componentDidMount(){
    this.findCoordinates();
  }



  render() {
    if(this.state.isLoading){
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }else{
      console.log("location 2: ", this.state.location);
      return (
        <View style={{flex:1}}>
        {/* <Text>This is the Settings screen</Text>
        <Button
          title='Go back'
          onPress={() => navigation.goBack()}
        /> */}
    
        <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex:1}}
        region={{
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002
        }}
        >
          <Marker
          coordinate={this.state.location}
          title="My location"
          description="Hi, here I am"
          />
        </MapView>
        </View>
      );
 

    // {/* <Button
    //   title='Get my coordinates'
    //   onPress={() => {this.findCoordinates()}}
    // /> 
    // <Text>Location: {this.state.location}</Text> */}

}
}
}
  
export default Settings
