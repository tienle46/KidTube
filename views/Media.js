import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Header from './components/Header.js'

export default class Media extends Component {

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return(
            <Header
                backButton = {true}
                onBackButtonPress = {this.goBack}
            />
        )
    }
}