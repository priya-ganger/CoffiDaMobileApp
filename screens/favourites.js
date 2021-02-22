import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import GetFavourites from '../components/getFavourites'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Favourites extends Component {
  render () {

    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Your favourite cafes</Text>
        <GetFavourites />

      </View>
    )
  }
}
export default Favourites
