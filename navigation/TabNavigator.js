import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, FavouritesStackNavigator, ReviewsStackNavigator, SearchStackNavigator, SettingsStackNavigator, ProfileStackNavigator, GetReviewsStackNavigator  } from "./StackNavigator";
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home': 'home-outline';

        } else if (route.name === 'Favourites') {
          iconName = focused ? 'heart' : 'heart-outline';
        }
        else if (route.name === 'Reviews') {
          iconName = focused ? 'camera' : 'camera-outline';
        }
        else if (route.name === 'Settings') {
          iconName = focused ? 'cog' : 'cog-outline';
        }
        else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        else if (route.name === 'GetReviews') {
          iconName = focused ? 'clipboard' : 'clipboard-outline';
        }

        else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        }
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Favourites" component={FavouritesStackNavigator} />
      <Tab.Screen name="Reviews" component={ReviewsStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} /> 
      <Tab.Screen name="Profile" component={ProfileStackNavigator} /> 
      <Tab.Screen name="GetReviews" component={GetReviewsStackNavigator} /> 
      <Tab.Screen name="Search" component={SearchStackNavigator} /> 

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;