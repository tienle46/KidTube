import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/Home.js'
import Profile from '../views/Profile.js'
import { Ionicons } from '@expo/vector-icons';

const HomeTab = createBottomTabNavigator() 
export const HomeTabScreen = () => {
  return(
    <HomeTab.Navigator 
      headerMode = 'none'
      initialRouteName = 'Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home'
          } else if (route.name === 'Profile') {
            iconName = 'ios-person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF4EB8',
        inactiveTintColor: 'gray',
      }}
    >
        <HomeTab.Screen 
          name="Home" 
          component={Home} 
          />
        <HomeTab.Screen 
          name="Profile" 
          component={Profile} 
          />
      </HomeTab.Navigator>
  )
  
}
