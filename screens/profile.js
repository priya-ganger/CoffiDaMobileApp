import React, { Component } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, FlatList, ToastAndroid, Alert, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userData: [],

      // userId: AsyncStorage.getItem('user_id'),
      //  token: AsyncStorage.getItem('session_token'),

      first_name: '',
      last_name: '',
      email: '',
      password: ''
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

updateUserInfo = async () => {
  const sendData = {}

  if (this.state.first_name !== '') {
    sendData.first_name = this.state.first_name
  }

  if (this.state.last_name !== '') {
    sendData.last_name = this.state.last_name
  }

  if (this.state.email !== '') {
    sendData.email = this.state.email
  }

  if (this.state.password !== '') {
    sendData.password = this.state.password
  }

  console.log(sendData)

  const userId = await AsyncStorage.getItem('user_id')
  const token = await AsyncStorage.getItem('session_token')
  console.log('Trying to get user data')
  fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userId, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token

    },
    body: JSON.stringify(sendData)
  })
    .then((response) => {
      if (response.status === 200) {
        // Alert.alert("User info updated" + token + userId);
        this.getUserData()
        Alert.alert('Details updated')
        return response.JSON
      } else if (response.status === 401) {
        console.log('Checking token ' + token)
        Alert.alert('Id: ' + userId + ' Token: ' + token)
        this.props.navigation.navigate('Login')
        throw 'Unauthorised'
      } else if (response.status === 400) {
        console.log('Checking token ' + token)
        Alert.alert('Id: ' + userId + ' Token: ' + token)
        throw 'Bad request'
      } else if (response.status === 403) {
        console.log('Checking token ' + token)
        Alert.alert('Id: ' + userId + ' Token: ' + token)
        throw 'Forbidden'
      } else if (response.status === 404) {
        console.log('Checking token ' + token)
        Alert.alert('Id: ' + userId + ' Token: ' + token)
        throw 'Not Found'
      } else if (response.status === 400) {
        console.log('Checking token ' + token)
        Alert.alert('Id: ' + userId + ' Token: ' + token)
        throw 'Server Error'
      } else {
        Alert.alert('Id: ' + userId + ' Token: ' + token)
        console.log(response.json())
        throw 'something went wrong'
      }
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
      <View>
        <Text>Your Details</Text>
        {/* <Text>User ID: {item.user_id}</Text> */}
        <Text> First Name:  {item.first_name}</Text>
        <Text> Last Name: {item.last_name}</Text>
        <Text> Email Address: {item.email}</Text>
        {/* <Text> Password: </Text> */}

        <Text />

        <Text> Update your details here </Text>
        <Text>First Name:</Text>
        <TextInput
          placeholder='Enter your first name'
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.state.first_name}
        />

        <Text>Second Name:</Text>
        <TextInput
          placeholder='Enter your last name'
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.state.last_name}
        />

        <Text>Email:</Text>
        <TextInput
          placeholder='Email'
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />

        <Text>Password:</Text>
        <TextInput
          placeholder='Password'
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />

        <Button
          title='Update info'
          onPress={() => this.updateUserInfo()}
        />

        {/* <Button title="Log out"
                onPress={() => navigation.navigate('LogOut')} />  */}

        <Text>Your Reviews</Text>
        <FlatList
          data={this.state.userData.reviews}
          renderItem={({ item }) => (
            <View>
              <Text>Location Name: {item.location.location_name}</Text>
              <Text>Review {item.review.review_body}</Text>
              <Text>Overall rating: {item.review.overall_rating}  </Text>
              <Text>Price Rating: {item.review.price_rating} </Text>
              <Text>Quality Rating: {item.review.quality_rating} </Text>
              <Text>Cleanliness Rating: {item.review.clenliness_rating} </Text>
              <Text> </Text>
              <Button
                title='Add photo to review'
                onPress={() => this.props.navigation.navigate('Camera', { locId: item.location.location_id, revId: item.review.review_id })}
              />
            </View>
          )}
          keyExtractor={(item, index) => item.review.review_id.toString()}
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

export default Profile
