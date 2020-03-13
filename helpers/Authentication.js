import {postData} from './Fetching.js'
import Linking from '../core/Linking.js'
import Warning from '../core/Warning.js'
import {AsyncStorage} from 'react-native'

//Handling login, signup and signout
const Authentication = {
    login : async (username, password) => {
        const loginURL = `${Linking.API_URL}${Linking.API_LOGIN}`
        let params = `username=${username}&password=${password}`
        const loginAction = await postData(loginURL, {'Content-Type': 'application/x-www-form-urlencoded'},params)
        return handleLoginStatus(loginAction)
    },
    signUp: async (username, password, email, fullname) => {
        const signUpURL = `${Linking.API_URL}${Linking.API_USERS}`
        let fullnameObj = {
            fullname: fullname,
            admin: false
        }
        let fullnameParam = JSON.stringify(fullnameObj)
        let params = `username=${username}&password=${password}&email=${email}&full_name=${fullnameParam}`
        const signUpAction = await postData(signUpURL, {'Content-Type': 'application/x-www-form-urlencoded'},params)
        return handleSignUpStatus(signUpAction, username)
    },
    logout: async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('userIsAdmin')
    }
}

//output of signup action
const handleSignUpStatus = (data, username) => {
    switch(data.message) {
        case Warning.SIGNUP_SUCCESS:
            return true
        case Warning.SIGNUP_FAIL:
            switch(data.error) {
                case Warning.SIGNUP_ERROR_INVALID_USERNAME:
                    alert(Warning.SIGNUP_ERROR_INVALID_USERNAME)
                    break
                case Warning.SIGNUP_ERROR_INVALID_PASSWORD:
                    alert(Warning.SIGNUP_ERROR_INVALID_PASSWORD)
                    break
                case Warning.SIGNUP_ERROR_INVALID_EMAIL:
                    alert(Warning.SIGNUP_ERROR_INVALID_EMAIL)
                    break
                case `ER_DUP_ENTRY: Duplicate entry '${username}' for key 'username'`:
                    alert(Warning.SIGNUP_ERROR_DUPLICATE_USERNAME)
                    break
            }
            return false
    }
}

//output of signin action
const handleLoginStatus = async  (data) => {
    switch(data.message) {
        case Warning.LOGIN_SUCCESS:
            await saveLoginData(data.token, data.user)
            return (data)
        case Warning.LOGIN_FAILED_USERNAME:
            alert('Please check your username!')
            return null
        case Warning.LOGIN_FAILED_PASSWORD:
            alert('Wrong password. Please check your password!')
            return null
    }
}

//save user token and user data for use later
const saveLoginData = async (token, user) => {
    try {
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch(e) {
        console.warn(e)
    }
}
export default Authentication
