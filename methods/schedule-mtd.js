let scheduleDBHelper

module.exports = (injectScheduleDbHelper) => {
    scheduleDBHelper = injectScheduleDbHelper

    return {
        addSchedule: addSchedule,
        getAllSchedule: getAllSchedule,
        updateSchedule: updateSchedule,
        deleteSchedule: deleteSchedule
    }
}

addSchedule = (req, res) => {
    scheduleDBHelper.addScheduleInDb(req.body)
        .then(schedule => {
            if(schedule){
                sendResponse(res, 'Add Schedule successfully', null, schedule)
            } else {
                sendResponse(res, 'Failed to add schedule', 'User does not exist to add schedule', null)
            }
        })
        .catch((error) => {
            sendResponse(res, 'Failed to add schedule', error, null)
        })
}

getAllSchedule = (req, res) => {
    scheduleDBHelper.getAllScheduleInDb()
        .then(schedule => {
            sendResponse(res, 'All Schedule received successfully', null, schedule)
        })
        .catch((error) => {
            sendResponse(res, 'Failed to received schedules', error, null)
        })
}

updateSchedule = (req, res) => {
    scheduleDBHelper.updateScheduleInDb(req.body)
        .then(schedule =>{
            if(schedule){
                sendResponse(res, 'Schedule successfully Updated', null, schedule)
            } else {
                sendResponse(res, 'Failed to update schedule', 'Schedule has not been updated', null)
            }
        })
        .catch((error) => {
            sendResponse(res, 'Failed to update schedule', error, null)
        })
}

deleteSchedule = (req, res) => {
    scheduleDBHelper.deleteScheduleInDb(req.body)
        .then(schedule => {
            if(schedule){
                sendResponse(res, 'Schedule successfully Deleted', null, schedule)
            } else {
                sendResponse(res, 'Failed to delete schedule', 'Schedule does not exist to delete', null)
            }
        })
        .catch((error) => {
            sendResponse(res, 'Failed to delete schedule', error, null)
        })
}

sendResponse = (res, message, error, data) => {
    var json = {}
    var status = 0

    if(message){
        json.message = message
        status = 200
    }

    if(error){
        json.error = error 
        status = 400
    }

    if(data){
        json.data = data
    }

    return res
        .status(status)
        .json(json)
}