import { actions } from './type'

export const setAuthLog = (LogIn) => ({
    type: actions.AUTH_LOG,
    payload: LogIn
})

export const setAuthLogIn = (data) => ({
    type: actions.AUTH_LOG_IN,
    payload: data
})

export const setAuthLogOut = () => ({
    type: actions.AUTH_LOG_OUT
})

export const authLogIn = (username, password)  => {
    return dispatch => {
        dispatch(setAuthLog(false))

        const payload = {
            username: username,
            password: password
        }
        
        dispatch(setAuthLogIn(payload))
    }
}


