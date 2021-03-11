import React, { Component } from 'react'
import { View, Text, Alert, PermissionsAndroid, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import { t, getLanguage } from '../locales'

async function requestLocationPermission () {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: ' Location Permission',
        message: 'This app requires access to your location',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access the location')
      return true
    } else {
      console.log('Location permission denied')
      return false
    }
  } catch (err) {
    console.warn(err)
  }
}

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: {
        longitude: '',
        latitude: ''
      },
      locationPermission: false,
      isLoading: true,
      locationData: [],
      location_id: '',
      longitude: '',
      latitude: '',
      dis: ''

    }
  }

  componentDidMount () {
    this.props.navigation.addListener('focus', () => {
      console.log('focused')
      this.setState({ isLoading: true })
      this.findCoordinates()
      this.getLocationData()
      getLanguage()

      const { distance } = this.props.route.params

      if (this.props.route.params) {
        this.setState({ dis: this.props.route.params.distance })
      }
      console.log(Number(distance))
    })
  }

  findCoordinates = () => {
    if (!this.state.locationPermission) {
      this.setState({ locationPermission: requestLocationPermission() })
    }
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('getCurrentPosition()')

        this.setState({
          location: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }
        })

        console.log('Set the location')
        console.log('location.longitude: ' + this.state.location.longitude + ' location.latitude:' + this.state.location.latitude)
        this.setState({ isLoading: false })
      },
      (error) => {
        Alert.alert(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )
  };

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
          Alert.alert('Unauthorised')
        } else {
          Alert.alert('something went wrong')
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

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else {
      console.log('location 2: ', this.state.location.latitude)
      console.log('location 2: ', this.state.location.longitude)
      return (

        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1, height: 500, width: 500 }}
          region={{
            latitude: Number(this.state.location.latitude),
            longitude: Number(this.state.location.longitude),
            latitudeDelta: 0.8,
            longitudeDelta: 0.8
          }}
        >
          {this.state.locationData.map(location => <Marker
            key={location.location_id}
            coordinate={{ latitude: Number(location.latitude), longitude: Number(location.longitude) }}
            title={location.location_name}
            description={t('distance_from_you') + this.state.dis.toString() + 'M'}
                                                   />)}
          <Marker
            coordinate={this.state.location}
            title={t('my_location')}
           // description='Your current location'
            pinColor='#474744'
          />
        </MapView>
      )
    }
  }
}

export default Map
