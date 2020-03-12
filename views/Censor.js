import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, AsyncStorage, FlatList} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import Header from './components/Header.js'
import Content from './components/Content.js'
import {
    getUserByUserId,
    getAllVideoByTag,
    getVideoScreenShot,
    getDescObject,
    handleContentList
} from '../helpers/FileHandling.js'
import {AppLoading} from 'expo'
import Linking from '../core/Linking.js'
import moment from 'moment'
import ContentList from './components/ContentList.js'

export default class Censor extends Component {
    constructor() {
        super()
        this.state = {
            isLoading : true,
            flatListData: [],
            listVideo: []
        }
    }

    handleFlatListData = async (listVideo) => {
        let flatListData = []
        let contentList = await handleContentList(listVideo)
        for (let i = 0; i<contentList.length; i++) {
            if(!contentList[i].censoredStatus) {
                flatListData.push(contentList[i])
            }
        }
        return flatListData.reverse()
    }

    initScreen = async () => {
        let listVideo = await getAllVideoByTag('KidsTube')
        let flatListData = await this.handleFlatListData(listVideo)
        this.setState({flatListData: flatListData})
    }

    onContentPress = (item) => {
        console.warn('asd')
        this.props.navigation.navigate('Media', {item: item})
    }

    backtoProfile = () => {
        this.props.navigation.navigate('Profile')
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
                    onIconButtonPressed = {this.backtoProfile}
                />
                <ContentList 
                    data = {this.state.flatListData}
                    onContentPress = {this.onContentPress}
                />
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
})