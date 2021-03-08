import React, { Component } from 'react'
import { Text, View, Alert, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../locales'

class LogOut extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: ''
    }
  }

  componentDidMount () {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkUserIsLoggedIn();
      getLanguage();
    })
  }

  UNSAFE_componentWillMount () {
    this._unsubscribe
  }

        checkUserIsLoggedIn = async () => {
          const value = AsyncStorage.getItem('session_token')
          if (value !== null) {
            this.setState({ token: value })
          } else {
            this.props.navigation.navigate('Login')
          }
        }

    logUserOut = async () => {
      const token = await AsyncStorage.getItem('session_token')
      await AsyncStorage.removeItem('session_token')

      return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
        method: 'post',
        headers: {
          'X-Authorization': token
        }
      })
        .then((response) => {
          if (response.status === 200) {
            Alert.alert('Goodbye!')
            this.props.navigation.navigate('Login')
          } else if (response.status === 401) {
            Alert.alert('Login First!')
            this.props.navigation.navigate('Login')
          } else if (response.status === 500) {
            throw 'Server Error'
          } else {
            Alert.alert('Token:' + token)
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
      return (
        <View style={commonStyles.container}>
          <Text style={commonStyles.title}>{t("logout")}</Text>

          <TouchableOpacity
            ariaRole='button' style={commonStyles.button} onPress={() => this.logUserOut()}
          >
            <Text style={commonStyles.buttonText}>{t("yes")}</Text>
            <Ionicons name='log-out' size={25} color='white' />
          </TouchableOpacity>

          <TouchableOpacity
            ariaRole='button' style={commonStyles.button} onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style={commonStyles.buttonText}>{t("no")} </Text>
            <Ionicons name='arrow-back' size={25} color='white' />
          </TouchableOpacity>
        </View>
      )
    }
}
export default LogOut
