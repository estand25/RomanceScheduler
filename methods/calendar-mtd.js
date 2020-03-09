let calendarDbHelper

module.exports = (injectCalendarDbHelper) => {
    calendarDbHelper = injectCalendarDbHelper

    return {
        getAllEvents: getAllEvents,
        getSpecificEvent: getSpecificEvent,
        updateSpecificEvent: updateSpecificEvent,
        deleteSpecificEvent: deleteSpecificEvent
    }
}

getAllEvents = () => {}
getSpecificEvent = () => {}
updateSpecificEvent = () => {}
deleteSpecificEvent = () => {}