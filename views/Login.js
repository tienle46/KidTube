import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import {StringText} from '../core/en.js'
import Authentication from '../helpers/Authentication.js'
import {postData, getData} from '../helpers/Fetching.js'
import {AppLoading} from 'expo'
import Warning from '../core/Warning.js'

const appIcon = require('../assets/images/kidtubeIcon.png')
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            signIn : true,
            isLoading: true
        }
    }

    getButtonTextColor = (input) => {
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

    onSignInButtonPressed = async () => {
        let login = await Authentication.login(this.state.signInUsername,this.state.signInPassword)
        if(login)
            this.props.navigation.navigate('MediaStack')
    }

    initScreen = async () => {
        let token = await AsyncStorage.getItem('token')
        (token)
        if(token) {
            this.props.navigation.navigate('MediaStack')
        }
    }

    onSignUpButtonPressed = async () => {
        if(!this.state.confimedPassword)
            alert(Warning.PASSWORD_NOT_MATCH)
        let signUp = await Authentication.signUp(this.state.signUpUsername, this.state.signUpPassword, this.state.signUpUsername, this.state.signUpFullname)
        if (signUp) {
            let login = await Authentication.login(this.state.signUpUsername,this.state.signUpPassword)
            if(login)
                this.props.navigation.navigate('MediaStack')
        }
    }

    render() {
        if(this.state.isLoading) {
            return(
                <AppLoading
                    startAsync = {this.initScreen}
                    onFinish= {() => {
                        this.setState({isLoading: false})
                    }}
                />
            )
        } else {
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
                            placeholder = 'Username'
                            autoCapitalize = 'none'
                            onChangeText = {text => this.setState({signInUsername: text})}
                        />
                    </View>
                    <View style = {styles.textInput}> 
                        <TextInput
                            style = {{width: '80%', height: '100%'}}
                            placeholder = 'Password'
                            autoCapitalize = 'none'
                            secureTextEntry = {true}
                            onChangeText = {text => this.setState({signInPassword: text})}
                        />
                    </View>
                    <TouchableOpacity style= {styles.signButton} onPress = {this.onSignInButtonPressed}>
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
                            autoCapitalize = 'none'
                            onChangeText = {text => this.setState({signUpUsername: text})}
                        />
                    </View>
                    <View style = {styles.textInput}> 
                        <TextInput
                            style = {{width: '80%', height: '100%'}}
                            placeholder = 'Full name'
                            autoCapitalize = 'none'
                            onChangeText = {text => this.setState({signUpFullname: text})}
                        />
                    </View>
                    <View style = {styles.textInput}> 
                        <TextInput
                            style = {{width: '80%', height: '100%'}}
                            placeholder = 'Password'
                            autoCapitalize = 'none'
                            secureTextEntry = {true}
                            onChangeText = {text => this.setState({signUpPassword: text})}
                        />
                    </View>
                    <View style = {styles.textInput}> 
                        <TextInput
                            style = {{width: '80%', height: '100%'}}
                            placeholder = 'Repeat Password'
                            autoCapitalize = 'none'
                            secureTextEntry = {true}
                            onChangeText = {text => {
                                if (text === this.state.signUpPassword) 
                                    this.setState({confimedPassword: true})
                                else this.setState({confimedPassword: false})
                            }}
                        />
                    </View>
                    <TouchableOpacity style= {styles.signButton} onPress = {this.onSignUpButtonPressed}>
                            <Text style = {styles.buttonText}>{StringText.signUp}</Text>
                    </TouchableOpacity>
                    <View style = {{height: hp('6.8%')}}/>
                </View>}
            </View>
        )
        }
        
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
