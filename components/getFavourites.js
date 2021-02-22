import React, { Component } from 'react'
import { Text, View, ActivityIndicator, TouchableOpacity, ScrollView, ToastAndroid, Alert, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'

class GetFavourites extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userData: [],
      locationData: []
    }
  }

  componentDidMount () {
    this.getUserData()
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
            <ScrollView>
              <FlatList
                data={this.state.userData.favourite_locations}
                renderItem={({ item }) => (
                  <View>
                    {/* <Text>Location ID:{item.location_id}</Text> */}
                    <Text style={commonStyles.subheadingText}> Name:  {item.location_name}</Text>
                    <Text style={commonStyles.subheadingText}> Town: {item.location_town}</Text>
                    <Image
                      source={{ uri: item.photo_path }}
                      style={commonStyles.photo}
                      onError={this.errorLoadingImg}
                    />

                <TouchableOpacity
                  style={commonStyles.button}
                  onPress={() => this.props.navigation.navigate('moreInfo', { locationID: item.location_id })}
                >
                  <Text style={commonStyles.buttonText}> More info </Text>
                  <Ionicons name='information-circle' size={25} color='white' />
                </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => item.location_id.toString()}
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
            </ScrollView>

          )
        }
      }
}
export default GetFavourites
