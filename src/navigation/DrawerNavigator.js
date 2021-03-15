import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { LoginStackNavigator, SignUpStackNavigator, LogOutStackNavigator, AboutStackNavigator } from './StackNavigator'
import TabNavigator from './TabNavigator'
import { t } from '../locales'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={t('login')} component={LoginStackNavigator} />
      <Drawer.Screen name={t('sign_up')} component={SignUpStackNavigator} />

      <Drawer.Screen name={t('home')} component={TabNavigator} />
      <Drawer.Screen name={'About'} component={AboutStackNavigator} />
      <Drawer.Screen name={t('log_out')} component={LogOutStackNavigator} />

    </Drawer.Navigator>
  )
}

export default DrawerNavigator
