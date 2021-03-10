import React, { Component } from 'react'
import { Alert, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'

class Photo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location_id: '',
      review_id: ''
    }
  }

  componentDidMount () {
  // this._unsubscribe = this.props.navigation.addListener('focus', () => {

    const { locId } = this.props.route.params
    console.log('This is the params data' + locId)

    if (this.props.route.params) {
      this.setState({ location_id: this.props.route.params.locId })
    }

    const { revId } = this.props.route.params
    console.log('This is the params data' + revId)
    if (this.props.route.params) {
      this.setState({ review_id: this.props.route.params.revId })
    }
  }

getAPhoto = async () => {
  if (this.camera) {
    const options = { quality: 0.5, base64: true }
    const data = await this.camera.takePictureAsync(options)

    console.log(data.uri)
    const value = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo',
      {
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': value
        }
      })
      .then((response) => {
        if (response.status === 200) {
          response = this.photo.setState

          Alert.alert('Success')
        } else if (response.status === 404) {
          Alert.alert('Not found')
        } else if (response.status === 500) {
          Alert.alert('Server Error')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

render () {
  const photoUri = 'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo?timestamp=' + Date.now()
  Alert.alert(photoUri)

  return (
    <View style={commonStyles.container}>

      <Image
        accessibilityLabel='Image taken by user for cafe review'
        source={{ uri: photoUri }}
        style={{ width: 500, height: 700 }}
      />

    </View>
  )
}
}

export default Photo
