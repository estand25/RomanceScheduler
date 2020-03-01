import {actions} from './type'
import api from '../api'

export const addSchedule = (schedule) => ({
    type: actions.SCHEDULE_ADD,
    schedule
})

export const addScheduleError = (error) => ({
    type: actions.SCHEDULE_ADD_ERROR,
    payload: error
})

export const getScheduleActivites = () => ({
    type: actions.SCHEDULE_GET_ACTIVITIES
})

export const getScheduleActions = () => ({
    type: actions.SCHEDULE_GET_ACTIONS
})

export const getScheduleTypes = () => ({
    type: actions.SCHEDULE_GET_TYPES
})

export const getAllScheduleLoading = (bool) => ({
    type: actions.SCHEDULE_GET_ALL_LOADING,
    payload: bool
})

export const getAllScheduleError = (error) => ({
    type: actions.SCHEDULE_GET_ALL_ERROR,
    payload: error
})

export const getAllSchedule = (data) => ({
    type: actions.SCHEDULE_GET_ALL,
    payload: data
})

export const addScheduleToDb = (payload) =>{
    return async dispatch => {
        api.addSchedule(payload)
            .then(
                data => {
                        dispatch(addSchedule(data.data.data))
                    }
                )
            .catch(err => {
                dispatch(addScheduleError(err))
            })
    }
}

export const getSchedulesToDb = (payload) => {
    return async dispatch => {
        dispatch(getAllScheduleLoading(true))

        api.getAllSchedule(payload)
            .then(
                data => {
                    dispatch(getAllSchedule(data.data.data.filter(i => i.rUserId == payload.userId)))
                }
            )
            .catch(err => {
                dispatch(getAllScheduleError(err))
            })
    }
}

export const deleteScheduleToDb = (payload) => {
    return async dispatch => {
        dispatch(getAllScheduleLoading(true))
        
        await api.deleteSchedule(payload)
            .then(
                data => {
                    dispatch(getAllSchedule(data.data.data.filter(i => i.rUserId == payload.userId && r._id != payload._id)))
                }
            )
            .catch(err => {
                dispatch(getAllScheduleError(err))
            })
    }
}

export const updateScheduleToDb = (payload) => {
    return async dispatch => {
        dispatch(getAllScheduleLoading(true))

        await api.updateSchedule(payload)
            .then(
                data => {
                    dispatch(getAllSchedule(data.data.data.filter(i => i.rUserId == payload.userId)))
                }
            )
            .catch(err => {
                dispatch(getAllScheduleError(err))
            })
    }
}