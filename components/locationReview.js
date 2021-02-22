import React, { Component } from 'react'
import { Text, View } from 'react-native'

class LocationReview extends Component {
  // this component returns a list of location reviews
  constructor (props) {
    super(props)
  }

  render () {
    // const locationReview = this.props.data;

    return (
      <View>
        <Text>Review ID: </Text>
        <Text>Overall Rating: </Text>
        <Text>Price Rating: </Text>
        <Text>Quality Rating: </Text>
        <Text>Cleanliness Rating: </Text>
        <Text>Review: </Text>
        <Text>Likes: </Text>
        <Text>     </Text>
      </View>
    )
  }
}
export default LocationReview
