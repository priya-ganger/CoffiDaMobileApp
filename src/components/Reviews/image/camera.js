import React, { Component } from 'react'
import { Alert, View, TouchableOpacity, Text, ToastAndroid } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { commonStyles } from '../../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../../../locales'
import { getSessionToken } from '../../../utils/asyncStorage'

class Camera extends Component {
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
      const { locId } = this.props.route.params

      if (this.props.route.params) {
        this.setState({ location_id: this.props.route.params.locId })
      }

      const { revId } = this.props.route.params
      if (this.props.route.params) {
        this.setState({ review_id: this.props.route.params.revId })

        console.log('Location id: ' + locId, +'Review id' + revId)
      }
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

takeAPhoto = async () => {
  if (this.camera) {
    const options = { quality: 0.5, base64: true }
    const data = await this.camera.takePictureAsync(options)

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': await getSessionToken()
        },
        body: data
      })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Image added!')
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 404) {
          Alert.alert('Not Found. Try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        }
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }
}

deleteAPhoto = async () => {
  if (this.camera) {
    const options = { quality: 0.5, base64: true }
    const data = await this.camera.takePictureAsync(options)

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo',
      {
        method: 'delete',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': await getSessionToken()
        },
        body: data
      })
      .then((response) => {
        if (response.status === 200) {
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
  }
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
  return (
    <View style={commonStyles.container}>

      <RNCamera
        ref={ref => {
          this.camera = ref
        }}
        style={{
          flex: 1,
          width: '100%'

        }}
        captureAudio={false}
      />

      <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.takeAPhoto()}>
        <Text style={commonStyles.buttonText}>{t('capture')} </Text>
        <Ionicons name='camera' size={25} color='white' />
      </TouchableOpacity>

      <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => this.props.navigation.navigate('Photo', { locId: this.state.location_id, revId: this.state.review_id })}>
        <Text style={commonStyles.buttonText}>{t('view_photo')} </Text>
        <Ionicons name='image' size={25} color='white' />
      </TouchableOpacity>

      <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => { this.deleteAPhoto() }}>
        <Text style={commonStyles.buttonText}>{t('delete_photo')} </Text>
        <Ionicons name='trash' size={25} color='white' />
      </TouchableOpacity>

    </View>
  )
}
}

export default Camera
