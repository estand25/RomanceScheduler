import { actions } from '../action/type'

const initialState = {
    resultList: [],
    typeList: [],
    activityStr: '',
    actionStr: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SETTING_GET_ALL:
            var a = {
                ...state,
                resultList: action.payload.filter(i => i.rType == 'activity' || i.rType == 'action'),
                activityStr: action.payload.map((activity) => {
                    if(activity.rType == 'activity'){
                        return activity.value 
                    }
                }).filter(i => i != undefined),
                actionStr: action.payload.map((action) => {
                    if(action.rType == 'action'){
                        return action.value
                    }
                }).filter(i => i != undefined),
                typeList: action.payload.filter(i => i.rType == 'option')
            }
            return a
        default:
            return state;
    }
}