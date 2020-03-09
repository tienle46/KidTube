import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthStackScreen} from '../routes/AuthStack.js'
import {HomeTabScreen} from '../routes/HomeTab.js'

const AppStack = createStackNavigator() 
export const AppStackScreen = () => {
  return(
    <AppStack.Navigator headerMode = 'none'>
        <AppStack.Screen 
          name="AuthStack" 
          component={AuthStackScreen} 
          />
        <AppStack.Screen 
          name="HomeTab" 
          component={HomeTabScreen} 
          />
      </AppStack.Navigator>
  )
  
}
