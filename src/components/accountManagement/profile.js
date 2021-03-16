import React, { Component } from 'react'
import { View, ToastAndroid, Alert } from 'react-native'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../../locales'
import { getSessionToken, getUserId } from '../../utils/asyncStorage'
import { Container, Content, Body, H1, H2, Form, Spinner, Item, Input, Text, Button, Icon, Card, CardItem } from 'native-base'

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
        <Spinner color='green' />
      </View>
    )
  } else {
    return (
      <Container>
        <H1 style={commonStyles.h1}>{t('current_details')}</H1>
        <Content>
          <Card>
            <CardItem style={commonStyles.card}>
              <Body>
                <Text style={commonStyles.headingDarkText}>  {t('first_name')}  {item.first_name}</Text>
                <Text style={commonStyles.headingDarkText}>  {t('second_name')} {item.last_name}</Text>
                <Text style={commonStyles.headingDarkText}>  {t('email_address')} {item.email}</Text>
              </Body>
            </CardItem>
          </Card>

          <Form>
            <H2 style={commonStyles.h2}> {t('update_details')}</H2>
            <Item>
              <Icon active name='person' />
              <Input
                placeholder={t('first_name_placeholder')}
                onChangeText={(firstName) => this.setState({ firstName })}
                value={this.state.firstName}
                ariaLabel={t('first_name')}
              />
            </Item>

            <Item>
              <Icon active name='person' />
              <Input
                placeholder={t('last_name_placeholder')}
                onChangeText={(lastName) => this.setState({ lastName })}
                value={this.state.lastName}
                ariaLabel={t('second_name')}
              />
            </Item>

            <Item>
              <Icon active name='mail' />
              <Input
                placeholder={t('email_address_placeholder')}
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

          <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.updateUserInfo()}>
            <Ionicons name='create' size={25} color='white' />
            <Text style={commonStyles.buttonText}>{t('update')} </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
}

export default Profile
