import React, { Component } from 'react'
import { Alert, Text, View, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Filter from 'bad-words'
import { t, getLanguage } from '../../locales'
import { getSessionToken } from '../../utils/asyncStorage'

class AddReview extends Component {
  constructor (props) {
    super(props)

    this.state = {
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
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      getLanguage()
      const { locationId, locationName } = this.props.route.params

      if (this.props.route.params) {
        this.setState({ location_id: this.props.route.params.locationId })
      }

      if (this.props.route.params) {
        this.setState({ location_name: this.props.route.params.locationName })
      }

      console.log('Location Id: ' + locationId, 'Location Name: ' + locationName)
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

addReview = async () => {
  const filter = new Filter()
  filter.addWords('cake', 'pastries', 'tea', 'pastry', 'teas', 'cupcake', 'cheesecake', 'fruitcake')

  console.log(filter.clean(this.state.reviewBody))
  const toAddReview = {

    overall_rating: parseInt(this.state.overallRating),
    price_rating: parseInt(this.state.priceRating),
    quality_rating: parseInt(this.state.qualityRating),
    clenliness_rating: parseInt(this.state.clenlinessRating),
    review_body: (filter.clean(this.state.reviewBody))
  }
  return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': await getSessionToken()
    },
    body: JSON.stringify(toAddReview)

  })
    .then((response) => {
      if (response.status === 201) {
        this.overallRating_textInput.clear()
        this.priceRating_textInput.clear()
        this.qualityRating_textInput.clear()
        this.clenlinessRating_textInput.clear()
        this.reviewBody_textInput.clear()
        Alert.alert('Your review has been added!')
      } else if (response.status === 400) {
        Alert.alert('Bad Request. Try again.')
      } else if (response.status === 401) {
        Alert.alert('Unauthorised. Please login.')
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
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>{t('your_review_for')} {this.state.location_name}</Text>
      <TextInput
        style={commonStyles.input}
        placeholder={t('review_overall_rating_req')}
        onChangeText={(overallRating) => this.setState({ overallRating })}
        value={this.state.overallRating}
        ariaLabel={t('review_overall_rating_req')}
        ref={input => { this.overallRating_textInput = input }}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t('review_price_rating_req')}
        onChangeText={(priceRating) => this.setState({ priceRating })}
        value={this.state.priceRating}
        ariaLabel={t('review_price_rating_req')}
        ref={input => { this.priceRating_textInput = input }}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t('review_quality_rating_req')}
        onChangeText={(qualityRating) => this.setState({ qualityRating })}
        value={this.state.qualityRating}
        ariaLabel={t('review_quality_rating_req')}
        ref={input => { this.qualityRating_textInput = input }}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t('review_cleanliness_rating_req')}
        onChangeText={(clenlinessRating) => this.setState({ clenlinessRating })}
        value={this.state.clenlinessRating}
        ariaLabel={t('review_cleanliness_rating_req')}
        ref={input2 => { this.clenlinessRating_textInput = input2 }}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t('review_req')}
        onChangeText={(reviewBody) => this.setState({ reviewBody })}
        value={this.state.reviewBody}
        ariaLabel={t('review_req')}
        ref={input => { this.reviewBody_textInput = input }}
      />

      <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.addReview()}>
        <Text style={commonStyles.buttonText}>{t('review_add')} </Text>
        <Ionicons name='add' size={25} color='white' />
      </TouchableOpacity>

      <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.props.navigation.navigate('YourReviews')}>
        <Text style={commonStyles.buttonText}> {t('my_reviews')} </Text>
        <Ionicons name='clipboard' size={25} color='white' />
      </TouchableOpacity>
    </View>
  )
}
}

export default AddReview
