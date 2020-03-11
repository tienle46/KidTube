import React, {Component} from 'react'
import {StyleSheet, Text, View,TouchableWithoutFeedback} from 'react-native'
import Header from './components/Header.js'
import {AppLoading} from 'expo'
import { Video } from 'expo-av';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'

export default class Media extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true
        }
    }
    goBack = () => {
        this.props.navigation.goBack()
    }

    initScreen = () => {
        this.setState({videoInfo: this.props.route.params.item})
    }

    getButtonTextColor = (input) => {
        if (input === 'about') {
            if(this.state.signIn) {
                return 'black'
            } else 
                return '#CDCDCD'
        } else if (input === 'comment') {
            if(!this.state.signIn) {
                return 'black'
            } else 
                return '#CDCDCD'
        }
        
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
                    backButton = {true}
                    onBackButtonPress = {this.goBack}
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
                <View style = {styles.buttonContainer}>
                    <TouchableWithoutFeedback 
                        onPress = {() => this.setState({signIn: true})}
                    >
                        <Text 
                        style = {[styles.selectionText, {color: this.getButtonTextColor('about')}]}
                        >About</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress = {() => this.setState({signIn: false})}
                    >
                        <Text 
                        style = {[styles.selectionText, {color: this.getButtonTextColor('comment')}]}
                        >Comment</Text>
                    </TouchableWithoutFeedback>
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
        height: '30%'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: hp('2%'),
        justifyContent: 'space-around',
        height: hp('10%'),
        width: wp('75%')
    },
    selectionText: {
        fontFamily: 'montserrat-bold',
        fontSize: 15,
        color: '#CDCDCD'
    },
})