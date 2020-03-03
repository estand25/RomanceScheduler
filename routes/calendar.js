const CONFIG = require('../serect/index')
const CalendarAPI = require('node-google-calendar')

module.exports = (router, secruityMethod) => {
    router.get('/list', (req,res) => {        
        let cal = new CalendarAPI(CONFIG) 
        let params = {
            showHidden: true
        }

        cal.CalendarList.list(params)
            .then(resp => {
                console.log('calendar resp: ', resp);
            })
            .catch(err => {
                console.log('calendar error: ', err);
            })
    })

    return router
}