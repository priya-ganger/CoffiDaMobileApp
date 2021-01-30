import 'react-native-gesture-handler';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import React, { Component } from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';

import LocationReview from './components/locationReview';
import Location from './components/location'
import User from './components/user'

import Home from './components/home'
import About from './components/about'
import Contact from './components/contact'

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  photo: {
    width: 50,
    height: 50,
  },
});

const stack = createStackNavigator();
const drawer = createDrawerNavigator();

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      user: {
        "user_id": 1,
        "first_name": "Priya",
        "last_name": "Ganger",
        "email": "priya.ganger@mmu.ac.uk",
        "favourite_locations": [
            {
              "location_id": 73,
              "location_name": "Aunt Mary's Great Coffee Shop",
              "location_town": "London",
              "latitude": 74.567,
              "longitude": 102.435,
              "photo_path": "http://cdn.coffida.com/images/78346822.jpg",
              "avg_overall_rating": 4.5,
              "avg_price_rating": 4.3,
              "avg_quality_rating": 4,
              "avg_clenliness_rating": 3.8,
              "location_reviews": [
                {
                  "review_id": 643,
                  "overall_rating": 4,
                  "price_rating": 2,
                  "quality_rating": 3,
                  "clenliness_rating": 5,
                  "review_body": "Great coffee, but the bathrooms stank!",
                  "likes": 4654
                }
              ]
            }
          ],
          "reviews": [
            {
              "review": {
                "review_id": 643,
                "overall_rating": 4,
                "price_rating": 2,
                "quality_rating": 3,
                "clenliness_rating": 5,
                "review_body": "Great coffee, but the bathrooms stank!",
                "likes": 4654
              },
              "location": {
                "location_id": 73,
                "location_name": "Aunt Mary's Great Coffee Shop",
                "location_town": "London",
                "latitude": 74.567,
                "longitude": 102.435,
                "photo_path": "http://cdn.coffida.com/images/78346822.jpg",
                "avg_overall_rating": 4.5,
                "avg_price_rating": 4.3,
                "avg_quality_rating": 4,
                "avg_clenliness_rating": 3.8
              }
            }
          ],
        },


      location: {
        "location_id": 75,
        "location_name": "Coffee Shop",
        "location_town": "Manchester",
        "latitude": 74.567,
        "longitude": 102.435,
        "photo_path": "https://reactnative.dev/img/tiny_logo.png'",
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
                            }]
                         ,
                      
                          
  "location_id": 76,
  "location_name": "Coffee Shop",
  "location_town": "Manchester",
  "latitude": 74.567,
  "longitude": 102.435,
  "photo_path": "https://reactnative.dev/img/tiny_logo.png'",
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
    <NavigationContainer>
       <stack.Navigator>
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="About" component={About} />
        <stack.Screen name="Contact" component={Contact} />
      </stack.Navigator> 

      {/* <drawer.Navigator>
        <drawer.Screen name="Home" component={Home} />
        <drawer.Screen name="About" component={About} />
        <drawer.Screen name="Contact" component={Contact} />
        <View><text>Hello</text></View>
      </drawer.Navigator> */}
      
      {/* <View>
         <LocationReview data={this.state.locationReview} />
       </View> */}
      
      {/* <View>
        <User data={this.state.user} />
        <Location data={this.state.location} />
        <FlatList
           data={this.state.locationReviews}
           renderItem={({item}) => (<LocationReview data={item} />
           )}
           keyExtractor={(item) => item.review_id.toString()}
        />    */}

        {/* <View style={styles.container}>
                <Image
                  style={styles.tinyLogo}
                  source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                />
        </View> */}
      {/* </View> */}
      </NavigationContainer>


        );
    }
}

export default App;