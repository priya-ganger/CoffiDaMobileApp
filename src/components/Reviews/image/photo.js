import React, { Component } from 'react'
import { Alert, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../../../styles/common'
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
    const { locId } = this.props.route.params

    if (this.props.route.params) {
      this.setState({ location_id: this.props.route.params.locId })
    }

    const { revId } = this.props.route.params
    if (this.props.route.params) {
      this.setState({ review_id: this.props.route.params.revId })
    }
  }

render () {
  const photoUri = 'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id + '/photo?timestamp=' + Date.now()
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