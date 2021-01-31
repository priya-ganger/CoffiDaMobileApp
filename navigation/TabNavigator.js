import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, FavouritesStackNavigator, ReviewsStackNavigator, SettingsStackNavigator,  } from "./StackNavigator";

// import { MainStackNavigator, SearchStackNavigator, FavouritesStackNavigator, ReviewsStackNavigator,  ProfileStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={MainStackNavigator} />
      <Tab.Screen name="Favourites" component={FavouritesStackNavigator} />
      <Tab.Screen name="Reviews" component={ReviewsStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} /> 
      
      


      {/* 

     
      <Tab.Screen name="Reviews" component={ReviewsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} /> 
      
      */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;