import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import GetFavourites from '../components/getFavourites'

class Favourites extends Component {
  render () {
    const navigation = this.props.navigation

    return (
      <View>
        <Text>This is a list of your favourite locations</Text>
        <GetFavourites />

        <Button
          title='Go back'
          onPress={() => navigation.goBack()}
        />
      </View>
    )
  }
}
export default Favourites
