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
        case actions.AUTH_LOG:
            return {
                ...state,
                validUser: action.payload
            }
        case actions.AUTH_LOG_IN: {
            var a = {
                ...state,
                validUser: true,
                username: action.payload.username,
                userId: '',
                userLoading: false,
                error: '',
                email: '',
                password: ''
            }
            
            return a
        }
        case actions.AUTH_LOG_OUT: {
            var b = {
                ...state,
                validUser: false,
                username: '',
                userId: '',
                userLoading: false,
                error: '',
                email: '',
                password: ''
            }
            
            return b
        }
        default:
            return state
    }
}