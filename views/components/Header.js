import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../../helpers/ResponsiveHelper.js'
import { Ionicons } from '@expo/vector-icons';

export default class Header extends Component {

    render() {
        return(
            <View style = {styles.container}>
                <View style = {styles.headerContainer}>
                    {this.props.backButton ? 
                    <TouchableOpacity onPress = {this.props.onBackButtonPress}>
                        <Ionicons name = 'ios-arrow-back' color = 'white' size = {30}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress = {this.props.onHomeButtonPress}>
                        <Ionicons name = 'ios-home' color = 'white' size = {30}/>
                    </TouchableOpacity>
                    }
                    <Text style = {styles.logoText}>KidTube</Text>
                    <Ionicons name = 'ios-search' color = 'white' size = {30}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: wp('100%'),
        height: hp('11%'),
        backgroundColor: '#FF4EB8'
    },
    headerContainer: {
        // backgroundColor: 'black',
        marginBottom: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    logoText: {
        fontSize: 21,
        fontFamily: 'montserrat-bold',
        color: 'white'
    }
})