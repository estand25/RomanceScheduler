import { actions } from '../action/type'

const initialState = {
    validUser: false,
    username: '',
    userId: '',
    userLoading: false,
    error: '',
    email: '',
    password: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.ACCOUNT_LOG:
            return {
                ...state,
                validUser: action.payload
            }
        case actions.ACCOUNT_LOG_IN: {
            return {
                ...state,
                validUser: true,
                username: action.payload.username,
                userId: action.payload.userId,
                userLoading: false,
                error: '',
                email: action.payload.email,
                password: action.payload.password
            }
        }
        case actions.ACCOUNT_LOG_OUT: {
            return {
                ...state,
                validUser: false,
                username: '',
                userId: '',
                userLoading: false,
                error: '',
                email: '',
                password: ''
            }
        }
        case actions.ACCOUNT_UPDATE_USENAME:{
            return {
                ...state,
                username: action.username
            }
        }
        case actions.ACCOUNT_UPDATE_EMAIL:{
            return {
                ...state,
                email: action.email
            }
        }
        case actions.ACCOUNT_UPDATE_PASSWORD:{
            return {
                ...state,
                password: action.password
            }
        }
        default:
            return state
    }
}