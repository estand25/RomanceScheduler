import axios from 'axios'

const baseURL = 'http://localhost:3000'

/**
 * Header component for api GET request with content
 * @param {*} token 
 */
export const createHeaderContent = (token) => {
    return {
        "Authorization": "Bear " + token,
        "Content-Type": "application/x-www-form-urlencoded"
    }
}

export const logIn = (payload) => {
    return (
        axios({
            method: 'POST',
            url: baseURL + '/user/login',
            data: payload
        })
    )
}

const apis = {
    logIn
}

export default apis