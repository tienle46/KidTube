import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity, AsyncStorage} from 'react-native'
import Header from './components/Header.js'
const blackImage = require('../assets/images/black.png')
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import { Ionicons } from '@expo/vector-icons';
import Authentication from '../helpers/Authentication.js'
import {AppLoading} from 'expo'
let profileFunctions = [
    {
        id : '1',
        icon: 'ios-heart-empty',
        name: 'My favorites',
        textColor: '#7e7e7e'
    },
    {
        id : '2',
        icon: 'ios-person',
        name: 'My videos',
        textColor: '#7e7e7e'
    },
    {
        id : '3',
        icon: 'ios-checkmark-circle-outline',
        name: 'Waiting for checking',
        textColor: '#7e7e7e'
    },
    {
        id : '4',
        icon: 'ios-power',
        name: 'Log out',
        textColor: '#FF4EB8'
    },
]

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
        }
    }
    actionOnRows = (itemId) => {
        switch (itemId) {
            case '1':
                
                break;
            case '2':
                
                break;
            case '3':
                this.navigateToCensorList()
                break;
            case '4':
                this.signOutAction()
                break;
        }
    }

    signOutAction = async () => {
        await Authentication.logout()
        this.props.navigation.navigate('Login')
    }
    navigateToHome = () => {
        this.props.navigation.navigate('Home')
    }

    navigateToCensorList = () => {
        this.props.navigation.navigate('Censor')
    }

    initScreen = async () => {
        let userInfo = await AsyncStorage.getItem('userIsAdmin')
        if(userInfo !=='true') {
            profileFunctions = [
    {
        id : '1',
        icon: 'ios-heart-empty',
        name: 'My favorites',
        textColor: '#7e7e7e'
    },
    {
        id : '2',
        icon: 'ios-person',
        name: 'My videos',
        textColor: '#7e7e7e'
    },
    {
        id : '4',
        icon: 'ios-power',
        name: 'Log out',
        textColor: '#FF4EB8'
    },
]
        }
    }

    render() {
        if (this.state.isLoading)
            return (
                <AppLoading
                    startAsync = {this.initScreen}
                    onFinish= {() => {
                        this.setState({isLoading: false})
                    }}
                />)
        else
            return(
                <View style = {styles.container}>
                    <Header
                        icon = 'home'
                        onIconButtonPressed = {this.navigateToHome}
                    />
                    <View style = {styles.profileInfoContainer}>
                        <View style = {styles.identityContainer}>
                            <Image source = {blackImage} style = {styles.profilePic}/>
                            <View style = {styles.nameAndAddress}>
                                <Text style = {styles.usernameText}>Le Minh Tien</Text>
                                <Text style = {styles.addressText}>Timpurinkuja 1 A 5, 02650, Espoo</Text>
                            </View>
                        </View>
                        <View style = {styles.additionalInfoContainer}>
                            <View style = {styles.phoneContainer}>
                                <Ionicons name = 'ios-call' color = '#7e7e7e' size = {20}/>
                                <Text style= {styles.additionalInfoText}>Tel: 0407379344</Text>
                            </View>
                            <View style = {styles.phoneContainer}>
                                <Ionicons name = 'ios-mail' color = '#7e7e7e' size = {20}/>
                                <Text style= {styles.additionalInfoText}>Email: </Text>
                                <Text style= {[styles.additionalInfoText, {marginLeft:0}]}>tienle4695@gmail.com</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.statisticContainer}>
                        <View style = {styles.cellStatistic}>
                            <Text style = {styles.statisticNumber}>
                                1234
                            </Text>
                            <Text style = {styles.statisticCount}>Posts</Text>
                        </View>
                        <View style = {[styles.cellStatistic, {borderLeftWidth: 1}]}>
                            <Text style = {styles.statisticNumber}>
                                1234
                            </Text>
                            <Text style = {styles.statisticCount}>Posts</Text>
                        </View>
                    </View>
                    <FlatList
                        data={profileFunctions}
                        scrollEnabled = {false}
                        renderItem = {({item}) => (
                            <TouchableOpacity style = {styles.optionListItem} onPress = {() => this.actionOnRows(item.id)}>
                                <Ionicons name = {item.icon} color = {item.textColor} size = {20}/>
                                <Text style = {[styles.optionListItemTitle, {color: item.textColor}]}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    profileInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '85%',
        height: '30%'
    },
    identityContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: '5%'
    },
    profilePic: {
        width: wp('20%'),
        aspectRatio: 1,
        borderRadius: wp('20%')/2,
        marginRight: '5%'
    },
    nameAndAddress: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: wp('20%'),
        width: '55%'
    },
    additionalInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '30%',
        width: '100%',
    },
    usernameText: {
        fontFamily: 'montserrat-bold',
        fontSize: 22,
        color: '#FF4EB8'
    },
    addressText: {
        fontFamily: 'montserrat-regular',
        fontSize: 15,
        color: '#7e7e7e'
    },
    phoneContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    additionalInfoText: {
        fontFamily: 'montserrat-regular',
        fontSize: 15,
        color: '#7e7e7e',
        marginLeft: '7%'
    },
    statisticContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: '10%',
        width: '100%',
        marginTop: '-5%',
        marginBottom: '5%'
    },
    cellStatistic: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#d2d2d2'
    },
    statisticNumber: {
        fontFamily: 'montserrat-bold',
        fontSize: 25,
        color: '#FF4EB8',
    },
    statisticCount: {
        fontFamily: 'montserrat-regular',
        fontSize: 20,
        color: '#7e7e7e',
    },
    optionListItem: {
        height: '70%',
        width: wp('100%'),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: wp('7.5%'),
        alignItems: 'center'
    },
    optionListItemTitle: {
        fontFamily: 'montserrat-bold',
        fontSize: 20,
        color: '#7e7e7e',
        marginLeft: '5%'
    }
})