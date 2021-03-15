import React, { Component } from 'react'
import { View, Image, ToastAndroid, Alert } from 'react-native'
import { commonStyles } from '../../../styles/common'
import { Text, Button } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../../../locales'
import { getSessionToken } from '../../../utils/asyncStorage'

class Photo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location_id: '',
      review_id: ''
    }
  }

  componentDidMount () {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      getLanguage()
      this.getAPhoto()
      const { locId } = this.props.route.params

      if (this.props.route.params) {
        this.setState({ location_id: this.props.route.params.locId })
      }

      const { revId } = this.props.route.params
      if (this.props.route.params) {
        this.setState({ review_id: this.props.route.params.revId })
      }
      console.log('Location Id: ' + locId + 'Review Id ' + revId)
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

  deleteAPhoto = async () => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo',
      {
        method: 'delete',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': await getSessionToken()
        }
      })
      .then((response) => {
        if (response.status === 200) {
          this.getAPhoto()
          Alert.alert('Image has been deleted!')
        } else if (response.status === 403) {
          Alert.alert('Forbidden. Try again later.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 404) {
          Alert.alert('Not Found, try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        }
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  //  }
  }

  getAPhoto = async () => {
    if (this.camera) {
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo',
        {
          headers: {
            'Content-Type': 'image/jpeg',
            'X-Authorization': await getSessionToken()
          }
        })
        .then((response) => {
          if (response.status === 200) {
            Alert.alert('Success')
          } else if (response.status === 404) {
            Alert.alert('Not Found, try again.')
          } else if (response.status === 500) {
            Alert.alert('Server Error. Try again.')
          }
        })
        .catch((error) => {
          ToastAndroid.show(error, ToastAndroid.SHORT)
        })
    }
  }

  render () {
    const photoUri = 'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo?timestamp=' + Date.now()
    return (
      <View style={commonStyles.container}>

        <Image
          accessibilityLabel='Image taken by user for cafe review'
          source={{ uri: photoUri }}
          style={{ width: 500, height: 500 }}
        />

        <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.deleteAPhoto()}>
          <Ionicons name='trash' size={25} color='white' />
          <Text style={commonStyles.buttonText}>{t('delete_photo')} </Text>
        </Button>

      </View>
    )
  }
}

export default Photo
