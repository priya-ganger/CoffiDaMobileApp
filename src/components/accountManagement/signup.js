import React, { Component } from 'react'
import { Text, View, ToastAndroid, TextInput, TouchableOpacity, Alert } from 'react-native'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Input from '../../utils/input'
import { t, getLanguage } from '../../locales'

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
            this.firstName_textInput.clear()
            this.lastName_textInput.clear()
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
        <View style={commonStyles.container}>
          <Text style={commonStyles.title}>{t('enter_your_details')}</Text>

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

          <Input
            style={commonStyles.input}
            placeholder={t('email_address')}
            pattern={[
              '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$' // must be in this ordercharacters@characters.domain
            ]}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            ariaLabel={t('email_address')}
            onValidation={isValidEmail => this.setState({ isValidEmail })}
          />

          <Text style={{ color: isValidEmail && isValidEmail[0] ? 'green' : 'tomato' }}>
            {t('email_example')}
          </Text>

          <Text style={commonStyles.subheadingText}>{t('password')}</Text>
          <Input
            style={commonStyles.input}
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

          <Text style={{ color: isValid && isValid[0] ? 'green' : 'tomato' }}>
            {t('password_char_hint')}
          </Text>
          <Text style={{ color: isValid && isValid[1] ? 'green' : 'tomato' }}>
            {t('password_num_hint')}
          </Text>
          <Text style={{ color: isValid && isValid[2] ? 'green' : 'tomato' }}>
            {t('password_case_hint')}
          </Text>

          <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.signUp()}>
            <Text style={commonStyles.buttonText}>{t('sign_up')} </Text>
            <Ionicons name='add' size={25} color='white' />
          </TouchableOpacity>

        </View>
      )
    }
}
export default SignUp
