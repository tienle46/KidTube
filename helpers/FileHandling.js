import {postData, getData} from './Fetching.js'
import Linking from '../core/Linking'
import {AsyncStorage} from 'react-native'

const getUserToken = async () => {
    return await AsyncStorage.getItem('token')
}

const getUserByUserId = async (userId) => {
    let url = `${Linking.API_URL}${Linking.API_USERS}/${userId}`
    const userToken = await getUserToken()
    let userObject = await getData(url, {
        'x-access-token' : userToken 
    })
    return userObject
}

const getAllVideoByTag = async (tag) => {
    let url = `${Linking.API_URL}${Linking.API_TAGS}/${tag}`
    let videoList = await getData(url)
    return videoList
}

const getVideoScreenShot = (filename) => {
    let screenShotFileName = filename.split('.mp4').join('.png')
    let url = `${Linking.API_URL}${Linking.API_UPLOADS}/${screenShotFileName}`
    return url
}

const getAllCommentByPostId = async (postId) => {
    let url = `${Linking.API_URL}${Linking.API_COMMENTS}${Linking.API_FILE}/${postId}`
    let commentList = await getData(url)
    return commentList
}

export {
    getUserByUserId,
    getAllVideoByTag,
    getVideoScreenShot,
    getUserToken,
    getAllCommentByPostId
}