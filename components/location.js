import React, { Component } from 'react';
import { Text, View, FlatList, Image, StyleSheet, ActivityIndicator, ToastAndroid, Alert, ScrollView } from 'react-native';
import LocationReview from './locationReview';
import AsyncStorage from "@react-native-async-storage/async-storage";

class Location extends Component{
    // This component returns locations
    constructor(props)
    {
        super(props);

        this.state = {
            isLoading: true,
            locationData: [],

            displayImg: true
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

    render(){
        //         <FlatList
        //             data={location.location_reviews}
        //             renderItem={({item}) => (<LocationReview data={item} />
        //                 )}
        //             keyExtractor={(item) => item.review_id.toString()}
        //          /> 

        // const locationReview = this.props.data;

        const navigation = this.props.navigation;
        const item = this.state.locationData;

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
                        <Text>Location ID:{item.location_id}</Text>
                        <Text>Location Name:  {item.location_name}</Text>
                        <Text>Location Town: {item.location_town}</Text>
                        <Text>Location Latitude: {item.latitude}</Text>
                        <Text>Location Longitude:  {item.longitude}</Text>
                        <Text>Location Photo   {item.photo_path}</Text>
                         {/* {this.state.displayImg ? ( 
                          */}
                          <Image 
                           source={{uri: item.photo_path}}
                          //source={{uri: 'https://tr-images.condecdn.net/image/vOkb7Jmdv2L/crop/1020/f/1kaffeine-london-mar19-pr.jpg'}}
                          style={{width: 200, height: 200}}
                          onError={this.errorLoadingImg}
                          />
              
                        {/* //   ) : (
                        //    <View></View>
                        //  )} */}
                        <Text>Location Average Overall Rating:{item.avg_overall_rating}</Text>
                        <Text>Location Price Rating:{item.avg_price_rating}</Text>
                        <Text>Location Quality Rating:{item.avg_quality_rating}</Text>
                        <Text>Location Cleanliness Rating:{item.avg_clenliness_rating}</Text>
                        <Text>  </Text>
                        

                        {/* {item.location_reviews.map(review =>(
                            <Text>
                              <Text>Location Reviews:</Text>
                              <Text>  </Text>
                            <Text>Review ID: {review.review_id}</Text>
                            <Text> </Text>
                            <Text> Overall rating: {review.overall_rating} </Text>
                            <Text> Price Rating: {review.price_rating} </Text>
                            <Text> Quality Rating: {review.quality_rating}</Text>
                            <Text> Cleanliness Rating: {review.clenliness_rating} </Text>
                            <Text> Review body: {review.review_body}  </Text>
                            <Text> Likes: {review.likes}  </Text>
                           
                           </Text>
                        ))} 
                         <Text> </Text> */}

                       
                         {/* {item.reviews.map(test =>(
                            <Text>
                              <Text>Location Reviews:</Text>
                              <Text>  </Text>
                            <Text>Review ID: {test.review_id}</Text>
                            <Text> </Text>
                            <Text> Overall rating: {test.overall_rating} </Text>
                            <Text> Price Rating: {test.price_rating} </Text>
                            <Text> Quality Rating: {test.quality_rating}</Text>
                            <Text> Cleanliness Rating: {test.clenliness_rating} </Text>
                            <Text> Review body: {test.review_body}  </Text>
                            <Text> Likes: {test.likes}  </Text>
                           
                           </Text>
                        ))} 
                         <Text> </Text> */}


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