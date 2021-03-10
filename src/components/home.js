import React, { Component } from 'react'
import { View, Alert, TouchableOpacity, Text, ActivityIndicator, ToastAndroid, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Stars from 'react-native-stars'
import { t, getLanguage } from '../locales'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      locationId: ''
    }
  }

  componentDidMount () {
    this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      this.checkUserIsLoggedIn()
      getLanguage()
      this.getLocationData()
    })
  }

  UNSAFE_componentWillMount () {
    this._unsubscribe
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
          Alert.alert('Unauthorised')
        } else if (response.status === 400) {
          Alert.alert('Bad Request')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised')
        } else if (response.status === 500) {
          Alert.alert('Server Error')
        } else {
          Alert.alert( 'something went wrong')
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

  favouriteLocation = async (locationId) => {
    const token = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/favourite', {
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
          Alert.alert('Bad request')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised')
        } else if (response.status === 404) {
          Alert.alert('Id: ' + locationId + ' Token: ' + token)
          Alert.alert('Not Found')
        } else if (response.status === 500) {
          Alert.alert('Server Error')
        } else {
          Alert.alert('Id: ' + locationId + ' Token: ' + token)
          Alert.alert('Something went wrong')
        }
      })
      .catch((error) => {
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  unfavouriteLocation = async (locationId) => {
    const token = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/favourite', {
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
          Alert.alert('Unauthorised')
        } else if (response.status === 403) {
          Alert.alert('Forbidden')
        } else if (response.status === 404) {
          Alert.alert('Id: ' + locationId + ' Token: ' + token)
          Alert.alert('Not Found')
        } else if (response.status === 500) {
          Alert.alert('Server Error')
        } else {
          Alert.alert('Id: ' + locationId + ' Token: ' + token)
          Alert.alert('Something went wrong')
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
          <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => navigation.navigate('Search')}>
            <Text style={commonStyles.buttonText}>{t('search')}</Text>
            <Ionicons name='search' size={25} color='#042' />
          </TouchableOpacity>
          <FlatList
            data={this.state.locationData}
            renderItem={({ item }) => (

              <View>
                <Text style={commonStyles.subheadingText}> {t('name_of_cafe')}  {item.location_name}</Text>
                <Text style={commonStyles.subheadingText}> {t('cafe_town')} {item.location_town}</Text>
                <Image
                  source={{ uri: item.photo_path }}
                  style={commonStyles.photo}
                  onError={this.errorLoadingImg}
                />
                <Text style={commonStyles.subheadingText}> {t('cafe_avg_overall_rating')} {item.avg_overall_rating}</Text>
                <Stars
                  display={item.avg_overall_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />

                <Text style={commonStyles.subheadingText}> {t('cafe_price_rating')} {item.avg_price_rating}</Text>
                <Stars
                  display={item.avg_price_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />

                <Text style={commonStyles.subheadingText}> {t('cafe_quality_rating')} {item.avg_quality_rating}</Text>
                <Stars
                  display={item.avg_quality_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />

                <Text style={commonStyles.subheadingText}> {t('cafe_cleanliness_rating')} {item.avg_clenliness_rating}</Text>
                <Stars
                  display={item.avg_clenliness_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />

                <TouchableOpacity
                  ariaRole='button' style={commonStyles.button} onPress={() => this.props.navigation.navigate('GetReviews', { locData: item })}
                >
                  <Text style={commonStyles.buttonText}>{t('view_reviews_button')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  ariaRole='button' style={commonStyles.button} onPress={() => this.favouriteLocation(item.location_id)}
                >
                  <Text style={commonStyles.buttonText}>{t('favourite')} </Text>
                  <Ionicons name='heart' size={25} color='tomato' />
                </TouchableOpacity>

                <TouchableOpacity
                  ariaRole='button' style={commonStyles.button} onPress={() => this.unfavouriteLocation(item.location_id)}
                >
                  <Text style={commonStyles.buttonText}>{t('unfavourite')} </Text>
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
