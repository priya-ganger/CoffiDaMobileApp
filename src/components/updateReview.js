import React, { Component } from 'react'
import { Alert, Text, View, ToastAndroid, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../locales'

class UpdateReview extends Component {
  constructor (props) {
    super(props)

    this.state = {
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
      getLanguage()
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
  try {
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
          console.log('Review info updated' + 'locationID: ' + this.state.location_id + 'reviewID: ' + this.state.review_id)
          return response.JSON
        } else if (response.status === 400) {
          console.log('Testing' + 'locationID: ' + this.state.location_id + 'reviewID: ' + this.state.review_id + 'token' + value)
          Alert.alert('Bad Request')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised')
        } else if (response.status === 403) {
          Alert.alert('Forbidden')
        } else if (response.status === 404) {
          Alert.alert('Not Found')
        } else if (response.status === 500) {
          Alert.alert('Server Error')
        } else {
          throw 'Something went wrong'
        }
      })
  } catch (error) {
    console.log(error)
    ToastAndroid.show(error, ToastAndroid.SHORT)
  }
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

        <Text style={commonStyles.title}>{t('update_your_review_for')} {this.state.locationName}</Text>

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review_overall_rating')}
          onChangeText={(overall_rating) => this.setState({ overall_rating })}
          value={this.state.overall_rating}
          ariaLabel={t('update_review_overall_rating')}
        />

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review_price_rating')}
          onChangeText={(price_rating) => this.setState({ price_rating })}
          value={this.state.price_rating}
          ariaLabel={t('update_review_price_rating')}
        />

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review_quality_rating')}
          onChangeText={(quality_rating) => this.setState({ quality_rating })}
          value={this.state.quality_rating}
          ariaLabel={t('update_review_quality_rating')}
        />

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review_cleanliness_rating')}
          onChangeText={(clenliness_rating) => this.setState({ clenliness_rating })}
          value={this.state.clenliness_rating}
          ariaLabel={t('update_review_cleanliness_rating')}
        />

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review')}
          onChangeText={(review_body) => this.setState({ review_body })}
          value={this.state.review_body}
          ariaLabel={t('update_review')}
        />

        <TouchableOpacity
          ariaRole='button' style={commonStyles.button}
          onPress={() => this.updateReview()}
        >
          <Text style={commonStyles.buttonText}> {t('update_btn')} </Text>
          <Ionicons name='create' size={25} color='white' />
        </TouchableOpacity>

      </View>
    )
  }
}
}

export default UpdateReview
