import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import {StringText} from '../core/en.js'

const appIcon = require('../assets/images/kidtubeIcon.png')
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            signIn : true
        }
    }

    getButtonTextColor(input) {
        if (input === 'signin') {
            if(this.state.signIn) {
                return 'black'
            } else 
                return '#CDCDCD'
        } else if (input === 'signup') {
            if(!this.state.signIn) {
                return 'black'
            } else 
                return '#CDCDCD'
        }
        
    }

    render() {
        return(
            <View style = {styles.backgroundContainer}>
                <View style = {styles.headerContainer}>
                    <Image
                        style={styles.appIcon}
                        source={appIcon}
                    />
                    <Text style = {styles.title}>{StringText.welcome}</Text>
                    <Text style = {styles.instruction}>{StringText.authRequirement}</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <TouchableWithoutFeedback 
                        onPress = {() => this.setState({signIn: true})}
                    >
                        <Text 
                        style = {[styles.selectionText, {color: this.getButtonTextColor('signin')}]}
                        >Sign in</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress = {() => this.setState({signIn: false})}
                    >
                        <Text 
                        style = {[styles.selectionText, {color: this.getButtonTextColor('signup')}]}
                        >Sign up</Text>
                    </TouchableWithoutFeedback>
                </View>
                {this.state.signIn ? 
                <View style = {styles.signInContainer}>
                    <View style = {styles.textInput}> 
                        <TextInput
                            style = {{width: '80%', height: '100%'}}
                            placeholder = 'Email address'
                        />
                    </View>
                    <View style = {styles.textInput}> 
                        <TextInput
                            style = {{width: '80%', height: '100%'}}
                            placeholder = 'Password'
                        />
                    </View>
                    <TouchableOpacity style= {styles.signButton}>
                            <Text style = {styles.buttonText}>{StringText.signIn}</Text>
                    </TouchableOpacity>
                    <View style = {{height: hp('23%')}}/>
                </View> 
                : 
                <View style = {styles.signInContainer}>
                    <View style = {styles.textInput}> 
                        <TextInput
                            style = {{width: '80%', height: '100%'}}
                            placeholder = 'Email address'
                        />
                    </View>
                    <View style = {styles.textInput}> 
                        <TextInput
                            style = {{width: '80%', height: '100%'}}
                            placeholder = 'Password'
                        />
                    </View>
                    <View style = {styles.textInput}> 
                        <TextInput
                            style = {{width: '80%', height: '100%'}}
                            placeholder = 'Repeat Password'
                        />
                    </View>
                    <TouchableOpacity style= {styles.signButton}>
                            <Text style = {styles.buttonText}>{StringText.signUp}</Text>
                    </TouchableOpacity>
                    <View style = {{height: hp('14.8%')}}/>
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    headerContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: wp('100%'),
        height: hp('40%'),
        backgroundColor: '#FF4EB8'
    },
    signInContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        width: wp('75%'),
        height: hp('48%'),
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: hp('2%'),
        justifyContent: 'space-around',
        height: hp('10%'),
        width: wp('75%')
    },
    appIcon: {
        width: 150,
        height: 150,
        marginTop: wp('8%')
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 40,
        color: 'white',
        marginTop: wp('2%'),
        marginBottom: wp('2%')
        
    },
    instruction: {
        fontFamily: 'montserrat-light',
        fontSize: 15,
        color: 'white'
    },
    textInput: {
        height: '12%',
        width: '100%',
        backgroundColor: '#F2F2F2',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        
    },
    selectionText: {
        fontFamily: 'montserrat-bold',
        fontSize: 15,
        color: '#CDCDCD'
    },
    signButton: {
        height: '12%',
        width: '100%',
        backgroundColor: '#FF4EB8',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#FF4EB8",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    buttonText: {
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        color: 'white'
    }
})
