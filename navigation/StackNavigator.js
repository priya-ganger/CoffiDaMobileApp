import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Search from "../screens/search";
import Favourites from "../screens/favourites";
import Camera  from "../screens/camera";
import Profile  from "../screens/profile";
import Settings  from "../screens/settings";
import Login  from "../screens/login";
import SignUp  from "../screens/signup";
import LogOut from "../screens/logout";
import GetReviews from "../screens/getReviews";
import AddReview from "../screens/addReview";
import UpdateReview from "../screens/updateReview";
import Photo from "../screens/photo";

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
      <Stack.Screen name="Home" component={Home}  
      options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#50808E',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'},}} />


       <Stack.Screen name="Profile" component={Profile} /> 
       <Stack.Screen name="GetReviews" component={GetReviews} />
       <Stack.Screen name="AddReview" component={AddReview} />
       <Stack.Screen name="Camera" component={Camera} />
       <Stack.Screen name="UpdateReview" component={UpdateReview} />
       <Stack.Screen name="Favourites" component={Favourites} />
       <Stack.Screen name="Photo" component={Photo} />
      
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

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

const CameraStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  );
}

const PhotoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}

const UpdateReviewStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="UpdateReview" component={UpdateReview} />
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

const AddReviewStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="AddReview" component={AddReview} />
      
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

export { LoginStackNavigator, MainStackNavigator, SettingsStackNavigator, UpdateReviewStackNavigator, FavouritesStackNavigator, SearchStackNavigator, CameraStackNavigator, PhotoStackNavigator, ProfileStackNavigator, GetReviewsStackNavigator, AddReviewStackNavigator, SignUpStackNavigator, LogOutStackNavigator };