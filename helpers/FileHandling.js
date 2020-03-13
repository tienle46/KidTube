//getting necessary data for views
import {postData, getData, postFormData, putData} from './Fetching.js'
import Linking from '../core/Linking'
import {AsyncStorage} from 'react-native'
import moment from 'moment'

const getUserToken = async () => {
    return await AsyncStorage.getItem('token')
}

const getUser = async () => {
    let user = await AsyncStorage.getItem('user')
    return JSON.parse(user)
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

const handleContentList = async (listVideo) => {
        let contentList = []
        for (let i = 0; i < listVideo.length; i++) {
            let videoUrl = `${Linking.API_URL}${Linking.API_UPLOADS}/${listVideo[i].filename}`
            let videoId = listVideo[i].file_id
            let videoTitle = listVideo[i].title
            let videoScreenShotUrl = getVideoScreenShot(listVideo[i].filename)
            let videoDate = moment(listVideo[i].time_added).fromNow()
            let usernameObject = await getUserByUserId(listVideo[i].user_id)
            let username = usernameObject.username
            let descObject = await getDescObject(listVideo[i].file_id)
            let videoDescription = descObject.description
            let censoredStatus = descObject.censored
            let videoObject = {
                id: `${i}`,
                videoId: videoId,
                videoUrl: videoUrl,
                videoTitle: videoTitle,
                videoScreenShotUrl: videoScreenShotUrl,
                videoDate: videoDate,
                username: username,
                censoredStatus: censoredStatus,
                videoDescription: videoDescription
            }
            contentList.push(videoObject)
        }
        return contentList
    }

    const editPassword = async (password) => {
        let url = `${Linking.API_URL}${Linking.API_USERS}`
        let userToken = await getUserToken()
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': userToken
        }
        let params =`password=${password}`
        let editAction = await putData(url, headers,params)
        return editAction
    }

    const getUserPost = async () => {
        let user = await getUser()
        let userId = user.user_id
        let url = `${Linking.API_URL}${Linking.API_MEDIA}${Linking.API_USER}/${userId}`
        let getUserPostAction = await getData(url)
        return getUserPostAction
    }

export {
    getUserByUserId,
    getAllVideoByTag,
    getVideoScreenShot,
    getUserToken,
    getAllCommentByPostId,
    uploadVideo,
    addTag,
    getDescObject,
    handleContentList,
    editPassword,
    getUserPost,
    getUser
}