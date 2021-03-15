import React, { Component } from 'react'
import { Alert, View, Image, PermissionsAndroid, FlatList, ToastAndroid } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Stars from 'react-native-stars'
import { t, getLanguage } from '../locales'
import Geolocation from 'react-native-geolocation-service'
import { getDistance } from 'geolib'
import { getSessionToken } from '../utils/asyncStorage'
import { Container, Item, Icon, Input, H2, H3, Text, Col, Button, Grid, Spinner, Header } from 'native-base'

async function requestLocationPermission () {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: ' Location Permission',
        message: 'This app requires access to your location',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access the location')
      return true
    } else {
      console.log('Location permission denied')
      return false
    }
  } catch (err) {
    console.warn(err)
  }
}

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: {
        longitude: '',
        latitude: ''
      },
      locationPermission: false,
      location_id: '',
      longitude: '',
      latitude: '',

      isLoading: true,
      locationData: [],
      q: '',
      overall_rating: 0,
      price_rating: 0,
      quality_rating: 0,
      clenliness_rating: 0
    }
  }

  componentDidMount () {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getLocationData('http://10.0.2.2:3333/api/1.0.0/find')
      getLanguage()
      this.setState({ isLoading: true })
      this.findCoordinates()
    })
  }

  componentWillUnmount () {
    this._unsubscribe()
  }

  getLocationData = async (url) => {
    return fetch(url, {
      headers: {
        'X-Authorization': await getSessionToken()
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 400) {
          Alert.alert('Bad Request. Try again.')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised. Please login.')
        } else if (response.status === 500) {
          Alert.alert('Server Error. Try again.')
        } else if (response.status === 304) {
          Alert.alert('Not Modified')
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

  search =() => {
    let url = 'http://10.0.2.2:3333/api/1.0.0/find?'

    if (this.state.q !== '') {
      url += 'q=' + this.state.q + '&'
    }

    if (this.state.overall_rating > 0) {
      url += 'overall_rating=' + this.state.overall_rating
    }

    this.getLocationData(url)
  }

  ratingCompleted (rating, name) {
    const stateObject = () => {
      const returnObj = {}
      returnObj[name] = rating
      return returnObj
    }
    this.setState(stateObject)
    // to avoid 'name' being updated
  }

  findCoordinates = () => {
    if (!this.state.locationPermission) {
      this.setState({ locationPermission: requestLocationPermission() })
    }
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          location: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }
        })

        this.setState({ isLoading: false })
      },
      (error) => {
        Alert.alert(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )
  };

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <Spinner color='green' />
        </View>
      )
    } else {
      return (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name='ios-search' />
              <Input
                placeholder={t('search')}
                onChangeText={(q) => this.setState({ q: q })}
                value={this.state.q}
                ariaLabel={t('search')}
              />
              <Icon name='ios-people' />
            </Item>
            <Button transparent>
              <Text>{t('search')}</Text>
            </Button>
          </Header>

          <Text style={commonStyles.h2}>{t('overall_rating')}</Text>
          <AirbnbRating
            size={15}
            defaultRating={0}
            reviewSize={0}
            selectedColor='#f1c40f'
            unSelectedColor='black'
            reviews={['Terrible', 'Bad', 'Average', 'Good', 'Great']}
            onFinishRating={(rating) => this.ratingCompleted(rating, 'overall_rating')}
          />
          <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.search()}>
            <Ionicons name='search' size={25} color='white' />
            <Text style={commonStyles.buttonText}>{t('search')}</Text>
          </Button>

          <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.props.navigation.navigate('LikedReviews')}>
            <Ionicons name='ios-thumbs-up-outline' size={25} color='white' />
            <Text style={commonStyles.buttonText}>{t('your_liked_reviews')}</Text>
          </Button>

          <FlatList
            data={this.state.locationData}
            renderItem={({ item }) => {
              const dis = getDistance(
                { latitude: this.state.location.latitude, longitude: this.state.location.longitude },
                { latitude: item.latitude, longitude: item.longitude }
              )
              return (
                <View>
                  <H2 style={commonStyles.h2}> {t('name_of_cafe')}  {item.location_name}</H2>
                  <H3 style={commonStyles.h3}> {t('cafe_town')} {item.location_town}</H3>

                  <Grid primary style={commonStyles.grid}>
                    <Col style={commonStyles.col}>
                      <Text style={commonStyles.headingText}> {t('cafe_avg_overall_rating')} {item.avg_overall_rating}</Text>
                      <Stars
                        display={item.avg_overall_rating}
                        half
                        spacing={4}
                        starSize={100}
                        count={5}
                        fullStar={<Ionicons name='star' size={15} style={[commonStyles.starRating]} />}
                        emptyStar={<Ionicons name='star-outline' size={15} style={[commonStyles.starRating, commonStyles.starRatingEmpty]} />}
                        halfStar={<Ionicons name='star-half' size={15} style={[commonStyles.starRating]} />}
                      />

                      <Text style={commonStyles.headingText}> {t('distance')}: {dis} M  ({dis / 1000} KM) </Text>

                    </Col>

                    <Image
                      source={{ uri: item.photo_path }}
                      style={commonStyles.photo}
                    />
                  </Grid>
                  <Button block primary style={commonStyles.button} ariaRole='button' onPress={() => this.props.navigation.navigate('Map', { distance: dis })}>
                    <Ionicons name='map' size={25} color='white' />
                    <Text style={commonStyles.buttonText}>{t('find_on_map')} </Text>
                  </Button>
                </View>
              )
            }}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
        </Container>
      )
    }
  }
}

export default Search
