import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../components/home'
import Search from '../components/search'
import Favourites from '../components/favourites'
import Camera from '../components/camera'
import Profile from '../components/profile'
import Settings from '../components/settings'
import Login from '../components/login'
import SignUp from '../components/signup'
import LogOut from '../components/logout'
import GetReviews from '../components/getReviews'
import AddReview from '../components/addReview'
import UpdateReview from '../components/updateReview'
import Photo from '../components/photo'
import YourReviews from '../components/yourReviews'
import Map from '../components/map'
import { t } from '../locales'

const Stack = createStackNavigator()

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#50808E'
  },
  headerTintColor: 'white',
  headerTitleStyle: { fontWeight: 'bold' }
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
        name={t('camera')} component={Camera}
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

      <Stack.Screen
        name='Favourites' component={Favourites}
      />

      <Stack.Screen
        name='Photo' component={Photo} options={{
          title: 'Photo'
        }}
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

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name={t('settings')} component={Settings} />
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
        name={t('your_reviews')} component={YourReviews}
        options={{
          title: t('your_reviews')
        }}
      />
    </Stack.Navigator>
  )
}

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name={t('search')} component={Search} />
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
          title: ''
        }}
      />
    </Stack.Navigator>
  )
}

const SignUpStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name={t('sign_up')} component={SignUp} options={{
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

export { LoginStackNavigator, MainStackNavigator, SettingsStackNavigator, MapStackNavigator, UpdateReviewStackNavigator, FavouritesStackNavigator, YourReviewsStackNavigator, SearchStackNavigator, CameraStackNavigator, PhotoStackNavigator, ProfileStackNavigator, GetReviewsStackNavigator, AddReviewStackNavigator, SignUpStackNavigator, LogOutStackNavigator }
