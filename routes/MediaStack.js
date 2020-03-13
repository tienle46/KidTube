import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeTabScreen} from './HomeTab.js'
import Media from '../views/Media.js'
import Upload from '../views/Upload.js'
import Censor from '../views/Censor.js'
import Checking from '../views/Checking.js'
import EditProfile from '../views/EditProfile.js'

const MediaStack = createStackNavigator() 
export const MediaStackScreen = () => {
  return(
    <MediaStack.Navigator 
      headerMode = 'none'
      initialRouteName = 'HomeTab'
      >
      <MediaStack.Screen 
        name="HomeTab" 
        component={HomeTabScreen} 
      />
      <MediaStack.Screen 
        name="Media" 
        component={Media} 
      />
      <MediaStack.Screen 
        name="Upload" 
        component={Upload} 
      />
      <MediaStack.Screen 
        name="Censor" 
        component={Censor} 
      />
      <MediaStack.Screen 
        name="Checking" 
        component={Checking} 
      />
      <MediaStack.Screen 
        name="EditProfile" 
        component={EditProfile} 
      />
    </MediaStack.Navigator>
  )
  
}