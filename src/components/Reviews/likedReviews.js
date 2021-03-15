import React, { Component } from 'react'
import { View, ToastAndroid, Alert, FlatList } from 'react-native'
import { commonStyles } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t, getLanguage } from '../../locales'
import { getSessionToken, getUserId } from '../../utils/asyncStorage'
import { Container, Left, Body, Right, Segment,H1, H2, Form, Spinner, Item, Input, Text, Button, Icon, Card, CardItem, Header} from 'native-base'

class LikedReviews extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userData: [],
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    this.getUserData()
    getLanguage()
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
  const item = this.state.userData
  if (this.state.isLoading) {
    return (
      <View>
        <Spinner color='green' />
      </View>
    )
  } else {
    return (
      <Container>
    <H1 style={commonStyles.h1}>{t('your_liked_reviews')}  </H1>
        <Card>
            <CardItem style={{ backgroundColor: '#635DB7', height: 800 }}>
              <Body>
         
        <FlatList
          data={this.state.userData.liked_reviews}
          renderItem={({ item }) => (
            <View>
              <Text style={commonStyles.headingText} >{t('name_of_cafe')} {item.location.location_name}</Text>
              <CardItem style={{ backgroundColor: '#00CE9F', height: 100 }}>
              <Text style={commonStyles.headingText} >{t('review')} {item.review.review_body}</Text>
              <Text> </Text>
              </CardItem>
            </View>
          )}
          keyExtractor={(item, index) => item.review.review_id.toString()}
        />
        </Body>
            </CardItem>
          </Card>
       
      </Container>
    )
  }
}
}

export default LikedReviews
