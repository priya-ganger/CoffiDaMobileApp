import React, { Component } from 'react'
import { View, SafeAreaView, TouchableOpacity, Text, ActivityIndicator, FlatList, ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Stars from 'react-native-stars'
import { t, getLanguage } from '../locales'

class YourReviews extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userData: [],
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      this.getUserData()
      getLanguage()
    })
  }

  UNSAFE_componentWillMount () {
    this._unsubscribe
  }

getUserData = async () => {
  const token = await AsyncStorage.getItem('session_token')
  const userId = await AsyncStorage.getItem('user_id')
  console.log('Trying to get user data')
  return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userId, {
    headers: {
      'X-Authorization': token
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 401) {
        throw 'Unauthorised'
      } else {
        Alert.alert('Id: ' + userId + ' Token: ' + token)
        console.log(response.json())
        throw 'something went wrong'
      }
    })
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({
        isLoading: false,
        userData: responseJson
      })
    })
    .catch((error) => {
      console.log(error)
      ToastAndroid.show(error, ToastAndroid.SHORT)
    })
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
      <SafeAreaView style={commonStyles.container}>
        <Text style={commonStyles.title}>{t("your_reviews")}</Text>
        <FlatList
          data={this.state.userData.reviews}
          renderItem={({ item }) => (
            <View>
              <Text style={commonStyles.subheadingText}> {t("name_of_cafe")} {item.location.location_name}</Text>
              <Text style={commonStyles.subheadingText}> {t("review_body")} {item.review.review_body}</Text>
              <Text style={commonStyles.subheadingText}> {t("review_overall_rating")} {item.review.overall_rating}</Text>
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

              <Text style={commonStyles.subheadingText}> {t("review_price_rating")} {item.review.price_rating}</Text>
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

              <Text style={commonStyles.subheadingText}> {t("review_quality_rating")} {item.review.quality_rating}</Text>
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

              <Text style={commonStyles.subheadingText}> {t("review_cleanliness_rating")} {item.review.clenliness_rating}</Text>
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

              <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.props.navigation.navigate('Camera', { locId: item.location.location_id, revId: item.review.review_id })}>
                <Text style={commonStyles.buttonText}> {t("add_photo")} </Text>
                <Ionicons name='camera' size={25} color='white' />
              </TouchableOpacity>

            </View>
          )}
          keyExtractor={(item, index) => item.review.review_id.toString()}
        />

        <Text style={commonStyles.title}>{t("your_liked_reviews")}</Text>
        <FlatList
          data={this.state.userData.liked_reviews}
          renderItem={({ item }) => (
            <View>
              <Text style={commonStyles.subheadingText}>{t("name_of_cafe")} {item.location.location_name}</Text>
              <Text style={commonStyles.subheadingText}>{t("review")} {item.review.review_body}</Text>
              <Text> </Text>
            </View>
          )}
          keyExtractor={(item, index) => item.review.review_id.toString()}
        />

      </SafeAreaView>
    )
  }
}
}

export default YourReviews
