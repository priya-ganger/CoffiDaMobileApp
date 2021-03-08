import React, { Component } from 'react'
import { Text, View, ActivityIndicator, TouchableOpacity, ToastAndroid, Alert, FlatList, Image, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../locales'


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

  UNSAFE_componentWillMount () {
    this._unsubscribe
  }

      getUserData = async () => {
        const token = await AsyncStorage.getItem('session_token')
        const userId = await AsyncStorage.getItem('user_id')
        console.log('Trying to get user data')
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userId, {
          headers: {
            'X-Authorization': token
          }
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json()
            } else if (response.status === 401) {
              throw 'Unauthorised'
            } else {
              Alert.alert('Id: ' + userId + ' Token: ' + token)
              console.log(response.json())
              throw 'something went wrong'
            }
          })
          .then((responseJson) => {
            console.log(responseJson)
            this.setState({
              isLoading: false,
              userData: responseJson
            })
          })
          .catch((error) => {
            console.log(error)
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
                    <Text style={commonStyles.subheadingText}> {t("name_of_cafe")}  {item.location_name}</Text>
                    <Text style={commonStyles.subheadingText}> {t("cafe_town")} {item.location_town}</Text>
                    <Image
                      source={{ uri: item.photo_path }}
                      style={commonStyles.photo}
                      onError={this.errorLoadingImg}
                    />

                    {/* <TouchableOpacity
                    ariaRole='button'
                  style={commonStyles.button}
                  onPress={() => this.props.navigation.navigate('moreInfo', { locationID: item.location_id })}
                >
                  <Text style={commonStyles.buttonText}> More info </Text>
                  <Ionicons name='information-circle' size={25} color='white' />
                </TouchableOpacity> */}
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
