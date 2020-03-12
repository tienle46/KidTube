import React from 'react';
import {AppStackScreen} from './routes/AppStack.js'
import {HomeTabScreen} from './routes/HomeTab.js'
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo'
import {AsyncStorage} from 'react-native'
import {MediaStackScreen} from './routes/MediaStack.js'

//Async function to add custom fonts into application

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
    }
  }

  fetchFonts =  () => {
    return  Font.loadAsync({
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.otf'),
      'montserrat-regular': require('./assets/fonts/Montserrat-Regular.otf'),
      'montserrat-light': require('./assets/fonts/Montserrat-Light.otf'),
      'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.otf'),
    });
  }

  loading = async () => {
    await this.fetchFonts()
  }

  render() {
    //Get time for the fonts to load
    if(this.state.isLoading) {
      return (
        <AppLoading
          startAsync = {this.loading}
          onFinish= {() => {
            this.setState({isLoading: false})
          }}
        />
      )
    } else {
      return (
        <NavigationContainer>
          <AppStackScreen/>
        </NavigationContainer>
        );
    }
    
  }
  
}

