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

export const setAccountLogInError = (error) => ({
    type: actions.ACCOUNT_LOG_ERROR,
    payload: {
        error: error
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

        await api.logIn(payload)
            .then((data) => {
                if(data.status == 200 && data.data.message == 'User was successfully log-In'){       
                    dispatch(setAccountLog(true)) 
                    payload.userId = data.data.data.userId
                    payload.email = data.data.data.email                   
                    payload.token = data.data.data.accessToken
                    dispatch(setAccountLogIn(payload))
                } else {
                    dispatch(setAccountLogInError(data.data.message))
                }
            }).catch(error => {
                dispatch(setAccountLogInError(error))
            })
    }
}

export const updateAccountUserName = (username) => ({
    type: actions.ACCOUNT_UPDATE_USERNAME,
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

export const updateAccountError = (error) => ({
    type: actions.ACCOUNT_UPDATE_ERROR,
    error
})

export const updateAccount = (account) => {
    return async dispatch => {
        api.updateAccount(account)
            .then(data => {
                var { username, password, email } = data.data.data

                if(username){
                    dispatch(updateAccountUserName(username))
                }

                if(password){
                    dispatch(updateAccountPassword(password))
                }

                if(email){
                    dispatch(updateAccountEmail(email))
                }
            })
            .catch(error => {
                dispatch(updateAccountError(error))
            })
    }
}



