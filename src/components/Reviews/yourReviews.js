import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ToastAndroid, Alert } from 'react-native'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Stars from 'react-native-stars'
import { t, getLanguage } from '../../locales'
import { getSessionToken, getUserId } from '../../utils/asyncStorage'
import { Container, H1, H2, Text, Col, Button, Grid, Spinner } from 'native-base'

class YourReviews extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userData: [],
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      location_id: '',
      review_id: ''
    }
  }

  componentDidMount () {
    this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      this.getUserData()
      getLanguage()
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

getUserData = async () => {
  console.log('Trying to get user data')
  return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + await getUserId(), {
    headers: {
      'X-Authorization': await getSessionToken()
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 401) {
        Alert.alert('Unauthorised. Please login.')
      } else if (response.status === 404) {
        Alert.alert('User not Found. Try again.')
      } else if (response.status === 500) {
        Alert.alert('Server Error. Try again.')
      } else {
        Alert.alert('something went wrong')
      }
    })
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        userData: responseJson
      })
    })
    .catch((error) => {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    })
}

getAPhoto = async () => {
  if (this.camera) {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo',
      {
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': await getSessionToken()
        }
      })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Success')
        } else if (response.status === 404) {
          Alert.alert('Not Found, try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        }
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }
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
        this.getUserData()
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
        <Spinner color='green' />
      </View>
    )
  } else {
    return (
      <Container>
        <H1 style={commonStyles.h1}>{t('your_reviews')}</H1>
        <FlatList
          data={this.state.userData.reviews}
          renderItem={({ item }) => (
            <View>
              <H2 style={commonStyles.h2}> {t('name_of_cafe')} {item.location.location_name}</H2>
              <Grid primary style={commonStyles.grid}>
                <Col style={specific.ratingCol}>

                  <Text style={commonStyles.headingText}> {t('review_overall_rating')} {item.review.overall_rating}</Text>
                  <Stars
                    display={item.review.overall_rating}
                    half
                    spacing={4}
                    starSize={100}
                    count={5}
                    fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                    emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                    halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                  />

                  <Text style={commonStyles.headingText}> {t('review_price_rating')} {item.review.price_rating}</Text>
                  <Stars
                    display={item.review.price_rating}
                    half
                    spacing={4}
                    starSize={100}
                    count={5}
                    fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                    emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                    halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                  />

                  <Text style={commonStyles.headingText}> {t('review_quality_rating')} {item.review.quality_rating}</Text>
                  <Stars
                    display={item.review.quality_rating}
                    half
                    spacing={4}
                    starSize={100}
                    count={5}
                    fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                    emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                    halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                  />

                  <Text style={commonStyles.headingText}> {t('review_cleanliness_rating')} {item.review.clenliness_rating}</Text>
                  <Stars
                    display={item.review.clenliness_rating}
                    half
                    spacing={4}
                    starSize={100}
                    count={5}
                    fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                    emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                    halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                  />
                  <Text> </Text>
                </Col>

                <Col style={specific.reviewCol}>
                  <Text style={commonStyles.headingDarkText}> {t('review_body')} {item.review.review_body}</Text>
                </Col>

              </Grid>

              <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.deleteReview(item.location.location_id, item.review.review_id)}>
                <Ionicons name='trash' size={25} color='white' />
                <Text style={commonStyles.buttonText}> {t('delete')} </Text>
              </Button>

              <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.props.navigation.navigate('UpdateReview', { reviewId: item.review.review_id, locationId: item.location.location_id, locationName: item.location.location_name })}>
                <Ionicons name='create' size={25} color='white' />
                <Text style={commonStyles.buttonText}> {t('update_review_btn')} </Text>
              </Button>

              <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.props.navigation.navigate('Camera', { locId: item.location.location_id, revId: item.review.review_id })}>
                <Ionicons name='camera' size={25} color='white' />
                <Text style={commonStyles.buttonText}> {t('add_photo')} </Text>
              </Button>

              <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.props.navigation.navigate('Photo', { locId: item.location.location_id, revId: item.review.review_id })}>
                <Ionicons name='image' size={25} color='white' />
                <Text style={commonStyles.buttonText}>{t('view_photo')} </Text>
              </Button>

            </View>
          )}
          keyExtractor={(item, index) => item.review.review_id.toString()}
        />

      </Container>
    )
  }
}
}

const specific = StyleSheet.create({
  reviewCol: {
    backgroundColor: '#FFFB7A',
    height: 270
  },

  ratingCol: {
    backgroundColor: '#887149',
    height: 270
  }

})

export default YourReviews
