import React, {Component} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../../helpers/ResponsiveHelper.js'
const blackImage = require('../../assets/images/black.png')

export default class Content extends Component {
    render() {
        return(
            <View style = {styles.container}>
                <Image source = {blackImage} style = {styles.userImage}/>
                <View style = {styles.infoContainer}>
                    <Text style = {styles.usernameText}>{this.props.username}</Text>
                    <Text style = {styles.commentText}>{this.props.comment}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: hp('7%'),
    },
    userImage: {
        height: 45,
        width: 45,
        borderRadius: 45/2
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '80%',
        height: 45,
        marginLeft: '5%'
    },
    usernameText: {
        fontFamily: 'montserrat-bold',
        fontSize: 15,
        color: '#FF4EB8'
    },
    commentText: {
        fontFamily: 'montserrat-regular',
        fontSize: 13,
        color: 'black'
    }
})