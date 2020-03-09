let googleCalendar

module.exports = (injectGoogleCalendarModel) => {
    googleCalendar = injectGoogleCalendarModel

    return {
        getAllEventsFromCalendar: getAllEventsFromCalendar,
        getSpecificEventFromCalendar: getSpecificEventFromCalendar,
        updateSpecificEventFromCalendar: updateSpecificEventFromCalendar,
        deleteSpecificEventFromCalendar: deleteSpecificEventFromCalendar,
    }
}

getAllEventsFromCalendar = () => {}
getSpecificEventFromCalendar = () => {}
updateSpecificEventFromCalendar = () => {}
deleteSpecificEventFromCalendar = () => {}