import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ToastAndroid, TextInput, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../locales'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '', password: ''
    }
  }

      login = async () => {
        // need to add some validation. make sure email + pw are valid

        return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)

        })

          .then((response) => {
            if (response.status === 200) {
              return response.json()
            } else if (response.status === 400) {
              throw 'Incorrect email address or password'
            } else if (response.status === 500) {
              throw 'Server Error. Please try again later.'
            } else {
              throw 'Something went wrong'
            }
          })
          .then(async (responseJson) => {
            console.log(responseJson)
            await AsyncStorage.setItem('session_token', responseJson.token)
            await AsyncStorage.setItem('user_id', JSON.stringify(responseJson.id))
            this.props.navigation.navigate('Home')

            Alert.alert('Id: ' + responseJson.id + ' Token: ' + responseJson.token)
          })
          .catch((error) => {
            console.log(error)
            ToastAndroid.show(error, ToastAndroid.SHORT)
          })
      }

      componentDidMount() {
        this.props.navigation.addListener('focus', () => {
        getLanguage()
      })
      }

      render () {
        return (
          <View style={commonStyles.container}>
            <Text style={commonStyles.title}>{t("welcome_text")}</Text>

            <Text style={commonStyles.subheadingText}>{t("email_address")} </Text>
            <TextInput
              style={commonStyles.input}
              placeholder={t("email_address")}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              ariaLabel={t("email_address")}
            />

            <Text style={commonStyles.subheadingText}>{t("password")} </Text>
            <TextInput
              style={commonStyles.input}
              placeholder={t("password")}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
              ariaLabel={t("password")}
            />

            <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.login()}>
              <Text style={commonStyles.buttonText}>{t("login")}
              </Text>
              <Ionicons name='log-in' size={25} color='white' />
            </TouchableOpacity>

            <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={commonStyles.buttonText}>{t("register")}
              </Text>
              <Ionicons name='person-add' size={25} color='white' />
            </TouchableOpacity>

          </View>
        )
      }
}
export default Login
