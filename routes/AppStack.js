//main stack of the application
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../views/Login.js'
import {HomeTabScreen} from '../routes/HomeTab.js'
import {MediaStackScreen} from '../routes/MediaStack.js'

const AppStack = createStackNavigator() 
export const AppStackScreen = () => {
  return(
    <AppStack.Navigator 
      headerMode = 'none'
      >
      <AppStack.Screen 
        name="Login" 
        component={Login} 
        />
      <AppStack.Screen 
        name="MediaStack" 
        component={MediaStackScreen} 
        />
    </AppStack.Navigator>
  )
  
}
