import React, { Component } from 'react'
import { ToastAndroid, Alert } from 'react-native'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import InputValidation from '../../utils/input'
import { t, getLanguage } from '../../locales'
import { Container, H1, Form, Item, Input, Text, Button, Icon, Content } from 'native-base'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isValid: null,
      isValidEmail: null
    }
  }

  componentDidMount () {
    this.props.navigation.addListener('focus', () => {
      getLanguage()
    })
  }

    signUp = () => {
      if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '') {
        Alert.alert('Complete all fields.')
      }
      const loginData = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }
      return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)

      })
        .then((response) => {
          if (response.status === 201) {
            // this.firstName_textInput.clear()
            // this.lastName_textInput.clear()
            Alert.alert('Account created!')
            this.props.navigation.navigate('Login')
            return response.json()
          } else if (response.status === 400) {
            Alert.alert('Bad Request. Try again.')
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
      const { isValid } = this.state
      const { isValidEmail } = this.state
      return (
        <Container>
          <H1 style={commonStyles.h1}>{t('enter_your_details')}</H1>
          <Content>
            <Form>

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
                <InputValidation
                  placeholder={t('email_address_placeholder')}
                  pattern={[
                    '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$' // must be in this ordercharacters@characters.domain
                  ]}
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                  ariaLabel={t('email_address')}
                  onValidation={isValidEmail => this.setState({ isValidEmail })}
                />
              </Item>
              <Text style={{ color: isValidEmail && isValidEmail[0] ? 'green' : 'tomato', margin: 10 }}>
                {t('email_example')}
              </Text>

              <Item>
                <Icon active name='key' />
                <InputValidation
                  placeholder={t('password')}
                  pattern={[
                    '^.{8,}$', // min 8 chars
                    '(?=.*\\d)', // number required
                    '(?=.*[A-Z])' // uppercase letter
                  ]}
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                  ariaLabel={t('password')}
                  onValidation={isValid => this.setState({ isValid })}
                  secureTextEntry
                />
              </Item>
              <Text style={{ color: isValid && isValid[0] ? 'green' : 'tomato', margin: 10 }}>
                {t('password_char_hint')}
              </Text>
              <Text style={{ color: isValid && isValid[1] ? 'green' : 'tomato', margin: 10 }}>
                {t('password_num_hint')}
              </Text>
              <Text style={{ color: isValid && isValid[2] ? 'green' : 'tomato', margin: 10 }}>
                {t('password_case_hint')}
              </Text>
            </Form>

            <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.signUp()}>
              <Ionicons name='add' size={25} color='white' />
              <Text style={commonStyles.buttonText}>{t('sign_up')}</Text>
            </Button>
          </Content>
        </Container>
      )
    }
}
export default SignUp
