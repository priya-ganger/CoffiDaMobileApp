import React, { Component } from 'react'
import { Alert, Text, View, Button, ToastAndroid, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
      review_id: ''
    }
  }

  componentDidMount () {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {

    const { location_id } = this.props.route.params
    const { locData } = this.props.route.params
    console.log('This is the params data' + location_id)

    if (this.props.route.params) {
      this.setState({ location_id: this.props.route.params.location_id })
    }

    console.log('This is the params data' + locData.review_id)

    if (this.props.route.params) {
      this.setState({ review_id: this.props.route.params.locData.review_id })
    }
  }

  UNSAFE_componentWillMount () {
    // this._unsubscribe
  }

addReview = async () => {
  const to_add_review = {
    overall_rating: parseInt(this.state.overall_rating),
    price_rating: parseInt(this.state.price_rating),
    quality_rating: parseInt(this.state.quality_rating),
    clenliness_rating: parseInt(this.state.clenliness_rating),
    review_body: this.state.review_body
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
      console.log('Review created', responseJson)
      ToastAndroid.show('Review created', ToastAndroid.SHORT)
    })
    .catch((error) => {
      console.log(error)
      ToastAndroid.show(error, ToastAndroid.SHORT)
    })
}

render () {
  const navigation = this.props.navigation

  return (
    <View style={{ flex: 1 }}>
      <Text>Add Review {this.state.review_id}</Text>
      <Text>location id {this.state.location_id}</Text>
      <Button
        title='Go back'
        onPress={() => navigation.goBack()}
      />

      <TextInput
        placeholder='Enter your overall_rating'
        onChangeText={(overall_rating) => this.setState({ overall_rating })}
        value={this.state.overall_rating}
      />

      <TextInput
        placeholder='Enter your price_rating'
        onChangeText={(price_rating) => this.setState({ price_rating })}
        value={this.state.price_rating}
      />

      <TextInput
        placeholder='Enter your quality_rating'
        onChangeText={(quality_rating) => this.setState({ quality_rating })}
        value={this.state.quality_rating}
      />

      <TextInput
        placeholder='Enter your clenliness_rating'
        onChangeText={(clenliness_rating) => this.setState({ clenliness_rating })}
        value={this.state.clenliness_rating}
      />

      <TextInput
        placeholder='Enter your review_body'
        onChangeText={(review_body) => this.setState({ review_body })}
        value={this.state.review_body}
      />

      <Button
        title='Add a review'
        onPress={() => this.addReview()}
      />

      <Button
        title='Add photo to review'
        onPress={() => this.props.navigation.navigate('Camera', { locId: this.state.location_id, revId: this.state.review_id })}
      />

    </View>
  )
}
}

export default AddReview
