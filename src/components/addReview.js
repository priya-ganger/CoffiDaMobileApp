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
     this._unsubscribe = this.props.navigation.addListener('focus', () => {
      getLanguage()
    const { location_id, locData, location_Name } = this.props.route.params

    if (this.props.route.params) {
      this.setState({ location_id: this.props.route.params.location_id })
    }

    if (this.props.route.params) {
      this.setState({ locationName: this.props.route.params.location_Name })
    }

    if (this.props.route.params) {
      this.setState({ review_id: this.props.route.params.locData.review_id })
    }

    console.log('location id' + location_id)

    console.log('location name' + location_Name)

    console.log('review id' + locData.review_id)
  })
  }

  UNSAFE_componentWillMount () {
     this._unsubscribe
  }

addReview = async () => {
  const filter = new Filter()
  filter.addWords('cake', 'pastries', 'tea', 'pastry', 'teas', 'cupcake', 'cheesecake', 'fruitcake')

  console.log(filter.clean(this.state.review_body))
  const to_add_review = {

    overall_rating: parseInt(this.state.overall_rating),
    price_rating: parseInt(this.state.price_rating),
    quality_rating: parseInt(this.state.quality_rating),
    clenliness_rating: parseInt(this.state.clenliness_rating),
    review_body: (filter.clean(this.state.review_body))
  }

  const token = await AsyncStorage.getItem('session_token')
  return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    body: JSON.stringify(to_add_review)

  })
    .then((response) => {
      if (response.status === 201) {
        console.log(filter.clean(this.state.review_body))
        Alert.alert('Review Added! Id: ' + this.state.location_id + ' Token: ' + token)
        // need to refresh data
      } else if (response.status === 400) {
        Alert.alert('Id: ' + this.state.location_id + ' Token: ' + token)
        throw 'Bad Request'
      } else if (response.status === 401) {
        throw 'Unauthorised'
      } else if (response.status === 404) {
        throw 'Not Found'
      } else if (response.status === 500) {
        throw 'Server Error'
      } else {
        throw 'Something went wrong'
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
      <Text style={commonStyles.title}>{t("your_review_for")} {this.state.locationName}</Text>
      <TextInput
        style={commonStyles.input}
        placeholder={t("review_overall_rating_req")}
        onChangeText={(overall_rating) => this.setState({ overall_rating })}
        value={this.state.overall_rating}
        ariaLabel={t("review_overall_rating_req")}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t("review_price_rating_req")}
        onChangeText={(price_rating) => this.setState({ price_rating })}
        value={this.state.price_rating}
        ariaLabel={t("review_price_rating_req")}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t("review_quality_rating_req")}
        onChangeText={(quality_rating) => this.setState({ quality_rating })}
        value={this.state.quality_rating}
        ariaLabel={t("review_quality_rating_req")}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t("review_cleanliness_rating_req")}
        onChangeText={(clenliness_rating) => this.setState({ clenliness_rating })}
        value={this.state.clenliness_rating}
        ariaLabel={t("review_cleanliness_rating_req")}
      />

      <TextInput
        style={commonStyles.input}
        placeholder={t("review_req")}
        onChangeText={(review_body) => this.setState({ review_body })}
        value={this.state.review_body}
        ariaLabel={t("review_req")}
      />

      <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.addReview()}>
        <Text style={commonStyles.buttonText}>{t("review_add")} </Text>
        <Ionicons name='add' size={25} color='white' />
      </TouchableOpacity>

      <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.props.navigation.navigate('YourReviews')}>
        <Text style={commonStyles.buttonText}> {t("my_reviews")} </Text>
        <Ionicons name='clipboard' size={25} color='white' />
      </TouchableOpacity>
    </View>
  )
}
}

export default AddReview
