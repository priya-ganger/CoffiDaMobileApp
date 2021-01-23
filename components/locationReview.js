import React, { Component } from 'react';
import { Text, View } from 'react-native';

class LocationReview extends Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        const locationReview = this.props.data;

        return(
            <View>
                <Text>Review ID: {locationReview.review_id}</Text>
                <Text>Overall Rating: {locationReview.overall_rating}</Text>
                <Text>Price Rating: {locationReview.price_rating}</Text>
                <Text>Quality Rating: {locationReview.quality_rating}</Text>
                <Text>Cleanliness Rating: {locationReview.clenliness_rating}</Text>
                <Text>Review: {locationReview.review_body}</Text>
                <Text>Likes: {locationReview.likes}</Text>
               
            </View>
        )
    }
}
export default LocationReview;