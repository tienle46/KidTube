import {postData} from './Fetching.js'
import Linking from '../core/Linking.js'
import Warning from '../core/Warning.js'
import {getUserToken} from './FileHandling.js'

//handle action post a new comment
const postNewComment = async (fileId, comment) => {
    let url = `${Linking.API_URL}${Linking.API_COMMENTS}/`
    const userToken = await getUserToken()
    let params = `file_id=${fileId}&comment=${comment}`
    const postCommentAction = await postData(url, {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token' : userToken
        },params)
    return handlePostComment(postCommentAction)
}

//output of the action
const handlePostComment = (data) => {
    switch (data.message) {
        case Warning.COMMENT_SUCCESS:
            return true
        default:
            return false
    }
}

export {
    postNewComment
}