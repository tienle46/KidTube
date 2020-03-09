import React, {Component} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

const appIcon = require('../assets/images/kidtubeIcon.png')
export default class Login extends Component {

    render() {
        return(
            <View style = {styles.backgroundContainer}>
                <Image
                    style={{width: 150, height: 150}}
                    source={appIcon}
                />
                <Text style = {styles.title}>Hello</Text>
                <Text style = {styles.instruction}>You need to sign in or Create a new account</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#FF4EB8',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    appIcon: {
        width: 150,
        height: 150,
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 40,
        color: 'white',
        
    },
    instruction: {
        fontFamily: 'montserrat-light',
        fontSize: 15,
        color: 'white'
    }
})
