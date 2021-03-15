import React, { Component } from 'react'
import { View, Alert, PermissionsAndroid, ToastAndroid } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import { t, getLanguage } from '../locales'
import { getSessionToken } from '../utils/asyncStorage'
import { Spinner } from 'native-base'

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
      return true
    } else {
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

        console.log('Distance: ' + distance)
      }
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
    return fetch('http://10.0.2.2:3333/api/1.0.0/find', {
      headers: {
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        } else {
          Alert.alert('something went wrong')
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          locationData: responseJson
        })
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <Spinner color='green' />
        </View>
      )
    } else {
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
            coordinate={{ latitude: Number(this.state.location.latitude), longitude: Number(this.state.location.longitude) }}
            title={t('my_location')}
            pinColor='#474744'
          />
        </MapView>
      )
    }
  }
}

export default Map
