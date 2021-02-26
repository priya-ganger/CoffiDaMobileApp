import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/home'
import Search from '../screens/search'
import Favourites from '../screens/favourites'
import Camera from '../screens/camera'
import Profile from '../screens/profile'
import Settings from '../screens/settings'
import Login from '../screens/login'
import SignUp from '../screens/signup'
import LogOut from '../screens/logout'
import GetReviews from '../screens/getReviews'
import AddReview from '../screens/addReview'
import UpdateReview from '../screens/updateReview'
import Photo from '../screens/photo'
import YourReviews from '../screens/yourReviews'

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
          title: 'Home',
      }}
      />

      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen
        name='GetReviews' component={GetReviews}
        
      />

      <Stack.Screen name='AddReview' component={AddReview}
       options={{
        title: 'Add a Review',
      }} />

      <Stack.Screen name='YourReviews' component={YourReviews} 
      options={{
        title: 'Your Reviews',
      }}/>

      <Stack.Screen name='Camera' component={Camera} 
       options={{
        title: 'Camera',
      }}/>

      <Stack.Screen name='UpdateReview' component={UpdateReview} 
       options={{
        title: 'Update your review',
      }}/>

      <Stack.Screen name='Favourites' component={Favourites} 
      />

      <Stack.Screen name='Photo' component={Photo}  options={{
        title: 'Photo',
      }}/>

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
      <Stack.Screen name='Favourites' component={Favourites} 
      options={{
        title: 'Your favourites',
      }}/>
    </Stack.Navigator>
  )
}

const YourReviewsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='YourReviews' component={YourReviews} 
      options={{
        title: 'Your Reviews',
      }}/>
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
      <Stack.Screen name='Profile' component={Profile} options={{
      title: 'Your Profile',
    }}/>
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
          title: '',
          }}
      />
    </Stack.Navigator>
  )
}

const SignUpStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='SignUp' component={SignUp} options={{
          title: 'Sign up'
          }}/>
    </Stack.Navigator>
  )
}

const LogOutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='LogOut' component={LogOut} options={{
          title: 'Log out'
          }}/>
    </Stack.Navigator>
  )
}

export { LoginStackNavigator, MainStackNavigator, SettingsStackNavigator, UpdateReviewStackNavigator, FavouritesStackNavigator, YourReviewsStackNavigator, SearchStackNavigator, CameraStackNavigator, PhotoStackNavigator, ProfileStackNavigator, GetReviewsStackNavigator, AddReviewStackNavigator, SignUpStackNavigator, LogOutStackNavigator }
