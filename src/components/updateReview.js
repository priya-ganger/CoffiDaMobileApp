import React, { Component } from 'react'
import { Alert, Text, View, ToastAndroid, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'

class UpdateReview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // isLoading: true,
      locData: [],
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: '',

      location_id: '',
      review_id: '',
      locationName: ''
    }
  }

  componentDidMount () {
    // this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      const { location_id, locData, location_Name } = this.props.route.params

      if (this.props.route.params) {
        this.setState({ location_id: this.props.route.params.location_id })
      }

      if (this.props.route.params) {
        this.setState({ locData: this.props.route.params.locData })
      }

      if (this.props.route.params) {
        this.setState({ review_id: this.props.route.params.locData.review_id })

        if (this.props.route.params) {
          this.setState({ locationName: this.props.route.params.location_Name })
        }

        console.log('location id' + location_id)

        console.log('location name' + location_Name)

        console.log('review id' + locData.review_id)
      }
    })
  }

  UNSAFE_componentWillMount () {
    // this._unsubscribe
  }

updateReview = async () => {
  const sendReviewData = {}

  if (this.state.overall_rating !== '') {
    sendReviewData.overall_rating = Number(this.state.overall_rating)
  }

  if (this.state.price_rating !== '') {
    sendReviewData.price_rating = Number(this.state.price_rating)
  }

  if (this.state.quality_rating !== '') {
    sendReviewData.quality_rating = Number(this.state.quality_rating)
  }

  if (this.state.clenliness_rating !== '') {
    sendReviewData.clenliness_rating = Number(this.state.clenliness_rating)
  }

  if (this.state.review_body !== '') {
    sendReviewData.review_body = this.state.review_body
  }

  console.log(sendReviewData)

  const value = await AsyncStorage.getItem('session_token')
  return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': value
    },
    body: JSON.stringify(sendReviewData)
  })

    .then((response) => {
      if (response.status === 200) {
        Alert.alert('Review info updated' + 'locationID: ' + this.state.location_id + 'reviewID: ' + this.state.review_id)
        return response.JSON
      } else if (response.status === 400) {
        Alert.alert('Testing' + 'locationID: ' + this.state.location_id + 'reviewID: ' + this.state.review_id + 'token' + value)
        throw 'Bad Request'
      } else if (response.status === 401) {
        throw 'Unauthorised'
      } else if (response.status === 403) {
        throw 'Forbidden'
      } else if (response.status === 404) {
        throw 'Not Found'
      } else if (response.status === 500) {
        throw 'Server Error'
      } else {
        throw 'Something went wrong'
      }
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
      <View>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <View style={commonStyles.container}>

        <Text style={commonStyles.title}>Update your review for: {this.state.locationName}</Text>

        <TextInput
          style={commonStyles.input}
          placeholder='Enter your overall rating (Optional)'
          onChangeText={(overall_rating) => this.setState({ overall_rating })}
          value={this.state.overall_rating}
          ariaLabel='Enter your overall rating (Optional)'
        />

        <TextInput
          style={commonStyles.input}
          placeholder='Enter your price rating (Optional)'
          onChangeText={(price_rating) => this.setState({ price_rating })}
          value={this.state.price_rating}
          ariaLabel='Enter your price rating (Optional)'
        />

        <TextInput
          style={commonStyles.input}
          placeholder='Enter your quality rating (Optional)'
          onChangeText={(quality_rating) => this.setState({ quality_rating })}
          value={this.state.quality_rating}
          ariaLabel='Enter your quality rating (Optional)'
        />

        <TextInput
          style={commonStyles.input}
          placeholder='Enter your cleanliness rating (Optional)'
          onChangeText={(clenliness_rating) => this.setState({ clenliness_rating })}
          value={this.state.clenliness_rating}
          ariaLabel='Enter your cleanliness rating (Optional)'
        />

        <TextInput
          style={commonStyles.input}
          placeholder='Enter your review (Optional)'
          onChangeText={(review_body) => this.setState({ review_body })}
          value={this.state.review_body}
          ariaLabel='Enter your review (Optional)'
        />

        <TouchableOpacity
          ariaRole='button' style={commonStyles.button}
          onPress={() => this.updateReview()}
        >
          <Text style={commonStyles.buttonText}> Update </Text>
          <Ionicons name='create' size={25} color='white' />
        </TouchableOpacity>

      </View>
    )
  }
}
}

export default UpdateReview
