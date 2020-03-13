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
import {getUserPost, getUser} from '../helpers/FileHandling.js'

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
        }
    }

    //list of actions on page
    actionOnRows = (itemId) => {
        switch (itemId) {
            case '1':
                this.navigateToEditProfile()
                
                break;
            case '2':
                alert('Coming soon')
                break;
            case '3':
                this.navigateToCensorList()
                break;
            case '4':
                this.signOutAction()
                break;
        }
    }

    getPostCount = async () => {
        let userPost = await getUserPost()
        return userPost.length
    }

    signOutAction = async () => {
        await Authentication.logout()
        this.props.navigation.navigate('Login')
    }
    navigateToHome = () => {
        this.props.navigation.navigate('Home')
    }

    navigateToEditProfile = () => {
        this.props.navigation.navigate('EditProfile')
    }

    navigateToCensorList = () => {
        this.props.navigation.navigate('Censor')
    }

    getUserInfo = async () => {
        let userObject = await getUser()
        let userFullnameObject = JSON.parse(userObject.full_name)
        let userFullname = userFullnameObject.fullname
        let userEmail = userObject.email
        let userInfo = {
            fullname: userFullname,
            email: userEmail
        }
        return userInfo
    }

    initScreen = async () => {
        let postCount = await this.getPostCount()
        let userInfo = await this.getUserInfo()
        this.setState({
            postCount: postCount,
            userFullname: userInfo.fullname,
            userEmail: userInfo.email
        })
        let isAdmin = await AsyncStorage.getItem('userIsAdmin')
        //check if user is admin. list of uncensored contents will show if user is admin
        if(isAdmin !=='true') {
        let profileFunctions = [
            {
                id : '1',
                icon: 'ios-settings',
                name: 'Edit password',
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
        this.setState({
            profileFunctions: profileFunctions
        })
        } else {
            let profileFunctions = [
            {
                id : '1',
                icon: 'ios-settings',
                name: 'Edit password',
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
        this.setState({
            profileFunctions: profileFunctions
        })
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
                                <Text style = {styles.usernameText}>{this.state.userFullname}</Text>
                                <Text style = {styles.addressText}>Somewhere on earth</Text>
                            </View>
                        </View>
                        <View style = {styles.additionalInfoContainer}>
                            <View style = {styles.phoneContainer}>
                                <Ionicons name = 'ios-call' color = '#7e7e7e' size = {20}/>
                                <Text style= {styles.additionalInfoText}>Tel: 0404444444</Text>
                            </View>
                            <View style = {styles.phoneContainer}>
                                <Ionicons name = 'ios-mail' color = '#7e7e7e' size = {20}/>
                                <Text style= {styles.additionalInfoText}>Email: </Text>
                                <Text style= {[styles.additionalInfoText, {marginLeft:0}]}>{this.state.userEmail}</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.statisticContainer}>
                        <View style = {styles.cellStatistic}>
                            <Text style = {styles.statisticNumber}>
                                {this.state.postCount}
                            </Text>
                            <Text style = {styles.statisticCount}>Posts</Text>
                        </View>
                        <View style = {[styles.cellStatistic, {borderLeftWidth: 1}]}>
                            <Text style = {styles.statisticNumber}>
                                {this.state.postCount}
                            </Text>
                            <Text style = {styles.statisticCount}>Posts</Text>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.profileFunctions}
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