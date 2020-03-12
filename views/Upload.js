import React, {Component} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import {StringText} from '../core/en.js'
import Authentication from '../helpers/Authentication.js'
import {postData, getData} from '../helpers/Fetching.js'
import Header from './components/Header.js'

export default class Upload extends Component {
    backToHome = () => {
        this.props.navigation.goBack()
    }
    render() {
        return(
            <View style = {styles.container}>
                <Header
                    icon = 'back'
                    onIconButtonPressed = {this.backToHome}
                />
                <View style = {styles.bodyContainer}>
                    <View style = {styles.formContainer}>
                        <View style = {styles.textInput}> 
                            <TextInput
                                style = {{width: '80%', height: '100%'}}
                                placeholder = 'Title'
                                autoCapitalize = 'none'
                                onChangeText = {text => this.setState({signInPassword: text})}
                            />
                        </View>
                        <View style = {styles.textInput}> 
                            <TextInput
                                style = {{width: '80%', height: '100%'}}
                                placeholder = 'Description'
                                autoCapitalize = 'none'
                                onChangeText = {text => this.setState({signInPassword: text})}
                            />
                        </View>
                        <TouchableOpacity>
                            <Text>{StringText.videoPicking}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style= {styles.signButton}>
                            <Text style = {styles.buttonText}>{StringText.upload}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    bodyContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: hp('89%')

    },
    formContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: '12.5%',
        paddingRight: '12.5%',
        height: hp('30%')
    },
    textInput: {
        height: '19.2%',
        width: '100%',
        backgroundColor: '#F2F2F2',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        
    },
    signButton: {
        height: '19.2%',
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