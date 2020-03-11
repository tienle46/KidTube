import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../views/Login.js'
import Registration from '../views/Registration.js'

const AuthStack = createStackNavigator() 
export const AuthStackScreen = () => {
  return(
    <AuthStack.Navigator headerMode = 'none'>
        <AuthStack.Screen 
          name="Login" 
          component={Login} 
          />
        <AuthStack.Screen 
          name="Registration" 
          component={Registration} 
          />
      </AuthStack.Navigator>
  )
  
}
