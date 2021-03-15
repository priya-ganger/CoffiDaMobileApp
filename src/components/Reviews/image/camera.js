import React, { Component } from 'react'
import { Alert, View, ToastAndroid } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { commonStyles } from '../../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../../../locales'
import { getSessionToken } from '../../../utils/asyncStorage'
import { Text, Button } from 'native-base'

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

      <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.takeAPhoto()}>
        <Ionicons name='camera' size={25} color='white' />
        <Text style={commonStyles.buttonText}>{t('capture')} </Text>
      </Button>

    </View>
  )
}
}

export default Camera
