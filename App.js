import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import LocationReview from './components/locationReview';
import Location from './components/location'

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      location: {
        "location_id": 75,
        "location_name": "Coffee Shop",
        "location_town": "Manchester",
        "latitude": 74.567,
        "longitude": 102.435,
        "photo_path": " ",
        "avg_overall_rating": 4.5,
        "avg_price_rating": 4.3,
        "avg_quality_rating": 4,
        "avg_clenliness_rating": 3.8,
        "location_reviews": [{
                              "review_id": 1,
                              "overall_rating": 5,
                              "price_rating": 4,
                              "quality_rating": 3,
                              "clenliness_rating": 5,
                              "review_body": "Delicious coffee, would recommend!",
                              "likes": 50000000000000000
                            },
                          
                            {
                              "review_id": 2,
                              "overall_rating": 5,
                              "price_rating": 4,
                              "quality_rating": 3,
                              "clenliness_rating": 5,
                              "review_body": "Just brilliant!",
                              "likes": 5000
                            },
                          
                            {
                             "review_id": 3,
                             "overall_rating": 2,
                             "price_rating": 2,
                             "quality_rating": 1,
                             "clenliness_rating": 1,
                             "review_body": "Boring and nasty coffee!",
                             "likes": 1
                            }],
                          }
  
     }
  }

render(){
  return (
      // <View>
      //   <LocationReview data={this.state.locationReview} />
      // </View>

      <View>
        <Location data={this.state.location} />
        <FlatList
           data={this.state.locationReviews}
           renderItem={({item}) => (<LocationReview data={item} />
           )}
           keyExtractor={(item) => item.review_id.toString()}
        />   
      </View>
        );
    }
}

export default App;

//Test data
    //   locationReviews: [{
    //     "review_id": 1,
    //     "overall_rating": 5,
    //     "price_rating": 4,
    //     "quality_rating": 3,
    //     "clenliness_rating": 5,
    //     "review_body": "Delicious coffee, would recommend!",
    //     "likes": 5000
    //   },

    //  {
    //     "review_id": 2,
    //     "overall_rating": 5,
    //     "price_rating": 4,
    //     "quality_rating": 3,
    //     "clenliness_rating": 5,
    //     "review_body": "Boring!",
    //     "likes": 50001
    //   },

    //   {
    //     "review_id": 3,
    //     "overall_rating": 5,
    //     "price_rating": 4,
    //     "quality_rating": 3,
    //     "clenliness_rating": 5,
    //     "review_body": "Yay!",
    //     "likes": 50002
    //   }], 