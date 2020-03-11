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
    getVideoScreenShot
} from '../helpers/FileHandling.js'
import {AppLoading} from 'expo'
import Linking from '../core/Linking.js'
import moment from 'moment'

export default class Home extends Component {
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
        for (let i = 0; i < listVideo.length; i++) {
            let videoUrl = `${Linking.API_URL}${Linking.API_UPLOADS}/${listVideo[i].filename}`
            let videoTitle = listVideo[i].title
            let videoScreenShotUrl = getVideoScreenShot(listVideo[i].filename)
            let videoDate = moment(listVideo[i].time_added).fromNow()
            let usernameObject = await getUserByUserId(listVideo[i].user_id)
            let username = usernameObject.username
            let videoObject = {
                id: `${i}`,
                videoUrl: videoUrl,
                videoTitle: videoTitle,
                videoScreenShotUrl: videoScreenShotUrl,
                videoDate: videoDate,
                username: username
            }
            flatListData.push(videoObject)
        }
        return flatListData.reverse()
    }

    initScreen = async () => {
        let listVideo = await getAllVideoByTag('kidtube')
        let flatListData = await this.handleFlatListData(listVideo)
        this.setState({flatListData: flatListData})
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
                <Header/>
                <FlatList
                    data = {this.state.flatListData}
                    renderItem = {({item}) => (
                        <Content
                            filename = {item.videoTitle}
                            username = {item.username}
                            timeUploaded = {item.videoDate}
                            thumbnailSource = {item.videoScreenShotUrl}
                        />
                    )}
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
    headerContainer: {

    }
})