import React, { Component } from 'react'
import { Alert, Text, View, ToastAndroid, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../../locales'
import Filter from 'bad-words'
import { getSessionToken } from '../../utils/asyncStorage'

class UpdateReview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      locData: [],
      overallRating: '',
      priceRating: '',
      qualityRating: '',
      clenlinessRating: '',
      reviewBody: '',

      location_id: '',
      review_id: '',
      location_name: ''
    }
  }

  componentDidMount () {
    this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      getLanguage()
      const { locationId, locData, locationName } = this.props.route.params

      if (this.props.route.params) {
        this.setState({ location_id: this.props.route.params.locationId })
      }

      if (this.props.route.params) {
        this.setState({ locData: this.props.route.params.locData })
      }

      if (this.props.route.params) {
        this.setState({ review_id: this.props.route.params.locData.review_id })

        if (this.props.route.params) {
          this.setState({ location_name: this.props.route.params.locationName })
        }

        console.log('Location Id: ' + locationId + 'LocData: ' + locData, 'LocationName: ' + locationName)
      }
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

updateReview = async () => {
  const sendReviewData = {}
  const filter = new Filter()
  filter.addWords('cake', 'pastries', 'tea', 'pastry', 'teas', 'cupcake', 'cheesecake', 'fruitcake')

  const filteredReviewBody = filter.clean(this.state.reviewBody)

  if (this.state.overallRating !== '') {
    sendReviewData.overall_rating = Number(this.state.overallRating)
  }

  if (this.state.priceRating !== '') {
    sendReviewData.price_rating = Number(this.state.priceRating)
  }

  if (this.state.qualityRating !== '') {
    sendReviewData.quality_rating = Number(this.state.qualityRating)
  }

  if (this.state.clenlinessRating !== '') {
    sendReviewData.clenliness_rating = Number(this.state.clenlinessRating)
  }

  if (this.state.reviewBody !== '') {
    sendReviewData.review_body = filteredReviewBody
  }

  try {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': await getSessionToken()
      },
      body: JSON.stringify(sendReviewData)
    })
      .then((response) => {
        if (response.status === 200) {
          this.overallRating_textInput.clear()
          this.priceRating_textInput.clear()
          this.qualityRating_textInput.clear()
          this.clenlinessRating_textInput.clear()
          this.reviewBody_textInput.clear()
          Alert.alert('Your review has been updated!')
          return response.JSON
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 403) {
          Alert.alert('Forbidden. You can only update your own reviews.')
        } else if (response.status === 404) {
          Alert.alert('Not Found.Try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error')
        } else {
          Alert.alert('Something went wrong')
        }
      })
  } catch (error) {
    ToastAndroid.show(error, ToastAndroid.SHORT)
  }
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

        <Text style={commonStyles.title}>{t('update_your_review_for')} {this.state.location_name}</Text>

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review_overall_rating')}
          onChangeText={(overallRating) => this.setState({ overallRating })}
          value={this.state.overallRating}
          ariaLabel={t('update_review_overall_rating')}
          ref={input => { this.overallRating_textInput = input }}
        />

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review_price_rating')}
          onChangeText={(priceRating) => this.setState({ priceRating })}
          value={this.state.priceRating}
          ariaLabel={t('update_review_price_rating')}
          ref={input => { this.priceRating_textInput = input }}
        />

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review_quality_rating')}
          onChangeText={(qualityRating) => this.setState({ qualityRating })}
          value={this.state.qualityRating}
          ariaLabel={t('update_review_quality_rating')}
          ref={input => { this.qualityRating_textInput = input }}
        />

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review_cleanliness_rating')}
          onChangeText={(clenlinessRating) => this.setState({ clenlinessRating })}
          value={this.state.clenlinessRating}
          ariaLabel={t('update_review_cleanliness_rating')}
          ref={input2 => { this.clenlinessRating_textInput = input2 }}
        />

        <TextInput
          style={commonStyles.input}
          placeholder={t('update_review')}
          onChangeText={(reviewBody) => this.setState({ reviewBody })}
          value={this.state.reviewBody}
          ariaLabel={t('update_review')}
          ref={input => { this.reviewBody_textInput = input }}
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
