import {actions} from './type'

export const addSchedule = (schedule) => ({
    type: actions.SCHEDULE_ADD,
    schedule
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

export const getAllSchedule = () => ({
    type: actions.SCHEDULE_GET_ALL
})