import React, { Component } from 'react'
import { View, Alert, TouchableOpacity,  ActivityIndicator, ToastAndroid, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Stars from 'react-native-stars'
import { t, getLanguage } from '../locales'
import { getSessionToken } from '../utils/asyncStorage'
import { Container, Header, Content, H1, H2, H3, Text, Left,Col, Row, Body, Right, Title, Subtitle, Button, Icon,  List, ListItem, Grid } from 'native-base';

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      locationId: ''
    }
  }

  componentDidMount () {
    this._unsubscribe =
    this.props.navigation.addListener('focus', () => {
      this.checkUserIsLoggedIn()
      getLanguage()
      this.getLocationData()
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

   checkUserIsLoggedIn = async () => {
     const value = AsyncStorage.getItem('session_token')
     if (value !== null) {
       this.setState({ token: value })
     } else {
       this.props.navigation.navigate('Login')
     }
   }

  getLocationData = async () => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/find', {
      headers: {
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          this.props.navigation.navigate('Login')
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        } else {
          Alert.alert('Something went wrong')
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          locationData: responseJson
        })
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  favouriteLocation = async (locationId) => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/favourite', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Added to favourites!')
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 404) {
          Alert.alert('Cafe not Found. Try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        } else {
          Alert.alert('Something went wrong')
        }
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  unfavouriteLocation = async (locationId) => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/favourite', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Deleted from favourites')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 403) {
          Alert.alert('Forbidden. Try again later.')
        } else if (response.status === 404) {
          Alert.alert('Cafe not Found, try again.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        } else {
          Alert.alert('Something went wrong')
        }
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

//   render () {
//     const navigation = this.props.navigation
//     if (this.state.isLoading) {
//       return (
//         <View style={commonStyles.container}>
//           <ActivityIndicator />
//         </View>
//       )
//     } else {
//       return (
//         <View style={commonStyles.container}>
//           <TouchableOpacity ariaRole='button' style={commonStyles.button} onPress={() => navigation.navigate('Search')}>
//             <Text style={commonStyles.buttonText}>{t('search')}</Text>
//             <Ionicons name='search' size={25} color='#042' />
//           </TouchableOpacity>
//           <FlatList
//             data={this.state.locationData}
//             renderItem={({ item }) => (

//               <View>
//                 <Text style={commonStyles.subheadingText}> {t('name_of_cafe')}  {item.location_name}</Text>
//                 <Text style={commonStyles.subheadingText}> {t('cafe_town')} {item.location_town}</Text>
//                 <Image
//                   source={{ uri: item.photo_path }}
//                   style={commonStyles.photo}
//                 />
//                 <Text style={commonStyles.subheadingText}> {t('cafe_avg_overall_rating')} {item.avg_overall_rating}</Text>
//                 <Stars
//                   display={item.avg_overall_rating}
//                   half
//                   spacing={4}
//                   starSize={100}
//                   count={5}
//                   fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
//                   emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
//                   halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
//                 />

//                 <Text style={commonStyles.subheadingText}> {t('cafe_price_rating')} {item.avg_price_rating}</Text>
//                 <Stars
//                   display={item.avg_price_rating}
//                   half
//                   spacing={4}
//                   starSize={100}
//                   count={5}
//                   fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
//                   emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
//                   halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
//                 />

//                 <Text style={commonStyles.subheadingText}> {t('cafe_quality_rating')} {item.avg_quality_rating}</Text>
//                 <Stars
//                   display={item.avg_quality_rating}
//                   half
//                   spacing={4}
//                   starSize={100}
//                   count={5}
//                   fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
//                   emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
//                   halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
//                 />

//                 <Text style={commonStyles.subheadingText}> {t('cafe_cleanliness_rating')} {item.avg_clenliness_rating}</Text>
//                 <Stars
//                   display={item.avg_clenliness_rating}
//                   half
//                   spacing={4}
//                   starSize={100}
//                   count={5}
//                   fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
//                   emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
//                   halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
//                 />

//                 <TouchableOpacity
//                   ariaRole='button' style={commonStyles.button} onPress={() => this.props.navigation.navigate('GetReviews', { locData: item })}
//                 >
//                   <Text style={commonStyles.buttonText}>{t('view_reviews_button')}</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   ariaRole='button' style={commonStyles.button} onPress={() => this.favouriteLocation(item.location_id)}
//                 >
//                   <Text style={commonStyles.buttonText}>{t('favourite')} </Text>
//                   <Ionicons name='heart' size={25} color='tomato' />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   ariaRole='button' style={commonStyles.button} onPress={() => this.unfavouriteLocation(item.location_id)}
//                 >
//                   <Text style={commonStyles.buttonText}>{t('unfavourite')} </Text>
//                   <Ionicons name='heart-outline' size={25} color='tomato' />
//                 </TouchableOpacity>
//               </View>
//             )}
//             keyExtractor={(item, index) => item.location_id.toString()}
//           />
//         </View>
//       )
//     }
//   }
// }

render () {
  const navigation = this.props.navigation
  if (this.state.isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <Container>
       {/* <Header/>  */}
       {/* <Header>
          <Left />
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header> */}
      {/* <Content> */}
        <H1>Your Local Cafes</H1>

        <Button block   primary ariaRole='button' onPress={() => navigation.navigate('Search')}>
        <Ionicons name='search' size={25} color='white' />
            <Text>{t('search')}</Text>
          </Button>


          <FlatList
            data={this.state.locationData}
            renderItem={({ item }) => (
              <View>
                <H2 > {t('name_of_cafe')}  {item.location_name}</H2>
                <H3 > {t('cafe_town')} {item.location_town}</H3>
                <Grid>
                <Col style={{ backgroundColor: '#635DB7', height: 200 }}>
                  <Text > {t('cafe_avg_overall_rating')} {item.avg_overall_rating}</Text> 
                <Stars
                  display={item.avg_overall_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={20} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={20} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={20} style={[commonStyles.starRating]} />}
                />

              <Text > {t('cafe_price_rating')} {item.avg_price_rating}</Text>
                <Stars
                  display={item.avg_price_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />
                <Text > {t('cafe_quality_rating')} {item.avg_quality_rating}</Text>
                <Stars
                  display={item.avg_quality_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />
                <Text > {t('cafe_cleanliness_rating')} {item.avg_clenliness_rating}</Text>
                <Stars
                  display={item.avg_clenliness_rating}
                  half
                  spacing={4}
                  starSize={100}
                  count={5}
                  fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                  emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                  halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                />
                
                
                
                
                </Col>
                <Image
                  source={{ uri: item.photo_path }}
                   style={commonStyles.photo}
                />
                </Grid>
                
               

          <Button block primary ariaRole='button' onPress={() => this.props.navigation.navigate('GetReviews', { locData: item })}>
            <Ionicons name='clipboard-outline' size={25} color='white' />
            <Text>{t('view_reviews_button')}</Text>
          </Button>

          <Button block  primary ariaRole='button' onPress={() => this.favouriteLocation(item.location_id)}>
          <Ionicons name='heart' size={25} color='tomato' />
            <Text >{t('favourite')} </Text>
          </Button>

          <Button block  primary ariaRole='button' onPress={() => this.unfavouriteLocation(item.location_id)}>
          <Ionicons name='heart-outline' size={25} color='tomato' />
            <Text>{t('unfavourite')} </Text>
          </Button>
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />

        <H2>Header Two</H2>
        <H3>Header Three</H3>
        <Text>Default</Text>
      {/* </Content> */}
      
    </Container>
    )
  }
}
}

export default Home
