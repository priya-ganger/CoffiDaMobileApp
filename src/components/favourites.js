import React, { Component } from 'react'
import { Text, View, ActivityIndicator, ToastAndroid, Alert, FlatList, Image, SafeAreaView } from 'react-native'
import { commonStyles } from '../styles/common'
import { t, getLanguage } from '../locales'
import { getSessionToken, getUserId } from '../utils/asyncStorage'

class Favourites extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userData: [],
      locationData: []
    }
  }

  componentDidMount () {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserData()
      getLanguage()
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

  getUserData = async () => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + await getUserId(), {
      headers: {
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 404) {
          Alert.alert('User not Found. Try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        } else {
          Alert.alert('Something went wrong')
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          userData: responseJson
        })
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <SafeAreaView style={commonStyles.container}>
          <FlatList
            data={this.state.userData.favourite_locations}
            renderItem={({ item }) => (
              <View>
                <Text style={commonStyles.subheadingText}> {t('name_of_cafe')}  {item.location_name}</Text>
                <Text style={commonStyles.subheadingText}> {t('cafe_town')} {item.location_town}</Text>
                <Image
                  source={{ uri: item.photo_path }}
                  style={commonStyles.photo}
                />
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
        </SafeAreaView>
      )
    }
  }
}
export default Favourites
