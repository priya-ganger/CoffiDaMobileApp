import React, { Component } from 'react'
import { Alert, Text, View, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Filter from 'bad-words'
import { t, getLanguage } from '../locales'

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
      const { locationId, locData, locationName } = this.props.route.params

      if (this.props.route.params) {
        this.setState({ location_id: this.props.route.params.locationId })
      }

      if (this.props.route.params) {
        this.setState({ location_name: this.props.route.params.locationName })
      }

      if (this.props.route.params) {
        this.setState({ review_id: this.props.route.params.locData.review_id })
      }

      console.log('location id' + locationId)

      console.log('location name' + locationName)

      console.log('review id' + locData.review_id)
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

  const token = await AsyncStorage.getItem('session_token')
  return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    body: JSON.stringify(toAddReview)

  })
    .then((response) => {
      if (response.status === 201) {
        console.log(filter.clean(this.state.reviewBody))
        Alert.alert('Review Added! Id: ' + this.state.location_id + ' Token: ' + token)
        // need to refresh data
      } else if (response.status === 400) {
        Alert.alert('Id: ' + this.state.location_id + ' Token: ' + token)
        Alert.alert('Bad Request')
      } else if (response.status === 401) {
        Alert.alert('Unauthorised')
      } else if (response.status === 404) {
        Alert.alert('Not Found')
      } else if (response.status === 500) {
        Alert.alert('Server Error')
      } else {
        // throw 'Something went wrong'
      }
    })
    .then((responseJson) => {
      console.log('Review created')
      ToastAndroid.show('Review created', ToastAndroid.SHORT)
    })
    .catch((error) => {
      console.log(error)
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
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t('review_price_rating_req')}
        onChangeText={(priceRating) => this.setState({ priceRating })}
        value={this.state.priceRating}
        ariaLabel={t('review_price_rating_req')}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t('review_quality_rating_req')}
        onChangeText={(qualityRating) => this.setState({ qualityRating })}
        value={this.state.qualityRating}
        ariaLabel={t('review_quality_rating_req')}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t('review_cleanliness_rating_req')}
        onChangeText={(clenlinessRating) => this.setState({ clenlinessRating })}
        value={this.state.clenlinessRating}
        ariaLabel={t('review_cleanliness_rating_req')}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t('review_req')}
        onChangeText={(reviewBody) => this.setState({ reviewBody })}
        value={this.state.reviewBody}
        ariaLabel={t('review_req')}
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
