import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Search from "../screens/search";
import Favourites from "../screens/favourites";
import Reviews  from "../screens/reviews";
import Profile  from "../screens/profile";
import Settings  from "../screens/settings";
import Login  from "../screens/login";
import SignUp  from "../screens/signup";
import LogOut from "../screens/logout";
import GetReviews from "../screens/getReviews";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="Profile" component={Profile} /> 
    </Stack.Navigator>
  );
}

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

const FavouritesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Favourites" component={Favourites} />
    </Stack.Navigator>
  );
}

const ReviewsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Reviews" component={Reviews} />
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

const GetReviewsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="GetReviews" component={GetReviews} />
    </Stack.Navigator>
  );
}

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const SignUpStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

const LogOutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="LogOut" component={LogOut} />
    </Stack.Navigator>
  );
}

export { LoginStackNavigator, MainStackNavigator, SettingsStackNavigator, FavouritesStackNavigator, ReviewsStackNavigator, ProfileStackNavigator, GetReviewsStackNavigator, SignUpStackNavigator, LogOutStackNavigator };