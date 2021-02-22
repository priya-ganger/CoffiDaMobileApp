import React, { Component } from 'react'
import { View, Alert, TouchableOpacity, Text, ActivityIndicator, ToastAndroid, FlatList, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      location_id: ''
    }
  }

  componentDidMount () {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkUserIsLoggedIn()
    this.getLocationData()
    // });
  }

  UNSAFE_componentWillMount () {
    // this._unsubscribe
  }

   checkUserIsLoggedIn = async () => {
     const value = AsyncStorage.getItem('session_token')
     if (value !== null) {
       this.setState({ token: value })
     } else {
       this.props.navigation.navigate('Login')
     }
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

  favouriteLocation = async (location_id) => {
    const token = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Added to favourites')
        } else if (response.status === 400) {
          throw 'Bad request'
        } else if (response.status === 401) {
          throw 'Unauthorised'
        } else if (response.status === 404) {
          console.log("This is the data i'm trying to send 2: " + AddFavouriteData)
          Alert.alert('Id: ' + location_id + ' Token: ' + token)
          throw 'Not Found'
        } else if (response.status === 500) {
          throw 'Server Error'
        } else {
          Alert.alert('Id: ' + location_id + ' Token: ' + token)
          throw 'Something went wrong'
        }
      })
      .catch((error) => {
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  unfavouriteLocation = async (location_id) => {
    const token = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Deleted from favourites')
        } else if (response.status === 401) {
          throw 'Unauthorised'
        } else if (response.status === 404) {
          Alert.alert('Id: ' + location_id + ' Token: ' + token)
          throw 'Not Found'
        } else if (response.status === 500) {
          throw 'Server Error'
        } else {
          Alert.alert('Id: ' + location_id + ' Token: ' + token)
          throw 'Something went wrong'
        }
      })
      .then((responseJson) => {
        ToastAndroid.show('Successfully removed from favourites', ToastAndroid.SHORT)
      })
      .catch((error) => {
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  render () {
    const navigation = this.props.navigation
    if (this.state.isLoading) {
      return (
        <View style={commonStyles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={commonStyles.container}>
          <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Search')}>
            <Text style={commonStyles.buttonText}>Search </Text>
            <Ionicons name='search' size={25} color='#042' />
          </TouchableOpacity>
          <FlatList
            data={this.state.locationData}
            renderItem={({ item }) => (

              <View>
                {/* <Text>Location ID:{item.location_id}</Text>  */}
                <Text style={commonStyles.subheadingText}> Name:  {item.location_name}</Text>
                <Text style={commonStyles.subheadingText}> Town: {item.location_town}</Text>
                {/* {this.state.displayImg ? (
                          */}
                <Image
                  source={{ uri: item.photo_path }}
                          // source={{uri: 'https://tr-images.condecdn.net/image/vOkb7Jmdv2L/crop/1020/f/1kaffeine-london-mar19-pr.jpg'}}
                  style={commonStyles.photo}
                  onError={this.errorLoadingImg}
                />
                {/* //   ) : (
                        //    <View></View>
                        //  )} */}
                <Text style={commonStyles.subheadingText}> Average Overall Rating: {item.avg_overall_rating}</Text>
                <Text style={commonStyles.subheadingText}> Price Rating: {item.avg_price_rating}</Text>
                <Text style={commonStyles.subheadingText}> Quality Rating: {item.avg_quality_rating}</Text>
                <Text style={commonStyles.subheadingText}> Cleanliness Rating: {item.avg_clenliness_rating}</Text>

                <TouchableOpacity
                  style={commonStyles.button} onPress={() => this.props.navigation.navigate('GetReviews', { locData: item })}
                >
                  <Text style={commonStyles.buttonText}>View Reviews</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={commonStyles.button} onPress={() => this.favouriteLocation(item.location_id)}
                >
                  <Text style={commonStyles.buttonText}>Favourite </Text>
                  <Ionicons name='heart' size={25} color='tomato' />
                </TouchableOpacity>

                <TouchableOpacity
                  style={commonStyles.button} onPress={() => this.unfavouriteLocation(item.location_id)}
                >
                  <Text style={commonStyles.buttonText}>Unfavourite </Text>
                  <Ionicons name='heart-outline' size={25} color='tomato' />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
        </View>
      )
    }
  }
}

export default Home
