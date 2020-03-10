import React from 'react';
import {AppStackScreen} from './routes/AppStack.js'
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo'

//Async function to add custom fonts into application
const fetchFonts = () => {
    return Font.loadAsync({
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.otf'),
      'montserrat-regular': require('./assets/fonts/Montserrat-Regular.otf'),
      'montserrat-light': require('./assets/fonts/Montserrat-Light.otf'),
      'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.otf'),
    });
  }
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
    }
  }

  render() {
    //Get time for the fonts to load
    if(this.state.isLoading) {
      return (
        <AppLoading
          startAsync = {fetchFonts}
          onFinish= {() => this.setState({isLoading: false})}
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

