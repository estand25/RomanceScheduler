let scheduleDBHelper

module.exports = (injectScheduleDbHelper) => {
    scheduleDBHelper = injectScheduleDbHelper

    return {
        addSchedule: addSchedule,
        getAllSchedule: getAllSchedule
    }
}

addSchedule = (req, res) => {
    console.log('addSchedule', req.body);
    
    scheduleDBHelper.addScheduleInDb(req.body)
        .then(schedule => {
            sendResponse(res, 'Add Schedule successfully', null, schedule)
        })
        .catch(error => {
            sendResponse(res, 'Failed to add schedule', error, null)
        })
}

getAllSchedule = (req, res) => {
    scheduleDBHelper.addScheduleInDb(req.body)
        .then(schedule => {
            sendResponse(res, 'All Schedule received successfully', null, schedule)
        })
        .catch(error => {
            sendResponse(res, 'Failed to received schedules', error, null)
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