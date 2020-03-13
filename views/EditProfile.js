import React, {Component} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import {StringText} from '../core/en.js'
import Header from './components/Header.js'
import {editPassword} from '../helpers/FileHandling.js'
import Warning from '../core/Warning.js'

export default class Upload extends Component {
    constructor() {
        super()
        this.state = {
            newPassword: '',
            confirmPassword: ''
        }
    }
    backToHome = () => {
        this.props.navigation.goBack()
    }

    edit = async () => {
        //if there are missing info
        if (!this.state.newPassword || !this.state.confirmPassword) {
            alert (Warning.UPLOAD_MISSING_INFORMATION)
        } else {
            //if 2 info not match
            if (this.state.newPassword !== this.state.confirmPassword) {
                alert(Warning.PASSWORD_NOT_MATCH)
            } else {
                let editAction = await editPassword(this.state.newPassword)
                switch (editAction.message) {
                    //success
                    case Warning.EDIT_USER_SUCCESS:
                        alert(Warning.EDIT_USER_SUCCESS)
                        this.props.navigation.goBack()
                        break;
                    //failed
                    case Warning.EDIT_USER_FAILED:
                        alert(Warning.EDIT_USER_FAILED)
                        this.props.navigation.goBack()
                        break;
                    default:
                        break;
                }
            }
        }
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
                                placeholder = 'New Password'
                                secureTextEntry = {true}
                                autoCapitalize = 'none'
                                onChangeText = {text => this.setState({newPassword: text})}
                            />
                        </View>
                        <View style = {styles.textInput}> 
                            <TextInput
                                style = {{width: '80%', height: '100%'}}
                                placeholder = 'Confirm password'
                                secureTextEntry = {true}
                                autoCapitalize = 'none'
                                onChangeText = {text => this.setState({confirmPassword: text})}
                            />
                        </View>
                        <TouchableOpacity style= {styles.signButton} onPress = {this.edit}>
                            <Text style = {styles.buttonText}>{StringText.confirm}</Text>
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