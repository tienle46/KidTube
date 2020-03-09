import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/Login.js'
import Registration from './views/Registration.js'

const AuthStack = createStackNavigator() 
const AuthStackScreen = () => {
  return(
    <AuthStack.Navigator>
        <AuthStack.Screen 
          name="Login" 
          component={Login} 
          options={{title: 'Sign In'}}
          />
        <AuthStack.Screen 
          name="Registration" 
          component={Registration} 
          options={{title: 'Sign Up'}}
          />
      </AuthStack.Navigator>
  )
  
}
export default function App() {
  return (
    <NavigationContainer>
      <AuthStackScreen/>
    </NavigationContainer>
  );
}

