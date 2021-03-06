import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, ActivityIndicator, FlatList, ToastAndroid, Alert, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'
import Stars from 'react-native-stars'

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
});
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
  const item = this.state.userData
  if (this.state.isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <SafeAreaView style={commonStyles.container}>
        <Text style={commonStyles.title}>Your Reviews</Text>
        <FlatList
          data={this.state.userData.reviews}
          renderItem={({ item }) => (
            <View>
              <Text style={commonStyles.subheadingText}> Cafe Name: {item.location.location_name}</Text>
              <Text style={commonStyles.subheadingText}> Review: {item.review.review_body}</Text>
              <Text style={commonStyles.subheadingText}> Price Rating: {item.review.overall_rating}</Text>
              <Stars
                display= {item.review.overall_rating}
                half={true}
                spacing={4}
                starSize={100}
                count={5}
                fullStar={<Ionicons name={'star'} size={15} style={[commonStyles.starRating]}/>}
                emptyStar={<Ionicons name={'star-outline'} size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]}/>}
                halfStar={<Ionicons name={'star-half'} size={15} style={[commonStyles.starRating]}/>}
                />

                <Text style={commonStyles.subheadingText}> Price Rating: {item.review.price_rating}</Text>
                <Stars
                display= {item.review.price_rating}
                half={true}
                spacing={4}
                starSize={100}
                count={5}
                fullStar={<Ionicons name={'star'} size={15} style={[commonStyles.starRating]}/>}
                emptyStar={<Ionicons name={'star-outline'} size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]}/>}
                halfStar={<Ionicons name={'star-half'} size={15} style={[commonStyles.starRating]}/>}
                />

                <Text style={commonStyles.subheadingText}> Quality Rating: {item.review.quality_rating}</Text>
                <Stars
                display= {item.review.quality_rating}
                half={true}
                spacing={4}
                starSize={100}
                count={5}
                fullStar={<Ionicons name={'star'} size={15} style={[commonStyles.starRating]}/>}
                emptyStar={<Ionicons name={'star-outline'} size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]}/>}
                halfStar={<Ionicons name={'star-half'} size={15} style={[commonStyles.starRating]}/>}
                />

                <Text style={commonStyles.subheadingText}> Cleanliness Rating: {item.review.clenliness_rating}</Text>
                <Stars
                display= {item.review.clenliness_rating}
                half={true}
                spacing={4}
                starSize={100}
                count={5}
                fullStar={<Ionicons name={'star'} size={15} style={[commonStyles.starRating]}/>}
                emptyStar={<Ionicons name={'star-outline'} size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]}/>}
                halfStar={<Ionicons name={'star-half'} size={15} style={[commonStyles.starRating]}/>}
                />
              <Text> </Text>

        <TouchableOpacity style={commonStyles.button} onPress={() => this.props.navigation.navigate('Camera', { locId: item.location.location_id, revId: item.review.review_id })}>
        <Text style={commonStyles.buttonText}> Add photo? </Text>
        <Ionicons name='camera' size={25} color='white' />
        </TouchableOpacity> 

            </View>
          )}
          keyExtractor={(item, index) => item.review.review_id.toString()}
        />

        <Text style={commonStyles.title}>Your liked Reviews</Text>
              <FlatList
                data={this.state.userData.liked_reviews}
                renderItem={({ item }) => (
                  <View>
                    <Text style={commonStyles.subheadingText}>Location Name: {item.location.location_name}</Text>
                    <Text style={commonStyles.subheadingText}>Review {item.review.review_body}</Text>
                    {/* <Text>Overall rating: {item.review.overall_rating}  </Text>
                    <Text>Price Rating: {item.review.price_rating} </Text>
                    <Text>Quality Rating: {item.review.quality_rating} </Text>
                    <Text>Cleanliness Rating: {item.review.clenliness_rating} </Text> */}
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
