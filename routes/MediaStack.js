import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeTabScreen} from './HomeTab.js'
import Media from '../views/Media.js'

const MediaStack = createStackNavigator() 
export const MediaStackScreen = () => {
  return(
    <MediaStack.Navigator headerMode = 'none'>
        <MediaStack.Screen 
            name="HomeTab" 
            component={HomeTabScreen} 
          />
        <MediaStack.Screen 
            name="Media" 
            component={Media} 
          />
      </MediaStack.Navigator>
  )
  
}