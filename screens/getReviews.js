import React, { Component } from 'react'
import { View, Alert, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ToastAndroid, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
    // this._unsubscribe = 
    this.props.navigation.addListener('focus', () => {
    const { locData } = this.props.route.params
    console.log('This is the params data' + locData.location_id)
    if (this.props.route.params) {
      this.setState({ location_id: this.props.route.params.locData.location_id })
    }
    this.getLocationData()
  })
}

  UNSAFE_componentWillMount () {
    // this._unsubscribe
  }

  getLocationData = async () => {
    const value = await AsyncStorage.getItem('session_token')
    console.log('Trying to get data')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id, {
      headers: {
        'X-Authorization': value
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 404) {
          Alert.alert('locationid: ' + this.state.location_id)
          throw 'Not Found'
        } else if (response.status === 401) {
          throw 'Unauthorised'
        } else {
          throw 'Server Error'
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
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  likeReview = async (location_id, review_id) => {
    const token = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })

      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Review liked! Id: ' + location_id + 'Review ID' + review_id + ' Token: ' + token)
          this.getLocationData()
        } else if (response.status === 400) {
          throw 'Bad Request'
        } else if (response.status === 401) {
          throw 'Unauthorised'
        } else if (response.status === 403) {
          throw 'Forbidden'
        } else if (response.status === 404) {
          throw 'Not Found'
        } else if (response.status === 500) {
          throw 'Server Error'
        } else {
          throw 'Something went wrong'
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  unlikeReview = async (location_id, review_id) => {
    const token = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })

      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Review unliked! Id: ' + location_id + 'Review ID' + review_id + ' Token: ' + token)
          this.getLocationData()
        } else if (response.status === 400) {
          throw 'Bad Request'
        } else if (response.status === 401) {
          throw 'Unauthorised'
        } else if (response.status === 403) {
          throw 'Forbidden'
        } else if (response.status === 404) {
          throw 'Not Found'
        } else if (response.status === 500) {
          throw 'Server Error'
        } else {
          throw 'Something went wrong'
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  deleteReview = async (location_id, review_id) => {
    const token = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(this.state)

    })

      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Review Deleted! Id: ' + location_id + ' Token: ' + token + 'Review ID' + review_id)

          // need to refresh data
          this.getLocationData()
        } else if (response.status === 400) {
          throw 'Bad Request'
        } else if (response.status === 401) {
          throw 'Unauthorised'
        } else if (response.status === 403) {
          throw 'Forbidden'
        } else if (response.status === 404) {
          Alert.alert('TEST: ' + location_id + ' Token: ' + token + 'Review ID' + review_id)
          throw 'Not Found'
        } else if (response.status === 500) {
          throw 'Server Error'
        } else {
          throw 'Something went wrong'
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson)
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
        <View style={commonStyles.container}>
          <Text style={commonStyles.title}>Reviews</Text>
          {/* <Text>Dataa is {locData}</Text> */}
          <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({ item }) => (
              <View>
                <Text style={commonStyles.subheadingText}> Location Name: {this.state.locationData.location_name}</Text>
                {/* <Text> Review ID: {item.review_id}</Text> */}
                <Text style={commonStyles.subheadingText}> Overall rating: {item.overall_rating}  </Text>
                <Text style={commonStyles.subheadingText}> Price Rating: {item.price_rating} </Text>
                <Text style={commonStyles.subheadingText}> Quality Rating: {item.quality_rating} </Text>
                <Text style={commonStyles.subheadingText}> Cleanliness Rating: {item.clenliness_rating} </Text>
                <Text style={commonStyles.subheadingText}> Review: {item.review_body}</Text>
                <Text style={commonStyles.subheadingText}> Likes: {item.likes} </Text>

                <TouchableOpacity
                  style={commonStyles.button}
                  onPress={() => this.likeReview(this.state.locationData.location_id, item.review_id)}
                >
                  <Text style={commonStyles.buttonText}> Like </Text>
                  <Ionicons name='thumbs-up' size={25} color='white' />
                </TouchableOpacity>

                <TouchableOpacity
                  style={commonStyles.button}
                  onPress={() => this.unlikeReview(this.state.locationData.location_id, item.review_id)}
                >
                  <Text style={commonStyles.buttonText}> Unlike </Text>
                  <Ionicons name='thumbs-down' size={25} color='white' />
                </TouchableOpacity>

                <TouchableOpacity
                  style={commonStyles.button}
                  onPress={() => this.deleteReview(this.state.locationData.location_id, item.review_id)}
                >
                  <Text style={commonStyles.buttonText}> Delete </Text>
                  <Ionicons name='trash' size={25} color='white' />
                </TouchableOpacity>

                <TouchableOpacity
                  style={commonStyles.button}
                  onPress={() => this.props.navigation.navigate('AddReview', { locData: item, location_id: this.state.locationData.location_id, location_Name: this.state.locationData.location_name})}
                >
                  <Text style={commonStyles.buttonText}> Add Review </Text>
                  <Ionicons name='add-circle' size={25} color='white' />
                </TouchableOpacity>

                {/* TODO: Add button needs to be outside the flatlist */}

                <TouchableOpacity
                  style={commonStyles.button}
                  onPress={() => this.props.navigation.navigate('UpdateReview', { locData: item, location_id: this.state.locationData.location_id, location_Name: this.state.locationData.location_name })}
                >
                  <Text style={commonStyles.buttonText}> Update Review </Text>
                  <Ionicons name='create' size={25} color='white' />
                </TouchableOpacity>

              </View>
            )}
            keyExtractor={(item) => item.review_id.toString()}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
})

export default GetReviews
