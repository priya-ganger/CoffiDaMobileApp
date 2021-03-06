import React, { Component } from 'react'
import { Alert, View, StyleSheet, Image } from 'react-native'
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
          throw 'Not found'
        } else if (response.status === 500) {
          throw 'Server Error'
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

deleteAPhoto = async () => {
  if (this.camera) {
    const options = { quality: 0.5, base64: true }
    const data = await this.camera.takePictureAsync(options)

    console.log(data.uri)
    const value = await AsyncStorage.getItem('session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo',
      {
        method: 'delete',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': value
        },
        body: data
      })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Picture deleted')
        } else if (response.status === 403) {
          throw 'Forbidden'
        } else if (response.status === 401) {
          throw 'Unauthorised'
        } else if (response.status === 404) {
          throw 'Not Found'
        } else if (response.status === 500) {
          throw 'Server Error'
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
        source={{ uri: photoUri }}
        style={{ width: 500, height: 700 }}
      />

    </View>
  )
}
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  cameraPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }

})

export default Photo
