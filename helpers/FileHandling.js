import {postData, getData, postFormData} from './Fetching.js'
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

const getDescObject = async (fileId) => {
    let url = `${Linking.API_URL}${Linking.API_MEDIA}/${fileId}`
    let fileInfo = await getData(url)
    let descObject = JSON.parse(fileInfo.description)
    console.log(descObject)
    return descObject
}

const getVideoScreenShot = (filename) => {
    const match = /\.(\w+)$/.exec(filename)
    let screenShotFileName = filename.split(match[0]).join('.png')
    let url = `${Linking.API_URL}${Linking.API_UPLOADS}/${screenShotFileName}`
    return url
}

const getAllCommentByPostId = async (postId) => {
    let url = `${Linking.API_URL}${Linking.API_COMMENTS}${Linking.API_FILE}/${postId}`
    let commentList = await getData(url)
    return commentList
}

const uploadVideo = async (file, title, description) => {
    let url = `${Linking.API_URL}${Linking.API_MEDIA}`
    const filename = file.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `video/${match[1]}` : `video`;
    let body = new FormData()
    body.append('title', title)
    body.append('description', description)
    body.append('file', {uri: file.uri, name: filename, type});
    let userToken = await getUserToken()
    let headers = {
        'x-access-token': userToken
    }
    const uploadAction = await postFormData(url, headers,body)
    return uploadAction
}

const addTag = async (fileId) => {
    let url = `${Linking.API_URL}${Linking.API_TAGS}`
    let userToken = await getUserToken()
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': userToken
    }
    let params = `file_id=${fileId}&tag=KidsTube`
    const addTagAction = await postData(url, headers,params)
    return addTagAction
}

export {
    getUserByUserId,
    getAllVideoByTag,
    getVideoScreenShot,
    getUserToken,
    getAllCommentByPostId,
    uploadVideo,
    addTag,
    getDescObject
}