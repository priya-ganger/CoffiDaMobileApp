import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator, ToastAndroid, Alert, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../../locales'
import { getSessionToken, getUserId } from '../../utils/asyncStorage'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userData: [],
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    this.getUserData()
    getLanguage()
  }

  getUserData = async () => {
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
          Alert.alert('Something went wrong')
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

updateUserInfo = async () => {
  const sendData = {}

  if (this.state.firstName !== '') {
    sendData.first_name = this.state.firstName
  }

  if (this.state.lastName !== '') {
    sendData.last_name = this.state.lastName
  }

  if (this.state.email !== '') {
    sendData.email = this.state.email
  }

  if (this.state.password !== '') {
    sendData.password = this.state.password
  }
  fetch('http://10.0.2.2:3333/api/1.0.0/user/' + await getUserId(), {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': await getSessionToken()

    },
    body: JSON.stringify(sendData)
  })
    .then((response) => {
      if (response.status === 200) {
        this.firstName_textInput.clear()
        this.lastName_textInput.clear()
        this.email_textInput.clear()
        this.password_textInput.clear()
        this.getUserData()
        Alert.alert('Your details have been updated!')
        return response.JSON
      } else if (response.status === 401) {
        this.props.navigation.navigate('Login')
        Alert.alert('Unauthorised. Please login.')
      } else if (response.status === 400) {
        Alert.alert('Bad Request. Try again.')
      } else if (response.status === 403) {
        Alert.alert('Forbidden. Try again.')
      } else if (response.status === 404) {
        Alert.alert('User not Found. Try again.')
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
        <Text style={commonStyles.title}>{t('current_details')}</Text>
        <Text style={commonStyles.subheadingText}>  {t('first_name')}  {item.first_name}</Text>
        <Text style={commonStyles.subheadingText}>  {t('second_name')} {item.last_name}</Text>
        <Text style={commonStyles.subheadingText}>  {t('email_address')} {item.email}</Text>
        <Text />

        <Text style={commonStyles.title}> {t('update_details')}</Text>
        <Text style={commonStyles.subheadingText}>{t('first_name')}</Text>
        <TextInput
          style={commonStyles.input}
          placeholder={t('first_name')}
          onChangeText={(firstName) => this.setState({ firstName })}
          value={this.state.firstName}
          ariaLabel={t('first_name')}
          ref={input => { this.firstName_textInput = input }}
        />

        <Text style={commonStyles.subheadingText}>{t('second_name')}</Text>
        <TextInput
          style={commonStyles.input}
          placeholder={t('second_name')}
          onChangeText={(lastName) => this.setState({ lastName })}
          value={this.state.lastName}
          ariaLabel={t('second_name')}
          ref={input => { this.lastName_textInput = input }}
        />

        <Text style={commonStyles.subheadingText}>{t('email_address')}</Text>
        <TextInput
          style={commonStyles.input}
          placeholder={t('email_address')}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          ariaLabel={t('email_address')}
          ref={input => { this.email_textInput = input }}
        />

        <Text style={commonStyles.subheadingText}>{t('password')}</Text>
        <TextInput
          style={commonStyles.input}
          placeholder={t('password')}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
          ariaLabel={t('password')}
          ref={input => { this.password_textInput = input }}
        />

        <TouchableOpacity
          ariaRole='button' style={commonStyles.button} onPress={() => this.updateUserInfo()}
        >
          <Text style={commonStyles.buttonText}>{t('update')} </Text>
          <Ionicons name='create' size={25} color='white' />
        </TouchableOpacity>

      </View>
    )
  }
}
}

export default Profile
