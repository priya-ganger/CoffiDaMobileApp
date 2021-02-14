import React, { Component } from 'react';
import { Text, View, FlatList, Image, StyleSheet, ActivityIndicator, ToastAndroid, Alert, ScrollView, Button, SectionList } from 'react-native';
import LocationReview from './locationReview';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons';

class Location extends Component{
    // This component returns all locations
    constructor(props)
    {
        super(props);

        this.state = {
            isLoading: true,
            locationData: [],

            displayImg: true,
            key: '',
            review: '',

            //trying post

             location_id: '',
            location_name: '',
            location_town: '',
            latitude: '',
            longitude: '',
            photo_path: '',
            avg_overall_rating: '',
            avg_price_rating: '',
            avg_quality_rating: '',
            avg_clenliness_rating: '',
            location_reviews: [{
                                review_id: '',
                                overall_rating: '',
                                price_rating: '',
                                quality_rating: '',
                                clenliness_rating: '',
                                review_body: '',
                                likes: ''
                              }]

          };
    }

    errorLoadingImg = () => {
      this.setState({displayImg: false})
    }

    componentDidMount(){
        this.getLocationData();
      }

      getLocationData = async () => {
        const value = await AsyncStorage.getItem('session_token');
        console.log("Trying to get data")
        return fetch('http://10.0.2.2:3333/api/1.0.0/find',{
          'headers': {
            'X-Authorization': value
          }
        })
        .then((response) => {
        if(response.status === 200){
            return response.json()
        }
        else if(response.status === 401){
          throw 'testing';
        }
        else{
          throw 'something went wrong';
        }
      })
        .then( (responseJson) => {
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

      favouriteLocation = async (item) => {
        //
        let AddFavouriteData = {
          location_id: item.location_id.setState,
          // location_name: item.location_name,
          // location_town: item.location_town,
          // latitude: item.latitude,
          // longitude: item.longitude,
          // photo_path: item.photo_path,
          // avg_overall_rating: item.avg_overall_rating,
          // avg_price_rating: item.avg_overall_rating,
          // avg_quality_rating: item.avg_quality_rating,
          // avg_clenliness_rating: item.avg_clenliness_rating,
          // location_reviews: item.location_reviews
        };

        console.log("This is the data i'm trying to send: "+AddFavouriteData)

        const token = await AsyncStorage.getItem('session_token');
        const userId = await AsyncStorage.getItem('user_id');
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+item.location_id+"favourite", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(AddFavouriteData)
            

        })
        
        .then((response) => {
            if(response.status === 200){
              Alert.alert("Added to favourites");
               return response.json()
            }
            else if(response.status === 400){
                throw 'Bad request';
            }
            else if(response.status === 401){
              throw 'Unauthorised';
          }
          else if(response.status === 404){
            console.log("This is the data i'm trying to send 2: "+AddFavouriteData)
            Alert.alert("Id: " + item.location_id +" Token: " + token + "UserID:" +userId);
            throw 'Not Found';
            }
            else if(response.status === 500){
              throw 'Server Error';
          }
            else{
              Alert.alert("Id: " + item.location_id +" Token: " + token);
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
            console.log("User created", responseJson);
            ToastAndroid.show("Account created", ToastAndroid.SHORT);
            this.props.navigation.navigate("Login");

        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    }



    render(){

        const navigation = this.props.navigation;
        const item = this.state.locationData;
        // const heart = <Icon name="rocket" size={30} color="#900" />;

            if(this.state.isLoading){
                return(
                <View>
                <ActivityIndicator/>
                </View>
            );
            }else{
            return (
                <View>
                
                <FlatList
                data={this.state.locationData}
                renderItem={({item}) => (
                    <View>
                        {/* <Text>Location ID:{item.location_id}</Text> */}
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
                        <Text>Location Reviews:</Text>

                         {item.location_reviews.map((review, key)=> (
                              
                            <Text>
                              <Text key = {review.review_id}>
                                Review ID: {review.review_id}
                                Overall rating: {review.overall_rating}
                                Price Rating: {review.price_rating}
                                Quality Rating: {review.quality_rating}
                                Cleanliness Rating: {review.clenliness_rating}
                                Review body: {review.review_body}
                                Likes: {review.likes}
                            </Text>
                            
                           </Text>
                        ))}  
                        
                      <Button
                        title="Click here to favourite"
                        onPress={() => this.favouriteLocation(item)}
                        />
                    </View>
                )}
                keyExtractor={(item,index) => item.location_id.toString()}
               
                />
               
            </View>
        );
     }
  }
}
export default Location;