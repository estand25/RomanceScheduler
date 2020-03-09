module.exports = (router, calendarAuth, calendarMth, secruityMethod) => {
    const { jwtClient, google } = calendarAuth
    router.get('/list', (req,res) => {        
        let calendar = google.calendar('v3');

        calendar.events.list({
            auth: jwtClient,
            calendarId: 'estand25@gmail.com'
        }, (err, response) => {
            console.log('calendar', response);
        });
    })

    return router
}