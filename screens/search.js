import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, Image, Button, FlatList, ActivityIndicator, TextInput } from 'react-native';
//import { Rating, AirbnbRating } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Search extends Component{

    constructor(props)
  {
      super(props);

      this.state = {
          isLoading: true,
          locationData: null,
          q: '',
          overall_rating: 0

  };
}

componentDidMount() {
    this.getLocationData('http://10.0.2.2:3333/api/1.0.0/find');
  }

  getLocationData = async () => {
    const value = await AsyncStorage.getItem('session_token');
    console.log("Trying to get data for search")
    return fetch('http://10.0.2.2:3333/api/1.0.0/find',{
      'headers': {
        'X-Authorization': value
      }
    })
    .then((response) => {
    if(response.status === 200){
        return response.json()
    }
    else if(response.status === 400){
      throw 'Bad Request';
    }
    else if(response.status === 401){
        throw 'Unauthorised';
      }
      else if(response.status === 500){
        throw 'Server Error';
      }
    else{
      throw 'something went wrong';
    }
  })
    .then((responseJson) => {
     console.log(responseJson);
      this.setState({
        isLoading: false,
        locationData: responseJson
      })
      
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    });
  }

  search =() => {
    let url = ''

    console.log(this.state.q);
    console.log(this.state.overall_rating);
    console.log(this.state.price_rating);

    if(this.state.q != ''){
        url += "q=" + this.state.q + "&";
    }

    if(this.state.overall_rating > 0){
        url += "overall_rating=" + this.state.overall_rating + "&";
    }

    this.getLocationData(url);
  }

    render(){
        
        const navigation = this.props.navigation;

        // return(
        //     <View>
        //       <Text>This is the Search screen</Text>
        //       <Button title="Go back"
        //         onPress={() => navigation.goBack()} />  
        //     </View>
        // )

        if(this.state.isLoading){
            return(
            <View>
            <ActivityIndicator/>
            </View>
        );
        }else{
        return (
            <View>
              <Text>Search!</Text>
              <TextInput
                placeholder={'Search here'}
                onChangeText={(q)=>this.setState({q: q})}
                value={this.state.q}
             />

             <Button
            title="Search"
            onPress={() =>{this.search()}}
             />

<FlatList
data={this.state.locationData}
renderItem={({item}) => (
  
    <View>
        <Text>Location ID:{item.location}</Text> 
        <Text> Name:  {item.location_name}</Text>
        <Text> Town: {item.location_town}</Text>
        {/* <Text>Location Latitude: {item.latitude}</Text>
        <Text>Location Longitude:  {item.longitude}</Text> */}
        {/* <Text>Location Photo   {item.photo_path}</Text> */}
         {/* {this.state.displayImg ? ( 
          */}
          <Image 
           source={{uri: item.photo_path}}
          //source={{uri: 'https://tr-images.condecdn.net/image/vOkb7Jmdv2L/crop/1020/f/1kaffeine-london-mar19-pr.jpg'}}
          style={{width: 400, height: 400}}
          onError={this.errorLoadingImg}
          />
        {/* //   ) : (
        //    <View></View>
        //  )} */}
        <Text> Average Overall Rating: {item.avg_overall_rating}</Text>
        <Text> Price Rating: {item.avg_price_rating}</Text>
        <Text> Quality Rating: {item.avg_quality_rating}</Text>
        <Text> Cleanliness Rating: {item.avg_clenliness_rating}</Text>
        <Text>  </Text>
        </View>
)}
keyExtractor={(item,index) => item.location_id.toString()}
/>
</View>
 )      
        }

    }
}
export default Search;