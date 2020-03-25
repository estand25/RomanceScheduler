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

    // console.log('Response', response.data.items);

    var newResponse = response.data.items.map(i => {
        var item = {}
        
        item = {
            id: i.id,
            status: i.status,
            htmlLink: i.htmlLink,
            summary: i.summary,
            start: i.start.dateTime,
            timeZone: i.start.timeZone,
            createDte: i.created,
            description: i.description
        }
        return item
    }) 

    return newResponse
}
getSpecificEventFromCalendar = async () => {

}
addSpecificEventToCalendar = async (newEvent) => {
    let calendar = googleCalendar.calendar('v3');

    var response = await calendar.events.insert({
        "auth": jwtClientCalendar,
        "calendarId": 'estand25@gmail.com',
        "orderBy": "startTime",
        "singleEvents": true,
        "resource": newEvent
    })

    return response

}
updateSpecificEventFromCalendar = () => {}
deleteSpecificEventFromCalendar = () => {}