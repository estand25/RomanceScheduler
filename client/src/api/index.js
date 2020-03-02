import axios from 'axios'
import qs from 'qs'

const baseURL = '/api'

/**
 * Header component for api GET request with content
 * @param {*} token 
 */
export const createHeaderContent = (token) => {
    return {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
    }
}

/**
 * LogIn to the back-end server
 * @param {*} payload - Username and Password
 */
export const logIn = async (payload) => {
    return (
        axios({
            method: 'POST',
            url: baseURL + '/user/login',
            data: payload
        })
    )
}

/**
 * UpdatedAccount to update user information
 * @param {*} payload - Username, Password, and user email
 */
export const updateAccount = (payload) => {
    let headers = createHeaderContent(payload.token)

    return (
        axios({
            method: 'PATCH',
            url: baseURL + '/user/update/' + payload.userId,
            data: qs.stringify(payload),
            headers: headers
        })
    )
}

/**
 * addSchedule as a new schedule
 * @param {*} data - schedule infomation to create data payload
 */
export const addSchedule = (data) => {
    let headers = createHeaderContent(data.token)
    delete data.token

    return (
        axios({
            method: 'POST',
            url: baseURL + '/schedule/add',
            data: qs.stringify(data),
            headers: headers
        })
    )
}

/**
 * getAllSchedule retrieves all the users schedule
 * @param {*} payload - access token and user id
 */
export const getAllSchedule = (payload) => {
    let headers = createHeaderContent(payload.token)

    return (
        axios({
            method: 'GET',
            url: baseURL + '/schedule/',
            headers: headers
        })
    )
}

/**
 * update existing schedule 
 * @param {*} payload 
 */
export const updateSchedule = (payload) => {
    let headers = createHeaderContent(payload.token)
    delete payload.token

    return (
        axios({
            method: 'PATCH',
            url: baseURL + '/schedule/update',
            data: qs.stringify(payload),
            headers: headers
        })
    )
}

/**
 * delete existing schedule
 * @param {*} payload 
 */
export const deleteSchedule = async (payload) => {
    let headers = createHeaderContent(payload.token)
    delete payload.token
    
    return(
        axios({
            method: 'DELETE',
            url: baseURL + '/schedule/delete',
            data: qs.stringify(payload),
            headers: headers
        })
    )
}

/**
 * add new options to settings
 * @param {*} data 
 */
export const addSetting = (data) => {
    let headers = createHeaderContent(data.token)
    delete data.token

    return (
        axios({
            method: 'POST',
            url: baseURL + '/setting/add',
            data: qs.stringify(data),
            headers: headers
        })
    )
}

/**
 * retrieve all the setting
 * @param {*} data 
 */
export const getAllSetting = (data) => {
    let headers = createHeaderContent(data.token)
    delete data.token

    return (
        axios({
            method: 'GET',
            url: baseURL + '/setting/',
            data: qs.stringify(data),
            headers: headers
        })
    )
}

/**
 * update existing Setting 
 * @param {*} payload 
 */
export const updateSetting = (payload) => {
    let headers = createHeaderContent(payload.token)
    delete payload.token

    return (
        axios({
            method: 'PATCH',
            url: baseURL + '/setting/update',
            data: qs.stringify(payload),
            headers: headers
        })
    )
}

/**
 * delete existing setting
 * @param {*} payload 
 */
export const deleteSetting = async (payload) => {
    let headers = createHeaderContent(payload.token)
    delete payload.token
    
    return(
        axios({
            method: 'DELETE',
            url: baseURL + '/setting/delete',
            data: qs.stringify(payload),
            headers: headers
        })
    )
}

const api = {
    logIn,
    updateAccount,

    addSchedule,
    getAllSchedule,
    updateSchedule,
    deleteSchedule,
    
    addSetting,
    getAllSetting,
    updateSetting,
    deleteSetting
}

export default api