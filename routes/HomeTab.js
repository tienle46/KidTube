import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/Home.js'
import Profile from '../views/Profile.js'
import { Ionicons } from '@expo/vector-icons';
import {AppLoading} from 'expo'
import {AsyncStorage} from 'react-native'

const HomeTab = createBottomTabNavigator() 
export class HomeTabScreen extends Component{
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  initScreen = async () => {
    let userInfo = await AsyncStorage.getItem('user')
    let userObj = JSON.parse(userInfo)
    let fullnameObj = JSON.parse(userObj.full_name)
    if (fullnameObj.admin) {
      await AsyncStorage.setItem('userIsAdmin', 'true')
    }
  }

  render() {
    if (this.state.isLoading)
      return(
        <AppLoading
          startAsync = {this.initScreen}
          onFinish= {() => {
              this.setState({isLoading: false})
          }}
        />
      )
    else
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
}
