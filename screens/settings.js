import React, { Component } from 'react';
import {  TextInput, FlatList, SafeAreaView, View, TouchableOpacity, Text, Alert, Button, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

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
     isLoading: true,
     locationData: [],
      location_id: '',
      longitude: '',
      latitude: ''
    }
  }

  findCoordinates = () => {
    if(!this.state.locationPermission){
      this.state.locationPermission = requestLocationPermission();
    }

    this.setState({
      location: {
        longitude: -2.2511616,
        latitude: 53.510144
      },
      isLoading: false
    })
  }

  getLocationData = async () => {
    const value = await AsyncStorage.getItem('session_token')
    console.log('Trying to get data')
    return fetch('http://10.0.2.2:3333/api/1.0.0/find', {
      headers: {
        'X-Authorization': value
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          this.props.navigation.navigate('Login')
          throw 'Unauthorised'
        } else {
          throw 'something went wrong'
        }
      })
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          locationData: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //      // const location = JSON.stringify(position);

  //       const location = position;
  //       console.log("Location1", location.coords);

  //       this.setState({ location: {
  //         longitude: location.coords.longitude,
  //         latitude: location.coords.latitude
  //       }});
  //     this.setState({isLoading: false});
  //   },
  //     (error) => {
  //       Alert.alert(error.message)
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //       maximumAge: 10000 
  //     }
  //   );
  // };

  componentDidMount(){
    this.findCoordinates();
    this.getLocationData();
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
       style={{flex: 0.5}}
        region={{
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
          latitudeDelta: 1.000,
          longitudeDelta: 1.000
        }}
        >
          <Marker
          coordinate={this.state.location}
          title="My location"
          description="Hi, here I am"
          />
        </MapView>
        {/* <Text>Hello</Text> */}
        <View>
        <FlatList
            data={this.state.locationData}
            renderItem={({ item }) => (
              <View>
                <Text>Name: {item.location_name}</Text>
                <Text> latitude:  {item.latitude}</Text>
                <Text> longitude: {item.longitude}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          /> 
          </View>
         </View>
      );

     /* <Button
    //   title='Get my coordinates'
    //   onPress={() => {this.findCoordinates()}}
    // /> 
    // <Text>Location: {this.state.location}</Text> */

}
}
}
  
export default Settings
