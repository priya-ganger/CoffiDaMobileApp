import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './navigation/DrawerNavigator'
import React from 'react'

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}

export default App
