import React, { Component } from 'react'
import { Alert, View,  ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Filter from 'bad-words'
import { t, getLanguage } from '../../locales'
import { getSessionToken } from '../../utils/asyncStorage'
import { Container, H1, Form, Item, Input, Label, H3, Text, Col, Button,Grid, Spinner, Icon, Textarea } from 'native-base';
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
    <Container>
      <H1 style={commonStyles.h1}>{t('your_review_for')} {this.state.location_name}</H1>
      <Form>

      <Item>
      <Icon active name='star-outline' />
      <Input  placeholder={t('review_overall_rating_req')}
      onChangeText={(overallRating) => this.setState({ overallRating })}
      value={this.state.overallRating}
      ariaLabel={t('review_overall_rating_req')}
      />
    </Item>

    <Item>
      <Icon active name='cash-outline' />
      <Input   placeholder={t('review_price_rating_req')}
     onChangeText={(priceRating) => this.setState({ priceRating })}
     value={this.state.priceRating}
     ariaLabel={t('review_price_rating_req')}
      />
    </Item>

    <Item>
      <Icon active name='checkbox-outline' />
      <Input  placeholder={t('review_quality_rating_req')}
     onChangeText={(qualityRating) => this.setState({ qualityRating })}
     value={this.state.qualityRating}
     ariaLabel={t('review_quality_rating_req')}
      />
    </Item>

    <Item>
      <Icon active name='water-outline' />
      <Input  placeholder={t('review_cleanliness_rating_req')}
      onChangeText={(clenlinessRating) => this.setState({ clenlinessRating })}
      value={this.state.clenlinessRating}
      ariaLabel={t('review_cleanliness_rating_req')}
      />
    </Item>

    
    <Textarea rowSpan={2} bordered 
    placeholder={  t('review_req')} 
    
    onChangeText={(reviewBody) => this.setState({ reviewBody })}
    value={this.state.reviewBody}
    ariaLabel={t('review_req')}
    
    />
  

     
</Form>

          <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.addReview()}>
          <Ionicons name='add' size={25} color='white' />
          <Text style={commonStyles.buttonText}>{t('review_add')} </Text>
          </Button>

          <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.props.navigation.navigate('YourReviews')}>
          <Ionicons name='clipboard' size={25} color='white' />
          <Text style={commonStyles.buttonText}> {t('my_reviews')} </Text>
          </Button>


      </Container>
  )
}
}

export default AddReview
