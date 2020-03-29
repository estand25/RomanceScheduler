import { actions } from './type'
import api from '../api'
import { getAllScheduleError } from './schedule-action'

export const addSettingAll = (result) => ({
    type: actions.SETTING_ADD_ALL,
    payload: result
})

export const addSettingError = (error) => ({
    type: actions.SETTING_ADD_ERROR,
    error: error
})

export const addSettingLoading = (bool) => ({
    type: actions.SETTING_ADD_LOADING,
    payload: bool
})

export const getSettingAll = (result) => ({
    type: actions.SETTING_GET_ALL,
    payload: result
})

export const getSettingError = (error) => ({
    type: actions.SETTING_GET_ERROR,
    error: error
})

export const getSettingLoading = (bool) => ({
    type: actions.SETTING_GET_LOADING,
    payload: bool
})

export const addSettingResultToDb = (payload) => {
    return async dispatch => {
        dispatch(getSettingLoading(true))

        api.addSetting(payload)
            .then(
                data => {
                    dispatch(getSettingAll(data.data.data))
                }
            )
            .catch(err => {
                dispatch(getSettingError(err))
            })
    }
}

export const getSettingAllToDb = (payload) => {
    return async dispatch => {
        dispatch(getSettingLoading(true))

        api.getAllSetting(payload)
            .then(
                data => {
                    dispatch(getSettingAll(data.data.data))
                }
            )
            .catch(err => {
                dispatch(getSettingError(err))
            })
    }
}

export const deleteSettingToDo = (payload) => {
    return async dispatch => {
        dispatch(getSettingLoading(true))

        await api.deleteSetting(payload)
            .then(
                data => {
                    dispatch(getSettingAll(data.data.data))
                }
            )
            .catch(err => {
                dispatch(getSettingError(err))
            })
    }
}

export const updateSettingToDo = (payload) => {
    return async dispatch => {
        dispatch(getSettingLoading(true))

        await api.updateSetting(payload)
            .then(
                data => {
                    dispatch(getSettingAll(data.data.data))
                }
            )
            .catch(err => {
                dispatch(getSettingError(err))
            })
    }
}