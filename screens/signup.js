import React, { Component } from 'react'
import { Text, View, Button, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
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
            throw 'Failed validation'
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
      return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}> Enter your details to sign up</Text>
            
          <Text style={commonStyles.subheadingText}>What is your first name?</Text>
          <TextInput
          style={commonStyles.input}
            placeholder='Enter your first name.'
            onChangeText={(firstName) => this.setState({ firstName })}
            value={this.state.firstName}
          />

          <Text style={commonStyles.subheadingText}>What is your last name?</Text>
          <TextInput
          style={commonStyles.input}
            placeholder='Enter your last name.'
            onChangeText={(lastName) => this.setState({ lastName })}
            value={this.state.lastName}
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

      <TouchableOpacity style={commonStyles.button} onPress={() => this.signUp()}>
      <Text style={commonStyles.buttonText}>Sign Up </Text>
      <Ionicons name='add' size={25} color='white' />
      </TouchableOpacity>


        </View>
      )
    }
}
export default SignUp
