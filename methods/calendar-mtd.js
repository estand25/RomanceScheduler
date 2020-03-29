let calendarDbHelper

module.exports = (injectCalendarDbHelper) => {
    calendarDbHelper = injectCalendarDbHelper

    return {
        getAllEvents: getAllEvents,
        getSpecificEvent: getSpecificEvent,
        addEvent: addEvent,
        updateSpecificEvent: updateSpecificEvent,
        deleteSpecificEvent: deleteSpecificEvent
    }
}

getAllEvents = async (req,res) => {
    await calendarDbHelper.getAllEventsFromCalendar()
        .then(list => {
            sendResponse(res, 'Calendar list was successfully retreived', null, list)
        })
        .catch(error => {
            sendResponse(res, 'Failed to retrieve list', error, null)
        })
}
getSpecificEvent = () => {}
addEvent = async (req, res) => {
    await calendarDbHelper.addSpecificEventToCalendar(req.body)
        .then(list => {
            sendResponse(res, 'Calendar list was successfully retreived', null, list)
        })
        .catch(error => {
            sendResponse(res, 'Failed to retrieve list', error, null)
        })
}
updateSpecificEvent = () => {}
deleteSpecificEvent = () => {}

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

isString = (parameter) => {
    return parameter != null
        &&  (typeof parameter === 'string'
            || parameter instanceof String) ? true : false
}