let googleCalendar
let jwtClientCalendar

module.exports = (injectGoogleCalendarModel) => {
    const {google, jwtClient} = injectGoogleCalendarModel

    googleCalendar = google
    jwtClientCalendar = jwtClient

    return {
        getAllEventsFromCalendar: getAllEventsFromCalendar,
        getSpecificEventFromCalendar: getSpecificEventFromCalendar,
        addSpecificEventToCalendar: addSpecificEventToCalendar,
        updateSpecificEventFromCalendar: updateSpecificEventFromCalendar,
        deleteSpecificEventFromCalendar: deleteSpecificEventFromCalendar,
    }
}

getAllEventsFromCalendar = async () => {
    let calendar = googleCalendar.calendar('v3');

   var response = await calendar.events.list({
        "auth": jwtClientCalendar,
        "calendarId": 'estand25@gmail.com',
        "orderBy": "startTime",
        "singleEvents": true
    })

    var newResponse = response.data.items.map(i => {
        var item = {}
        
        item = {
            id: i.id,
            status: i.status,
            htmlLink: i.htmlLink,
            summary: i.summary,
            start: i.start.dateTime,
            timeZone: i.start.timeZone,
            createDte: i.created
        }
        return item
    }) 

    return newResponse
}
getSpecificEventFromCalendar = async () => {}
addSpecificEventToCalendar = () => {}
updateSpecificEventFromCalendar = () => {}
deleteSpecificEventFromCalendar = () => {}