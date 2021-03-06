import React, { Component } from 'react'
import { ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../../locales'
import { Container, H1, Form, Item, Input, Text, Button, Icon, Content } from 'native-base'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '', password: ''
    }
  }

  componentDidMount () {
    this.props.navigation.addListener('focus', () => {
      getLanguage()
    })
  }

      login = async () => {
        if (this.state.email === '' || this.state.password === '') {
          Alert.alert('Enter an email address and password.')
        } else {
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
                Alert.alert('Incorrect email address or password.Try again.')
              } else if (response.status === 500) {
                Alert.alert('Server Error. Try again.')
              } else {
                Alert.alert('Something went wrong')
              }
            })
            .then(async (responseJson) => {
              await AsyncStorage.setItem('session_token', responseJson.token)
              await AsyncStorage.setItem('user_id', JSON.stringify(responseJson.id))
              this.props.navigation.navigate('Home')
            })
            .catch((error) => {
              ToastAndroid.show(error, ToastAndroid.SHORT)
            })
        }
      }

      render () {
        return (
          <Container>

            <H1 style={commonStyles.h1}>{t('welcome_text')}</H1>
            <Content>
              <Form>
                <Item>
                  <Icon active name='mail' />
                  <Input
                    placeholder={t('email_address')}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    ariaLabel={t('email_address')}
                  />
                </Item>

                <Item>
                  <Icon active name='key' />
                  <Input
                    placeholder={t('password')}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    ariaLabel={t('password')}
                    secureTextEntry
                  />
                </Item>
              </Form>

              <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.login()}>
                <Ionicons name='log-in' size={25} color='white' />
                <Text style={commonStyles.buttonText}>{t('login')}</Text>
              </Button>

              <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.props.navigation.navigate('SignUp')}>
                <Ionicons name='person-add' size={25} color='white' />
                <Text style={commonStyles.buttonText}>{t('register')}</Text>
              </Button>
            </Content>
          </Container>
        )
      }
}
export default Login
