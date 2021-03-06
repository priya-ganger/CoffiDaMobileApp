import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid, TextInput, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'

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

      render () {
        return (
          <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Welcome to CoffiDa</Text>

            <Text style={commonStyles.subheadingText}>Enter your email address: </Text>
            <TextInput
              style={commonStyles.input}
              placeholder='Email address'
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />

            <Text style={commonStyles.subheadingText}>Enter your password: </Text>
            <TextInput
              style={commonStyles.input}
              placeholder='Password'
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
            />

            <TouchableOpacity style={commonStyles.button} onPress={() => this.login()}>
              <Text style={commonStyles.buttonText}>Login
              </Text>
              <Ionicons name='log-in' size={25} color='white' />
            </TouchableOpacity>

            <TouchableOpacity style={commonStyles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={commonStyles.buttonText}>Register
              </Text>
              <Ionicons name='person-add' size={25} color='white' />
            </TouchableOpacity>

          </View>
        )
      }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         //backgroundColor: 'lightblue',
//         justifyContent: 'center',
//         alignItems: 'center'
//       },

//       welcome: {
//         //flex: 2,
//         textAlign: 'center',
//         fontSize: 20,
//         margin: 10,
//        // backgroundColor: 'lightblue',
//         fontWeight: '700'
//       },
//       input: {
//        // flex: 1,
//         margin: 10,
//         height: 40,
//         padding: 5,
//         fontSize: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#D6EADF',
//         backgroundColor: '#eac4d5',
//         borderRadius: 25
//       },

//       enterButton: {
//         justifyContent: 'center',
//         flexDirection: 'row',
//         backgroundColor: '#809BCE',
//         alignItems: 'center',
//         marginLeft: 15,
//         marginRight: 15,
//         padding: 10,
//         borderRadius: 20

//       },

//       enterButtonText: {
//         fontSize: 20,
//         color: '#B8E0D2',
//         fontWeight: '700'
//       },

//       signUpButton: {
//         justifyContent: 'center',
//         flexDirection: 'row',
//         backgroundColor: 'white',
//         alignItems: 'center',
//         marginLeft: 15,
//         marginRight: 15,
//         padding: 10,
//         borderRadius: 20,
//         margin: 10

//       },

//       signUpButtonText: {
//         fontSize: 20,
//         color: 'black',
//         fontWeight: '700'
//       }

// });
export default Login
