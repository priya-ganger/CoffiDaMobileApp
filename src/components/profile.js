import React, { Component } from 'react'
import { View, SafeAreaView, TouchableOpacity, Text, ActivityIndicator, ToastAndroid, Alert, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'
import { t, getLanguage } from '../locales'
import { getUserIdAndSessionToken } from '../utils/asyncStorage'

class Profile extends Component {
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
    this.getUserData()
    getLanguage()
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
      } else if (response.status === 401) {
        throw 'Not Found'
      } else if (response.status === 500) {
        throw 'Server Error'
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
      } else if (response.status === 500) {
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
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>{t("current_details")}</Text>
        {/* <Text>User ID: {item.user_id}</Text> */}
        <Text style={commonStyles.subheadingText}>  {t("first_name")}  {item.first_name}</Text>
        <Text style={commonStyles.subheadingText}>  {t("second_name")} {item.last_name}</Text>
        <Text style={commonStyles.subheadingText}>  {t("email_address")} {item.email}</Text>
        {/* <Text> Password: </Text> */}

        <Text />

        <Text style={commonStyles.title}> {t("update_details")}</Text>
        <Text style={commonStyles.subheadingText}>{t("first_name")}</Text>
        <TextInput
          style={commonStyles.input}
          placeholder={t("first_name")}
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.state.first_name}
          ariaLabel={t("first_name")}
        />

        <Text style={commonStyles.subheadingText}>{t("second_name")}</Text>
        <TextInput
          style={commonStyles.input}
          placeholder={t("second_name")}
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.state.last_name}
          ariaLabel={t("second_name")}
        />

        <Text style={commonStyles.subheadingText}>{t("email_address")}</Text>
        <TextInput
          style={commonStyles.input}
          placeholder={t("email_address")}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          ariaLabel={t("email_address")}
        />

        <Text style={commonStyles.subheadingText}>{t("password")}</Text>
        <TextInput
          style={commonStyles.input}
          placeholder={t("password")}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
          ariaLabel={t("password")}
        />

        <TouchableOpacity
         ariaRole='button' style={commonStyles.button} onPress={() => this.updateUserInfo()}
        >
          <Text style={commonStyles.buttonText}>{t("update")} </Text>
          <Ionicons name='create' size={25} color='white' />
        </TouchableOpacity>

      </View>
    )
  }
}
}

export default Profile