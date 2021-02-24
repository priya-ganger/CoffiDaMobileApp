import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, TextInput, ToastAndroid } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonStyles } from '../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: null,
      q: '',
      overall_rating: 0,
      price_rating: 0,
      quality_rating: 0,
      clenliness_rating: 0
    }
  }

  componentDidMount () {
    this.getLocationData('http://10.0.2.2:3333/api/1.0.0/find')
  }

  getLocationData = async (url) => {
    const value = await AsyncStorage.getItem('session_token')
    console.log('Trying to get data for search')
    return fetch(url, {
      headers: {
        'X-Authorization': value
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 400) {
          throw 'Bad Request'
        } else if (response.status === 401) {
          throw 'Unauthorised'
        } else if (response.status === 500) {
          throw 'Server Error'
        } else {
          throw 'something went wrong'
        }
      })
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          locationData: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  search =() => {
    let url = 'http://10.0.2.2:3333/api/1.0.0/find?'

    console.log(this.state.q)
    console.log(this.state.overall_rating)
    console.log(this.state.price_rating)
    console.log(this.state.quality_rating)
    console.log(this.state.clenliness_rating)

    if (this.state.q !== '') {
      url += 'q=' + this.state.q + '&'
    }

    if (this.state.overall_rating > 0) {
      url += 'overall_rating=' + this.state.overall_rating + '&'
    }

    if (this.state.price_rating > 0) {
      url += 'price_rating=' + this.state.price_rating + '&'
    }

    if (this.state.quality_rating > 0) {
      url += 'quality_rating=' + this.state.quality_rating + '&'
    }

    if (this.state.clenliness_rating > 0) {
      url += 'clenliness_rating=' + this.state.clenliness_rating + '&'
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

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={commonStyles.container}>
          <Text style={commonStyles.title}>Name of cafe:</Text>
          <TextInput
          style={commonStyles.input}
            placeholder='Type here'
            onChangeText={(q) => this.setState({ q: q })}
            value={this.state.q}
          />

          <Text style={commonStyles.subheadingText}>Overall Rating</Text>
          <AirbnbRating
            size={15}
            defaultRating={0}
            reviewSize={0}
            selectedColor='#f1c40f'
            unSelectedColor='black'
            reviews={['Terrible', 'Bad', 'Average', 'Good', 'Great']}
            onFinishRating={(rating) => this.ratingCompleted(rating, 'overall_rating')}
          />
{/* 
          {/* <Text style={commonStyles.subheadingText}>Price Rating</Text>
             <AirbnbRating
             size={15}
             defaultRating={0}
             selectedColor={'#f1c40f'}
             unSelectedColor={'black'}
             reviews={['Terrible', 'Bad', 'Average', 'Good', 'Great']}
             onFinishRating={(rating) => this.ratingCompleted(rating, "price_rating")}
             /> */}

            <Text style={commonStyles.subheadingText}>Quality Rating</Text>
             <AirbnbRating
             size={15}
             defaultRating={0}
             selectedColor={'#f1c40f'}
             unSelectedColor={'black'}
             reviews={['Terrible', 'Bad', 'Average', 'Good', 'Great']}
             onFinishRating={(rating) => this.ratingCompleted(rating, "quality_rating")}
             />

            <Text style={commonStyles.subheadingText}>Cleanliness Rating</Text>
             <AirbnbRating
             size={15}
             defaultRating={0}
             selectedColor={'#f1c40f'}
             unSelectedColor={'black'}
             reviews={['Terrible', 'Bad', 'Average', 'Good', 'Great']}
             onFinishRating={(rating) => this.ratingCompleted(rating, "clenliness_rating")}
             /> 


<TouchableOpacity
style={commonStyles.button} onPress={() => this.search()}
>
<Text style={commonStyles.buttonText}>Search </Text>
<Ionicons name='search' size={25} color='white' />
</TouchableOpacity>

          <FlatList
            data={this.state.locationData}
            renderItem={({ item }) => (

              <View>
                {/* <Text>Location ID:{item.location_id}</Text> */}
                <Text style={commonStyles.subheadingText}> Name:  {item.location_name}</Text>
                <Text style={commonStyles.subheadingText}> Town: {item.location_town}</Text>
                {/* <Text>Location Photo   {item.photo_path}</Text> */}
                {/* {this.state.displayImg ? (
          */}
                <Image
                  source={{ uri: item.photo_path }}
                  style={commonStyles.photo}
                  onError={this.errorLoadingImg}
                />
                {/* //   ) : (
        //    <View></View>
        //  )} */}
                <Text style={commonStyles.subheadingText}> Average Overall Rating: {item.avg_overall_rating}</Text>
                <Text style={commonStyles.subheadingText}> Price Rating: {item.avg_price_rating}</Text>
                <Text style={commonStyles.subheadingText}> Quality Rating: {item.avg_quality_rating}</Text>
                <Text style={commonStyles.subheadingText}> Cleanliness Rating: {item.avg_clenliness_rating}</Text>
                <Text>  </Text>
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
        </View>
      )
    }
  }
}

export default Search
