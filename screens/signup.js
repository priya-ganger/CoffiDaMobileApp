import React, { Component } from 'react'
import { Text, View, Button, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Input from './input'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    //  isValid: null
    }
  }

    signUp = () => {
      // need to add some validation. make sure email + pw are valid

      return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)

      })
        .then((response) => {
          if (response.status === 201) {
            return response.json()
          } else if (response.status === 400) {
            throw 'Bad Request'
          } else if (response.status === 500) {
            throw 'Server Error'
          } else {
            throw 'Something went wrong'
          }
        })
        .then((responseJson) => {
          console.log('User created', responseJson)
          ToastAndroid.show('Account created', ToastAndroid.SHORT)
          this.props.navigation.navigate('Login')
        })
        .catch((error) => {
          console.log(error)
          ToastAndroid.show(error, ToastAndroid.SHORT)
        })
    }

    render () {
      const { isValid } = this.state;
      return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}> Enter your details to sign up</Text>
            
          <Text style={commonStyles.subheadingText}>What is your first name?</Text>
          <TextInput
          style={commonStyles.input}
            placeholder='Enter your first name.'
            onChangeText={(first_name) => this.setState({ first_name })}
            value={this.state.first_name}
          />

          <Text style={commonStyles.subheadingText}>What is your last name?</Text>
          <TextInput
          style={commonStyles.input}
            placeholder='Enter your last name.'
            onChangeText={(last_name) => this.setState({ last_name })}
            value={this.state.last_name}
          />

          <Text style={commonStyles.subheadingText}>What is your email address?</Text>
          <TextInput
          style={commonStyles.input}
            placeholder='Enter your email address.'
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />

          <Text style={commonStyles.subheadingText}>Create your password</Text>
          <TextInput
          style={commonStyles.input}
            placeholder='Create a password.'
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            secureTextEntry
          />
          {/* <Input
          style={commonStyles.input}
            placeholder='Create a password.'
            pattern={[
              '^.{8,}$', // min 8 chars
              '(?=.*\\d)', // number required
              '(?=.*[A-Z])', // uppercase letter
            ]}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
           // onValidation={isValid => this.setState({ isValid })}
            secureTextEntry
          /> */}
          
          {/* <Text style={{ color: isValid && isValid[0] ? 'green' : 'red' }}>
            A minimum of 8 characters
          </Text>
          <Text style={{ color: isValid && isValid[1] ? 'green' : 'red' }}>
            A number is required
          </Text>
          <Text style={{ color: isValid && isValid[2] ? 'green' : 'red' }}>
            An uppercase letter is required
          </Text>
       */}

      <TouchableOpacity style={commonStyles.button} onPress={() => this.signUp()}>
      <Text style={commonStyles.buttonText}>Sign Up </Text>
      <Ionicons name='add' size={25} color='white' />
      </TouchableOpacity>


        </View>
      )
    }
}
export default SignUp
