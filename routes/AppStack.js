import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthStackScreen} from '../routes/AuthStack.js'
import {HomeTabScreen} from '../routes/HomeTab.js'
import {MediaStackScreen} from '../routes/MediaStack.js'

const AppStack = createStackNavigator() 
export const AppStackScreen = ({initRoute}) => {
  return(
    <AppStack.Navigator 
      headerMode = 'none'
      initialRouteName = {initRoute}
      >
      <AppStack.Screen 
        name="AuthStack" 
        component={AuthStackScreen} 
        />
      <AppStack.Screen 
        name="MediaStack" 
        component={MediaStackScreen} 
        />
    </AppStack.Navigator>
  )
  
}
