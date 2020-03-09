import React from 'react';
import {AuthStackScreen} from './routes/AuthStack.js'
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo'

const fetchFonts = () => {
    return Font.loadAsync({
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.otf'),
      'montserrat-regular': require('./assets/fonts/Montserrat-Regular.otf'),
      'montserrat-light': require('./assets/fonts/Montserrat-Light.otf'),
    });
  }
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  render() {
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
          <AuthStackScreen/>
        </NavigationContainer>
        );
    }
    
  }
  
}

