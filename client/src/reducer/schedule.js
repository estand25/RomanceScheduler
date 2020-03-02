import { actions } from '../action/type'

const initialState = {
    scheduleList: [],
    schedule: {},
    schedulesLoading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SCHEDULE_ADD:
            var a = {
                ...state,
                schedule: action.schedule,
                scheduleList: [...initialState.scheduleList, action.schedule]
            }
        
            return a            
        case actions.SCHEDULE_GET_ALL_LOADING:
            return {
                ...state,
                schedulesLoading: action.payload
            }
        case actions.SCHEDULE_GET_ALL:
            return {
                ...state,
                scheduleList: action.payload,
                schedulesLoading: false
            }
        case actions.SCHEDULE_GET_ALL_ERROR:
            return {
                ...state,
                schedulesLoading: action.payload,
                schedulesLoading: false
            }
        default:
            return state
    }
}