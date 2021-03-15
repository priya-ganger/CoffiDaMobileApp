import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Text, H1, H2, Icon } from 'native-base';
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Stars from 'react-native-stars'
import { t, getLanguage } from '../locales'
import { getSessionToken, getUserId } from '../utils/asyncStorage'

export default class About extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userData: []
    }
  }

  componentDidMount () {
    this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      this.setState({ isLoading: true })
      this.getUserData()
      getLanguage()
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

  getUserData = async () => {
    console.log('Trying to get user data')
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
          Alert.alert('something went wrong')
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
    return (
      <Container>
       <H1 style={commonStyles.h1}>CoffiDa</H1>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                CoffiDa is platform for reviewing the best local coffee spots. Anybody can use CoffiDa for finding the best local Café’s. You can publish reviews. Reviews consist of a series of ratings (e.g. quality, price, cleanliness) along with a short body of text for describing their experience. You can also comment on, and <Icon active name='ios-thumbs-up-outline' /> other reviews.
                </Text>
              </Body>
            </CardItem>
          </Card>

          
        </Content>
      </Container>
    )
  }
}


