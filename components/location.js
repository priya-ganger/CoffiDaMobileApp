import React, { Component } from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import LocationReview from './locationReview';



class Location extends Component{
    // This component returns a location with a list of reviews.
    constructor(props)
    {
        super(props);

        // this.state= {
        //     displayImg: true
        //   }
    }

    

    // onErrorLoadingImg = () => {
    //     this.setState({displayImg: false})
    // }

    render(){
        const location = this.props.data;

        
      

        return(
            
            <View>
                <Text>Location ID: {location.location_id}</Text>
                <Text>Location Name: {location.location_name}</Text>
                <Text>Location Town: {location.location_town}</Text>
                <Text>Latitude: {location.latitude}</Text>
                <Text>Longitude Rating: {location.longitude}</Text>
                <Text>Photo Path: {location.photo_path}</Text>
                <Text>Average Overall Rating: {location.avg_overall_rating}</Text>
                <Text>Average Price Rating: {location.avg_price_rating}</Text>
                <Text>Average Quality Rating: {location.avg_quality_rating}</Text>
                <Text>Average Cleanliness Rating: {location.avg_clenliness_rating}</Text>
                <Text>   </Text>
                <Text>Location Reviews: </Text>
               

                <FlatList
                    data={location.location_reviews}
                    renderItem={({item}) => (<LocationReview data={item} />
                        )}
                    keyExtractor={(item) => item.review_id.toString()}
                 /> 




            </View>
               
           

        );
     }
}
export default Location;