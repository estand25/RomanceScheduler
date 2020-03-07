// const CONFIG = require('../serect')
// const CalendarAPI = require('node-google-calendar')

let { google } = require('googleapis');
let privateKey = require('../serect/index');

let jwtClient = new google.auth.JWT(
    privateKey.keyFile.client_email,
    null,
    privateKey.keyFile.private_key,
    ['https://www.googleapis.com/auth/calendar']);
    //authenticate request
    jwtClient.authorize(function (err, tokens) {
        if (err) {
                console.log(err);
        return;
        } else {
            console.log("Successfully connected!");
        }
});

module.exports = (router, secruityMethod) => {
    router.get('/list', (req,res) => {        
        let calendar = google.calendar('v3');

        calendar.events.list({
            auth: jwtClient,
            calendarId: 'primary'
        }, (err, response) => {
            console.log('calendar', response);
        });

        // let cal = new CalendarAPI(CONFIG) 
        // let params = {
        //     "showHidden": true
        // }

        // cal.Events.list(CONFIG.calendarId, (err, result) => {
        //     console.log('err', err);
            
        //     console.log('Result', result);
        // })

       
        // cal.Events.list(CONFIG.calendarId, params)
        //     .then(resp => {
        //         console.log(resp);  
        //     }).catch(err => {
        //         console.log(err);
        //     })

        // console.log('CalendarList', cal.Events.list({calendarId: CONFIG.calendarId}));        
        // cal.CalendarList.list()
            // .then(resp => {
            //     console.log(resp);
            // }).catch(err => {
            //     console.log(err.message);
            // });
         
    })

    return router
}