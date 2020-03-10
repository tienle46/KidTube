import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../../helpers/ResponsiveHelper.js'
const testThumbnail = require('../../assets/images/kidtubeIcon.png')
const blackImage = require('../../assets/images/black.png')

export default class Content extends Component {

    render() {
        return(
            <View style = {styles.container}>
                <Image source = {blackImage} style = {styles.thumbnail}/>
                <View style = {styles.informationContainer}>
                    <Image source = {blackImage} style = {styles.userImage}/>
                    <View style = {styles.contentInformation}>
                        <Text style = {styles.contentName}>ASKJDASNASNDASD</Text>
                        <Text style = {styles.contentInfo}>ASKJDASNASNDASD . sjka. sds</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: wp('100%'),
        height: hp('30%'),
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: hp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    thumbnail: {
        width: '100%',
        height: '70%'
    },
    informationContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '90%',
        height: '30%',
    },
    userImage: {
        height: 45,
        width: 45,
        borderRadius: 45/2
    },
    contentInformation: {
        marginLeft: '3%',
        width: '80%',
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    contentName: {
        fontFamily: 'montserrat-semibold',
        fontSize: 15
    },
    contentInfo: {
        fontFamily: 'montserrat-regular',
        fontSize: 13,
        color: '#9e9e9e'
    }
})