import { actions } from './type'
import api from'../api'

export const setAccountLog = (LogIn) => ({
    type: actions.ACCOUNT_LOG,
    payload: LogIn
})

export const setAccountLogIn = (data) => ({
    type: actions.ACCOUNT_LOG_IN,
    payload: data
})

export const setAccountLogInError = (data) => ({
    type: actions.ACCOUNT_LOG_ERROR,
    payload: {
        error: data
    }
})

export const setAccountLogOut = () => ({
    type: actions.ACCOUNT_LOG_OUT
})

export const AccountLogIn = (username, password)  => {
    return async dispatch => {
        dispatch(setAccountLog(false))

        const payload = {
            username: username,
            password: password
        }

        api.logIn(payload)
            .then((data) => {
                if(data.status == 200){       
                    dispatch(setAccountLog(true))
                    payload.token = data.data.data.accessToken
                    dispatch(setAccountLogIn(payload))
                }
            }).catch(error => {
                dispatch(setAccountLogInError(error))
            })
    }
}

export const updateAccountUserName = (username) => ({
    type: actions.ACCOUNT_UPDATE_USENAME,
    username
})

export const updateAccountPassword = (password) => ({
    type: actions.ACCOUNT_UPDATE_PASSWORD,
    password
})

export const updateAccountEmail = (email) => ({
    type: actions.ACCOUNT_UPDATE_EMAIL,
    email
})

export const updateAccount = (username, password, email) => {
    return async dispatch => {
        if(username){
            dispatch(updateAccountUserName(username))
        }

        if(password){
            dispatch(updateAccountPassword(password))
        }

        if(email){
            dispatch(updateAccountEmail(email))
        }
    }
}



