//screen for admin to approve video
import React, {Component} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import Header from './components/Header.js'
import {AppLoading} from 'expo'
import { Video } from 'expo-av';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import Comment from './components/Comment'
import {StringText} from '../core/en.js'

export default class Checking extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
        }
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    initScreen = async () => {
        await this.setState({videoInfo: this.props.route.params.item})
    }

    render() {
        if (this.state.isLoading) 
            return(
                <AppLoading
                    startAsync = {this.initScreen}
                    onFinish= {() => {
                        this.setState({isLoading: false})
                    }}
                />)
        else return(
            <View style = {styles.container}>
                <Header
                    icon = 'back'
                    onIconButtonPressed = {this.goBack}
                />

                <Video
                    source={{ uri: this.state.videoInfo.videoUrl}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    useNativeControls
                    style={styles.videoPlayer}
                />
                 <View style = {styles.titleContainer}>
                    <Text style = {styles.titleText}>{this.state.videoInfo.videoTitle}</Text>
                </View>
                <View style = {styles.actionContainer}>
                    <View style = {styles.infoContainer}>
                        <Text style = {styles.infoText}>{StringText.instruction}</Text>
                        <Text style = {styles.infoText}>{StringText.carefully}</Text>
                        <Text style = {styles.infoText}>{StringText.clickDelete}</Text>
                        <Text style = {styles.infoText}>{StringText.responsible}</Text>
                    </View>
                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity style= {styles.button} onPress = {()=>{}}>
                                <Text style = {styles.buttonText}>{StringText.confirm}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style= {[styles.button, {backgroundColor: '#CF1259', shadowColor: '#CF1259'}]} onPress = {()=>{}}>
                                <Text style = {styles.buttonText}>{StringText.delete}</Text>
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
    },
    videoPlayer: {
        width: '100%',
        height: hp('30%')
    },
    actionContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: hp('40%')
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: hp('8%'),
        paddingLeft: '5%',
        
    },
    titleText: {
        fontFamily: 'montserrat-bold',
        fontSize: 20,
        color: 'black'
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        height: hp('20%'),
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: '#CF1259',
    },
    infoText: {
        fontFamily: 'montserrat-bold',
        fontSize: 15,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '90%%',
        height: hp('15.5%'),
    },
    button: {
        height: '37.1%',
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