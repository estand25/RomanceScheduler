import { actions } from '../action/type'

const initialState = {
    scheduleList: [],
    schedule: {},
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
            console.log('SCHEDULE_ADD', state);
            console.log('SCHEDULE_ADD', state.scheduleList);
            console.log('SCHEDULE_ADD', initialState.scheduleList);
            console.log('SCHEDULE_ADD', action.schedule);
            
            var a = {
                ...state,
                schedule: action.schedule,
                scheduleList: [...initialState.scheduleList, action.schedule]
            }  
            

            return a            
        case actions.SCHEDULE_GET_ACTIVITIES:
            return {
                ...state,
                activityList: initialState.activityList
            }
        case actions.SCHEDULE_GET_ACTIONS:            
            return {
                ...state,
                actionList: initialState.actionList
            }
        case actions.SCHEDULE_GET_TYPES:                
            return {
                ...state,
                typeList: initialState.typeList
            }
        case actions.SCHEDULE_GET_ALL:
            return {
                ...state,
                scheduleList: state.scheduleList
            }
        default:
            return state
    }
}