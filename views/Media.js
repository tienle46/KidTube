import React, {Component} from 'react'
import {StyleSheet, Text, View,TouchableWithoutFeedback, TextInput, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import Header from './components/Header.js'
import {AppLoading} from 'expo'
import { Video } from 'expo-av';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import Comment from './components/Comment'
import {postNewComment} from '../helpers/CommentHelper'
import {getAllCommentByPostId, getUserByUserId} from '../helpers/FileHandling'

export default class Media extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            commentOrAbout: true,
            comment: ''
        }
    }
    goBack = () => {
        this.props.navigation.goBack()
    }

    loadComment = async () => {
        let commentList = await getAllCommentByPostId(this.state.videoInfo.videoId)
        let commentFlatListData = await this.handleCommentList(commentList)
        this.setState({commentFlatListData: commentFlatListData})
    }

    initScreen = async () => {
        await this.setState({videoInfo: this.props.route.params.item})
        await this.loadComment()
    }

    handleCommentList = async (commentList) => {
        let commentFlatListData = []
        for (let i = 0; i < commentList.length; i++) {
            let id = `${i}`
            let comment = commentList[i].comment
            let usernameObject = await getUserByUserId(commentList[i].user_id)
            let username = usernameObject.username
            let commentObject = {
                id : id,
                comment : comment,
                username : username
            }
            commentFlatListData.push(commentObject)
        }
        return commentFlatListData.reverse()
    } 

    getButtonTextColor = (input) => {
        if (input === 'about') {
            if(this.state.commentOrAbout) {
                return 'black'
            } else 
                return '#CDCDCD'
        } else if (input === 'comment') {
            if(!this.state.commentOrAbout) {
                return 'black'
            } else 
                return '#CDCDCD'
        }
        
    }

    onSubmitCommentButtonPressed = async () => {
        let postComment = await postNewComment(this.state.videoInfo.videoId, this.state.comment)
        await this.loadComment()
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
                <View style = {styles.buttonContainer}>
                    <TouchableWithoutFeedback 
                        onPress = {() => this.setState({commentOrAbout: true})}
                    >
                        <Text 
                        style = {[styles.selectionText, {color: this.getButtonTextColor('about')}]}
                        >About</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress = {() => this.setState({commentOrAbout: false})}
                    >
                        <Text 
                        style = {[styles.selectionText, {color: this.getButtonTextColor('comment')}]}
                        >Comment</Text>
                    </TouchableWithoutFeedback>
                </View>
                {this.state.commentOrAbout ? 
                <View style = {styles.commentContainer}>
                    <Text style = {styles.infoText}>Published by {this.state.videoInfo.username} {this.state.videoInfo.videoDate}</Text>
                    <Text style = {styles.infoText}>About video: {this.state.videoInfo.videoDescription}</Text>
                </View>
                : 
                <View style = {styles.commentContainer}>
                    <View style = {styles.commentInputContainer}>
                        <TextInput
                            ref = 'comment'
                            style = {styles.commentBox}
                            placeholder = {'Write a comment'}
                            onChangeText = {text => this.setState({comment: text})}
                            onSubmitEditing = {() => {
                                this.onSubmitCommentButtonPressed()
                                this.refs.comment.clear()
                                }}
                        />
                    </View>
                    <FlatList
                        data = {this.state.commentFlatListData}
                        renderItem = {({item}) => (
                            <Comment 
                                username = {item.username}
                                comment = {item.comment}

                            />
                        )}
                    />
                </View>
                }
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: hp('5%'),
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#CDCDCD'
    },
    selectionText: {
        fontFamily: 'montserrat-bold',
        fontSize: 15,
        color: '#CDCDCD'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: hp('5%'),
        paddingLeft: '5%',
        
    },
    titleText: {
        fontFamily: 'montserrat-bold',
        fontSize: 20,
        color: 'black'
    },
    commentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: hp('50%'),
        paddingLeft: '5%',
        paddingTop: '5%',
        paddingRight: '5%'
    },
    infoText: {
        fontFamily: 'montserrat-regular',
        fontSize: 15,
        color: 'black',
        marginBottom: '4%',
        lineHeight: 15
    },
    commentBox: {
        width: '100%',
        height: hp('5%'),
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#9e9e9e',
        borderRadius: 5,
        marginBottom: '5%'
    },
    commentInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: hp('5%'),
    },
    sendButton:{
        height: '100%',
        width: '15%',
        backgroundColor: '#FF4EB8',
        borderRadius: 5
    }
})