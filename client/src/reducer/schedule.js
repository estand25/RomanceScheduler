import { actions } from '../action/type'

const initialState = {
    scheduleList: [],
    schedule: {},
    schedulesLoading: false,
    resultList: [
        {value: 'movienight', label: 'Movie Night'},
        {value: 'parkwalk', label: 'Park Walk'},
        {value: 'inhomedinner', label: 'In-Home Dinner'},
        {value: 'restaurants', label: 'Restaurants'},
        {value: 'flowers', label: 'Flowers'},
        {value: 'nothingbundtcake', label: 'Nothing Bundt Cake'},
        {value: 'wine', label: 'Wine'}
    ],
    activityStr: 'flowers,nothingbundtcake,wine',
    actionStr: 'movienight,parkwalk,inhomedinner,restaurants',
    activityList: [
        {value: 'movienight', label: 'Movie Night'},
        {value: 'parkwalk', label: 'Park Walk'},
        {value: 'inhomedinner', label: 'In-Home Dinner'},
        {value: 'restaurants', label: 'Restaurants'}
    ],
    actionList: [
        {value: 'flowers', label: 'Flowers'},
        {value: 'nothingbundtcake', label: 'Nothing Bundt Cake'},
        {value: 'wine', label: 'Wine'}
    ],
    typeList: [
        {value: 'activity', label: 'Activity'},
        {value: 'action', label: 'Action'}
    ]
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
        case actions.SCHEDULE_GET_ACTIVITIES:
            return {
                ...state,
                activityList: initialState.activityList,
                activityStr: initialState.activityStr,
                resultList: initialState.resultList
            }
        case actions.SCHEDULE_GET_ACTIONS:            
            return {
                ...state,
                actionList: initialState.actionList,
                actionStr: initialState.actionStr,
                resultList: initialState.resultList
            }
        case actions.SCHEDULE_GET_TYPES:                
            return {
                ...state,
                typeList: initialState.typeList
            }
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