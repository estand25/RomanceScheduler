const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const OAuth2Server = require('oauth2-server')
const path = require('path')
const db = require('./db')

const expressApp = express()
const apiPort = 3000

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

expressApp.use(express.static(path.join(__dirname, "client", "build")))
expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(cors())
expressApp.use(bodyParser.json())

const secruityMth = require('./methods/secruity-mtd')(expressApp, OAuth2Server, require('./oAuthModel'))
const secruityRoute = require('./routes/secruity')(express.Router(), secruityMth)

const accountDbHelper = require('./dbHelper/account')(require('./model/user'), require('./model/token'), require('./model/client'), require('./oAuthModel'))
const accountMth = require('./methods/account-mtd')(accountDbHelper)
const accountRoute = require('./routes/account')(express.Router(), accountMth, secruityMth)

const scheduleDbHelper = require('./dbHelper/schedule')(require('./model/schedule'), require('./model/user'))
const scheduleMth = require('./methods/schedule-mtd')(scheduleDbHelper)
const scheduleRoute = require('./routes/schedule')(express.Router(), scheduleMth, secruityMth)

const settingDbHelper = require('./dbHelper/setting')(require('./model/setting'))
const settingMth = require('./methods/setting-mtd')(settingDbHelper)
const settingRoute = require('./routes/setting')(express.Router(), settingMth, secruityMth)

const calendarDbHelper = require('./dbHelper/calendar')(require('./calendarAuth'))
const calendarMth = require('./methods/calendar-mtd')(calendarDbHelper)
const calendarRoute = require('./routes/calendar')(express.Router(),  calendarMth, secruityMth)

expressApp.use('/api/app', secruityRoute)
expressApp.use('/api/user', accountRoute)
expressApp.use('/api/schedule', scheduleRoute)
expressApp.use('/api/setting', settingRoute)
expressApp.use('/api/calendar', calendarRoute)

expressApp.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})
expressApp.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))