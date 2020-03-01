import { actions } from './type'

export const SettingAddAll = (result) => ({
    type: actions.SETTING_ADD_ALL,
    payload: result
})

export const SettingAddError = (error) => ({
    type: actions.SETTING_ADD_ERROR,
    error: error
})

export const SettingAddLoading = (bool) => ({
    type: actions.SETTING_ADD_LOADING,
    payload: bool
})

export const SettingGetAll = (result) => ({
    type: actions.SETTING_GET_ALL,
    payload: result
})

export const SettingGetError = (error) => ({
    type: actions.SETTING_GET_ERROR,
    error: error
})

export const SettingGetLoading = (bool) => ({
    type: actions.SETTING_GET_LOADING,
    payload: bool
})

export const SettingAddResultToDb = (payload) => {
    return async dispatch => {
        dispatch(SettingGetLoading(true))

        
    }
}