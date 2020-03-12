import React, {Component} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import {StringText} from '../core/en.js'
import Header from './components/Header.js'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import {uploadVideo} from '../helpers/FileHandling.js'
import Warning from '../core/Warning.js'

export default class Upload extends Component {
    constructor() {
        super()
        this.state = {
            video: {},
            description: '',
            title: ''
        }
    }
    backToHome = () => {
        this.props.navigation.goBack()
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!')
            }
        }
    }

    upload = async () => {
        if (!this.state.video || !this.state.title || !this.state.description) {
            alert (Warning.UPLOAD_MISSING_INFORMATION)
        } else {
            let uploadAction = await uploadVideo(this.state.video, this.state.title, this.state.description)
        
            if(uploadAction.message === 'File uploaded') {
                alert(Warning.UPLOAD_SUCCESS)
                this.props.navigation.push('HomeTab')
            } else 
                alert('UPLOAD_ERROR')
        }
    }

    handleDescription = (description) => {
        let finalDescription = new FormData()
        let descriptionObject = {
            description: description,
            censored: false
        }
        finalDescription.append('description', JSON.stringify(descriptionObject))
        return finalDescription
    }

    _pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 0.7
        });
        if (!result.cancelled) {
            console.log(result)
            this.setState({ video: result });
        }
    };
    componentDidMount() {
        this.getPermissionAsync();
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
                                onChangeText = {text => this.setState({title: text})}
                            />
                        </View>
                        <View style = {styles.textInput}> 
                            <TextInput
                                style = {{width: '80%', height: '100%'}}
                                placeholder = 'Description'
                                autoCapitalize = 'none'
                                onChangeText = {text => this.setState({description: this.handleDescription(text)})}
                            />
                        </View>
                        <TouchableOpacity onPress = {this._pickVideo}>
                            <Text style = {[styles.buttonText, {color: 'black'}]}>{StringText.videoPicking}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style= {styles.signButton} onPress = {this.upload}>
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