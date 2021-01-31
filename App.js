import 'react-native-gesture-handler';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';

import React, { Component } from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';

import LocationReview from './components/locationReview';
import Location from './components/location'
import User from './components/user'

//import Home from './screens/home'
import Login from './screens/login'
import LogOut from './screens/logout'
import SignUp from './screens/signup'
import Settings from './screens/settings'

import Search from './screens/search'
import Favourites from './screens/favourites'
import Reviews from './screens/reviews'
import Profile from './screens/profile'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Home() {
  return (
    //  <View>
    //  <Text style={{ fontSize: 20 }}>This is the home screen</Text>
    <Tab.Navigator>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Reviews" component={Reviews} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    // </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator ();

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
      {/* <Stack.Navigator
      // this will change all the headers. or can style indiviudually (see the home one)
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: '#1ACB97',
      //   },
      //   headerTintColor: '#fff',
      //   headerTitleStyle: {
      //     fontWeight: 'bold',
      //   },
      // }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: 'This is the Home Screen!', headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Log Out" component={LogOut} /> */}

       
      {/* </Stack.Navigator>    */} 

      <Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" component={Home} />
				<Drawer.Screen name="Settings" component={Settings} />
        
			</Drawer.Navigator>
      
   </NavigationContainer>
     
        );
    }
}

export default App;