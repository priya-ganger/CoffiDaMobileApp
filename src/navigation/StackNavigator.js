import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../components/home'
import Search from '../components/search'
import Favourites from '../components/favourites'
import Camera from '../components/reviews/image/camera'
import Profile from '../components/accountManagement/profile'
import About from '../components/about'
import Login from '../components/accountManagement/login'
import SignUp from '../components/accountManagement/signup'
import LogOut from '../components/accountManagement/logout'
import GetReviews from '../components/reviews/getReviews'
import AddReview from '../components/reviews/addReview'
import UpdateReview from '../components/reviews/updateReview'
import Photo from '../components/reviews/image/photo'
import YourReviews from '../components/reviews/yourReviews'
import Map from '../components/map'
import LikedReviews from '../components/reviews/likedReviews'
import { t } from '../locales'

const Stack = createStackNavigator()

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#887149'
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif-thin',
    fontSize: 27
  }
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={t('home')} component={Home}
        options={{
          title: t('home')
        }}
      />
      <Stack.Screen name='Search' component={Search} />

      <Stack.Screen
        name='Login' component={Login} options={{
          title: t('login')
        }}
      />

      <Stack.Screen
        name='GetReviews' component={GetReviews}
        options={{
          title: t('reviews')
        }}
      />

      <Stack.Screen
        name='AddReview' component={AddReview}
        options={{
          title: t('add_a_review')
        }}
      />

      <Stack.Screen
        name='YourReviews' component={YourReviews}
        options={{
          title: t('your_reviews')
        }}
      />

      <Stack.Screen
        name='Favourites' component={Favourites}
      />

      <Stack.Screen
        name='Map' component={Map}
        options={{
          title: ''
        }}
      />

    </Stack.Navigator>
  )
}

const AboutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='About' component={About}
        options={{
          title: t('about')
        }}
      />
    </Stack.Navigator>
  )
}

const FavouritesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='Favourites' component={Favourites}
        options={{
          title: t('your_favourites')
        }}
      />
    </Stack.Navigator>
  )
}

const LikedReviewsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='LikedReviews' component={LikedReviews}
        options={{
          title: t('your_favourites')
        }}
      />
    </Stack.Navigator>
  )
}

const MapStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='Map' component={Map}
        options={{
          title: ''
        }}
      />
    </Stack.Navigator>
  )
}

const YourReviewsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='YourReviews' component={YourReviews}
        options={{
          title: t('your_reviews')
        }}
      />

      <Stack.Screen
        name='Photo' component={Photo} options={{
          title: 'Photo'
        }}
      />

      <Stack.Screen
        name='Camera' component={Camera}
        options={{
          title: t('camera')
        }}
      />

      <Stack.Screen
        name='UpdateReview' component={UpdateReview}
        options={{
          title: t('update_your_review')
        }}
      />

    </Stack.Navigator>
  )
}

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Search' component={Search} />

      <Stack.Screen
        name='LikedReviews' component={LikedReviews}
        options={{
          title: 'Liked Reviews'
        }}
      />

    </Stack.Navigator>
  )
}

const CameraStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Camera' component={Camera} />
    </Stack.Navigator>
  )
}

const PhotoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Photo' component={Photo} />
    </Stack.Navigator>
  )
}

const UpdateReviewStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='UpdateReview' component={UpdateReview} />
    </Stack.Navigator>
  )
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='Profile' component={Profile} options={{
          title: t('your_profile')
        }}
      />
    </Stack.Navigator>
  )
}

const GetReviewsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='GetReviews' component={GetReviews} />
    </Stack.Navigator>
  )
}

const AddReviewStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='AddReview' component={AddReview} />

    </Stack.Navigator>
  )
}

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='Login' component={Login} options={{
          title: t('login')
        }}
      />

      <Stack.Screen
        name='SignUp' component={SignUp} options={{
          title: t('sign_up')
        }}
      />
    </Stack.Navigator>
  )
}

const SignUpStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='SignUp' component={SignUp} options={{
          title: t('sign_up')
        }}
      />
    </Stack.Navigator>
  )
}

const LogOutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='LogOut' component={LogOut} options={{
          title: t('log_out')
        }}
      />
    </Stack.Navigator>
  )
}

export { LoginStackNavigator, MainStackNavigator, LikedReviewsStackNavigator, AboutStackNavigator, MapStackNavigator, UpdateReviewStackNavigator, FavouritesStackNavigator, YourReviewsStackNavigator, SearchStackNavigator, CameraStackNavigator, PhotoStackNavigator, ProfileStackNavigator, GetReviewsStackNavigator, AddReviewStackNavigator, SignUpStackNavigator, LogOutStackNavigator }
