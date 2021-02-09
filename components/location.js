import React, { Component } from 'react';
import { Text, View, FlatList, Image, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import LocationReview from './locationReview';
import AsyncStorage from "@react-native-async-storage/async-storage";

class Location extends Component{
    // This component returns a location with a list of reviews.
    constructor(props)
    {
        super(props);

        this.state = {
            isLoading: true,
            locationData: []
    };

        // this.state= {
        //     displayImg: true
        //   }
    }
    componentDidMount(){
        this.getLocationData();
      }

      getLocationData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        // return fetch('http://10.0.2.2:3333/api/1.0.0/user/{user_id}')
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
      
    

    // onErrorLoadingImg = () => {
    //     this.setState({displayImg: false})
    // }

    render(){
            

        // const location = this.props.data;

        
      

        // return(
            
        //     <View>
        //         <Text>Location ID: {location.location_id}</Text>
        //         <Text>Location Name: {location.location_name}</Text>
        //         <Text>Location Town: {location.location_town}</Text>
        //         <Text>Latitude: {location.latitude}</Text>
        //         <Text>Longitude Rating: {location.longitude}</Text>
        //         <Text>Photo Path: {location.photo_path}</Text>
        //         <Text>Average Overall Rating: {location.avg_overall_rating}</Text>
        //         <Text>Average Price Rating: {location.avg_price_rating}</Text>
        //         <Text>Average Quality Rating: {location.avg_quality_rating}</Text>
        //         <Text>Average Cleanliness Rating: {location.avg_clenliness_rating}</Text>
        //         <Text>   </Text>
        //         <Text>Location Reviews: </Text>
               

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
                        <Text>Location Photo:  {item.photo_path}</Text>
                        <Text>Location Average Overall Rating:{item.avg_overall_rating}</Text>
                        <Text>Location Price Rating:{item.avg_price_rating}</Text>
                        <Text>Location Quality Rating:{item.avg_quality_rating}</Text>
                        <Text>Location Cleanliness Rating:{item.avg_clenliness_rating}</Text>
                        <Text>  </Text>
                        <Text>Location Reviews:</Text>
                        <Text>  </Text>
                        
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