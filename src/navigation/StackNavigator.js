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
        name='Home' component={Home}
        options={{
          title: 'Home'
        }}
      />

      <Stack.Screen
        name='GetReviews' component={GetReviews}
        options={{
          title: 'Reviews'
        }}
      />

      <Stack.Screen
        name='AddReview' component={AddReview}
        options={{
          title: 'Add a Review'
        }}
      />

      <Stack.Screen
        name='YourReviews' component={YourReviews}
        options={{
          title: 'Your Reviews'
        }}
      />

      <Stack.Screen
        name='Camera' component={Camera}
        options={{
          title: 'Camera'
        }}
      />

      <Stack.Screen
        name='UpdateReview' component={UpdateReview}
        options={{
          title: 'Update your review'
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
          title: 'Your location'
        }}
      />

    </Stack.Navigator>
  )
}

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}

const FavouritesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name='Favourites' component={Favourites}
        options={{
          title: 'Your favourites'
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
          title: 'Your location'
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
          title: 'Your Reviews'
        }}
      />
    </Stack.Navigator>
  )
}

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Search' component={Search} />
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
          title: 'Your Profile'
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
          title: 'Log out'
        }}
      />
    </Stack.Navigator>
  )
}

export { LoginStackNavigator, MainStackNavigator, SettingsStackNavigator, MapStackNavigator, UpdateReviewStackNavigator, FavouritesStackNavigator, YourReviewsStackNavigator, SearchStackNavigator, CameraStackNavigator, PhotoStackNavigator, ProfileStackNavigator, GetReviewsStackNavigator, AddReviewStackNavigator, SignUpStackNavigator, LogOutStackNavigator }
