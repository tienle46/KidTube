import {postData} from './Fetching.js'
import Linking from '../core/Linking.js'
import Warning from '../core/Warning.js'
import {AsyncStorage} from 'react-native'
const Authentication = {
    login : async (username, password) => {
        const loginURL = `${Linking.API_URL}${Linking.API_LOGIN}`
        const loginAction = await postData(loginURL, {'Content-Type': 'application/x-www-form-urlencoded'},`username=${username}&password=${password}`)
        return handleLoginStatus(loginAction)
    },
}

const handleLoginStatus = (data) => {
    switch(data.message) {
        case Warning.LOGIN_SUCCESS:
            // alert('logged in')
            saveLoginData(data.token, data.user)
            return (data)
        case Warning.LOGIN_FAILED_USERNAME:
            alert('Please check your username!')
            return null
        case Warning.LOGIN_FAILED_PASSWORD:
            alert('Wrong password. Please check your password!')
            return null
    }
}

const saveLoginData = async (token, user) => {
    try {
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch(e) {
        console.warn(e)
    }
}
export default Authentication
