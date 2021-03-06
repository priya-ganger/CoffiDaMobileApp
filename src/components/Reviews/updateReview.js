import React, { Component } from 'react'
import { Alert, View, ToastAndroid } from 'react-native'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../../locales'
import Filter from 'bad-words'
import { getSessionToken } from '../../utils/asyncStorage'
import { Container, Content, H1, Item, Input, Text, Button, Spinner, Icon, Textarea } from 'native-base'

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
      const { locationId, reviewId, locationName } = this.props.route.params

      if (this.props.route.params) {
        this.setState({ location_id: this.props.route.params.locationId })
        this.setState({ review_id: this.props.route.params.reviewId })
        this.setState({ location_name: this.props.route.params.locationName })
      }
      console.log('Location Id: ' + locationId + 'Review Id : ' + reviewId, 'LocationName: ' + locationName)
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

updateReview = async () => {
  // if(this.state.overallRating === '' && this.state.priceRating === '' && this.state.qualityRating === '' && this.state.clenlinessRating === '' && this.state.clenlinessRating === ''){
  //   Alert.alert('One field is required to update this review.')
  // } else {
  const filter = new Filter()
  filter.addWords('cake', 'pastries', 'tea', 'pastry', 'teas', 'cupcake', 'cheesecake', 'fruitcake',
    'cakes', 'pastry', 'teas', 'cupcakes', 'cheesecakes', 'fruitcakes')

  const sendReviewData = {}

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
    sendReviewData.review_body = filter.clean(this.state.reviewBody)
  }

  console.log(sendReviewData)
  fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': await getSessionToken()
    },
    body: JSON.stringify(sendReviewData)

  })
    .then((response) => {
      if (response.status === 200) {
        Alert.alert('Your review has been updated!')
        return response.JSON
      } else if (response.status === 400) {
        console.log(sendReviewData)
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
    .catch((error) => {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    })
  // }
}

render () {
  if (this.state.isLoading) {
    return (
      <View>
        <Spinner color='green' />
      </View>
    )
  } else {
    return (
      <Container>

        <H1 style={commonStyles.h1}>{t('update_your_review_for')} {this.state.location_name}</H1>
        <Content>
          <Item>
            <Icon active name='star-outline' />
            <Input
              placeholder={t('update_review_overall_rating')}
              onChangeText={(overallRating) => this.setState({ overallRating })}
              value={this.state.overallRating}
              ariaLabel={t('update_review_overall_rating')}
            />
          </Item>

          <Item>
            <Icon active name='cash-outline' />
            <Input
              placeholder={t('update_review_price_rating')}
              onChangeText={(priceRating) => this.setState({ priceRating })}
              value={this.state.priceRating}
              ariaLabel={t('update_review_price_rating')}
            />
          </Item>

          <Item>
            <Icon active name='checkbox-outline' />
            <Input
              placeholder={t('update_review_quality_rating')}
              onChangeText={(qualityRating) => this.setState({ qualityRating })}
              value={this.state.qualityRating}
              ariaLabel={t('update_review_quality_rating')}
            />
          </Item>

          <Item>
            <Icon active name='water-outline' />
            <Input
              placeholder={t('update_review_cleanliness_rating')}
              onChangeText={(clenlinessRating) => this.setState({ clenlinessRating })}
              value={this.state.clenlinessRating}
              ariaLabel={t('update_review_cleanliness_rating')}
            />
          </Item>

          <Textarea
            rowSpan={3} bordered
            placeholder={t('update_review')}
            onChangeText={(reviewBody) => this.setState({ reviewBody })}
            value={this.state.reviewBody}
            ariaLabel={t('update_review')}
          />

          <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.updateReview()}>
            <Ionicons name='create' size={25} color='white' />
            <Text style={commonStyles.buttonText}> {t('update_btn')} </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
}

export default UpdateReview
