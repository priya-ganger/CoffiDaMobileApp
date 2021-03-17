import React, { Component } from 'react'
import { View, Alert, ToastAndroid, FlatList, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Stars from 'react-native-stars'
import { t, getLanguage } from '../../locales'
import { getSessionToken } from '../../utils/asyncStorage'
import { Container, H1, H2, Text, Col, Button, Grid, Spinner } from 'native-base'

class GetReviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      locationData: [],
      location_id: '',
      location_Name: ''
    }
  }

  componentDidMount () {
    this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      getLanguage()
      const { locData } = this.props.route.params
      if (this.props.route.params) {
        this.setState({ location_id: this.props.route.params.locData.location_id })
      }
      console.log('Location Data ' + locData)
      this.getLocationData()
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

  getLocationData = async () => {
    const value = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id, {
      headers: {
        'X-Authorization': value
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 404) {
          Alert.alert('Not Found.Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 501) {
          Alert.alert('Server Error. Try again.')
        }
      })
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          locationData: responseJson
        })
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  likeReview = async (locationId, reviewId) => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/review/' + reviewId + '/like', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Review liked!')
          this.getLocationData()
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 403) {
          Alert.alert('Forbidden. Try again.')
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

  unlikeReview = async (locationId, reviewId) => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/review/' + reviewId + '/like', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Review unliked!')
          this.getLocationData()
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 403) {
          Alert.alert('Forbidden. Try again.')
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
          <H1 style={commonStyles.h1}>{t('reviews_table')}</H1>

          <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.props.navigation.navigate('AddReview', { locationId: this.state.locationData.location_id, locationName: this.state.locationData.location_name })}>
            <Ionicons name='add-circle' size={25} color='white' />
            <Text style={commonStyles.buttonText}>{t('add_review')}</Text>
          </Button>
          <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({ item }) => (
              <View>
                <H2 style={commonStyles.h2}> {t('name_of_cafe')} {this.state.locationData.location_name}</H2>
                <Grid primary style={commonStyles.grid}>
                  <Col style={specific.ratingCol}>
                    <Text style={commonStyles.headingCentreText}>{t('ratings')}</Text>
                    <Text style={commonStyles.headingText}> {t('review_overall_rating')} {item.overall_rating}</Text>

                    <Stars
                      display={item.overall_rating}
                      half
                      spacing={4}
                      starSize={100}
                      count={5}
                      fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                      emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                      halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                    />

                    <Text style={commonStyles.headingText}> {t('review_price_rating')} {item.price_rating}</Text>
                    <Stars
                      display={item.price_rating}
                      half
                      spacing={4}
                      starSize={100}
                      count={5}
                      fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                      emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                      halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                    />

                    <Text style={commonStyles.headingText}> {t('review_quality_rating')} {item.quality_rating}</Text>
                    <Stars
                      display={item.quality_rating}
                      half
                      spacing={4}
                      starSize={100}
                      count={5}
                      fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                      emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                      halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                    />

                    <Text style={commonStyles.headingText}> {t('review_cleanliness_rating')} {item.clenliness_rating}</Text>
                    <Stars
                      display={item.clenliness_rating}
                      half
                      spacing={4}
                      starSize={100}
                      count={5}
                      fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                      emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                      halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                    />

                    <Text style={commonStyles.headingText}> {t('likes')} {item.likes} </Text>
                  </Col>
                  <Col style={specific.reviewCol}>
                    <Text style={commonStyles.headingCentreDarkText}> {t('review')} </Text>
                    <Text style={commonStyles.headingDarkText}> {item.review_body}</Text>

                  </Col>
                </Grid>

                <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.likeReview(this.state.locationData.location_id, item.review_id)}>
                  <Ionicons name='thumbs-up-outline' size={25} color='white' />
                  <Text style={commonStyles.buttonText}>{t('like')}</Text>
                </Button>

                <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.unlikeReview(this.state.locationData.location_id, item.review_id)}>
                  <Ionicons name='thumbs-down-outline' size={25} color='white' />
                  <Text style={commonStyles.buttonText}>{t('unlike')}</Text>
                </Button>

              </View>
            )}
            keyExtractor={(item) => item.review_id.toString()}
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
export default GetReviews
