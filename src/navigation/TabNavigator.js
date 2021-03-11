import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainStackNavigator, FavouritesStackNavigator, SearchStackNavigator, YourReviewsStackNavigator, SettingsStackNavigator, ProfileStackNavigator } from './StackNavigator'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { t } from '../locales'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === t('home')) {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === t('favourites')) {
            iconName = focused ? 'heart' : 'heart-outline'
          } else if (route.name === t('reviews')) {
            iconName = focused ? 'clipboard' : 'clipboard-outline'
          } else if (route.name === t('settings')) {
            iconName = focused ? 'cog' : 'cog-outline'
          } else if (route.name === t('profile')) {
            iconName = focused ? 'person' : 'person-outline'
          } else if (route.name === t('search')) {
            iconName = focused ? 'search' : 'search-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name={t('home')} component={MainStackNavigator} />
      <Tab.Screen name={t('favourites')} component={FavouritesStackNavigator} />
      <Tab.Screen name={t('reviews')} component={YourReviewsStackNavigator} />
      <Tab.Screen name={t('settings')} component={SettingsStackNavigator} />
      <Tab.Screen name={t('profile')} component={ProfileStackNavigator} />
      <Tab.Screen name={t('search')} component={SearchStackNavigator} />

    </Tab.Navigator>
  )
}

export default BottomTabNavigator
