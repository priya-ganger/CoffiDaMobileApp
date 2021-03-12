import React, { Component } from 'react'
import { View, Alert, Text, TouchableOpacity, ActivityIndicator, ToastAndroid, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Stars from 'react-native-stars'
import { t, getLanguage } from '../../locales'
import { getSessionToken, getUserId } from '../../utils/asyncStorage'


class GetReviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      locationData: [],
      location_id: '',
      location_Name: ''
    }
  }

  componentDidMount () {
     this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      getLanguage()
      const { locData } = this.props.route.params
      console.log('This is the params data' + locData.location_id)
      if (this.props.route.params) {
        this.setState({ location_id: this.props.route.params.locData.location_id })
      }
      this.getLocationData()
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

  getLocationData = async () => {
    const value = await AsyncStorage.getItem('session_token')
    console.log('Trying to get data')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id, {
      headers: {
        'X-Authorization': value
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 404) {
          Alert.alert('Not Found.Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 501) {
          Alert.alert('Server Error. Try again.')
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

  likeReview = async (locationId, reviewId) => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/review/' + reviewId + '/like', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Review liked!' )
          this.getLocationData()
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 403) {
          Alert.alert('Forbidden. Try again.')
        } else if (response.status === 404) {
          Alert.alert('Not Found.Try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        } else {
          Alert.alert('Something went wrong')
        }
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  unlikeReview = async (locationId, reviewId) => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/review/' + reviewId + '/like', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Review unliked!')
          this.getLocationData()
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 403) {
          Alert.alert('Forbidden. Try again.')
        } else if (response.status === 404) {
          Alert.alert('Not Found.Try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error')
        } else {
          Alert.alert('Something went wrong')
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  deleteReview = async (locationId, reviewId) => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/review/' + reviewId, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': await getSessionToken()
      },
      body: JSON.stringify(this.state)
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Your review has been deleted!')
          this.getLocationData()
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 403) {
          Alert.alert('Forbidden. You can only delete your own reviews.')
        } else if (response.status === 404) {
          Alert.alert('Not Found.Try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        } else {
          Alert.alert('Something went wrong')
        }
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={commonStyles.container}>
          <Text style={commonStyles.title}>{t('reviews_table')}</Text>

          <TouchableOpacity
                  ariaRole='button'
                  style={commonStyles.button}
                  onPress={() => this.props.navigation.navigate('AddReview', { locationId: this.state.locationData.location_id, locationName: this.state.locationData.location_name })}
                >
                  <Text style={commonStyles.buttonText}> {t('add_review')} </Text>
                  <Ionicons name='add-circle' size={25} color='white' />
                </TouchableOpacity>

          <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({ item }) => (
              <View>
                <Text style={commonStyles.subheadingText}> {t('name_of_cafe')} {this.state.locationData.location_name}</Text>
                <Text style={commonStyles.subheadingText}> {t('review_overall_rating')} {item.overall_rating}</Text>
                <Stars
                  display={item.overall_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />

                <Text style={commonStyles.subheadingText}> {t('review_price_rating')} {item.price_rating}</Text>
                <Stars
                  display={item.price_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />

                <Text style={commonStyles.subheadingText}> {t('review_quality_rating')} {item.quality_rating}</Text>
                <Stars
                  display={item.quality_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />

                <Text style={commonStyles.subheadingText}> {t('review_cleanliness_rating')} {item.clenliness_rating}</Text>
                <Stars
                  display={item.clenliness_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />

                <Text style={commonStyles.subheadingText}> {t('review')} {item.review_body}</Text>
                <Text style={commonStyles.subheadingText}> {t('likes')} {item.likes} </Text>

                <TouchableOpacity
                  ariaRole='button'
                  style={commonStyles.button}
                  onPress={() => this.likeReview(this.state.locationData.location_id, item.review_id)}
                >
                  <Text style={commonStyles.buttonText}> {t('like')} </Text>
                  <Ionicons name='thumbs-up' size={25} color='white' />
                </TouchableOpacity>

                <TouchableOpacity
                  ariaRole='button'
                  style={commonStyles.button}
                  onPress={() => this.unlikeReview(this.state.locationData.location_id, item.review_id)}
                >
                  <Text style={commonStyles.buttonText}> {t('unlike')} </Text>
                  <Ionicons name='thumbs-down' size={25} color='white' />
                </TouchableOpacity>

                <TouchableOpacity
                  ariaRole='button'
                  style={commonStyles.button}
                  onPress={() => this.deleteReview(this.state.locationData.location_id, item.review_id)}
                >
                  <Text style={commonStyles.buttonText}> {t('delete')} </Text>
                  <Ionicons name='trash' size={25} color='white' />
                </TouchableOpacity>

                <TouchableOpacity
                  ariaRole='button'
                  style={commonStyles.button}
                  onPress={() => this.props.navigation.navigate('UpdateReview', { locData: item, locationId: this.state.locationData.location_id, locationName: this.state.locationData.location_name })}
                >
                  <Text style={commonStyles.buttonText}> {t('update_review_btn')} </Text>
                  <Ionicons name='create' size={25} color='white' />
                </TouchableOpacity>

              </View>
            )}
            keyExtractor={(item) => item.review_id.toString()}
          />
        </View>
      )
    }
  }
}
export default GetReviews
