const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const OAuth2Server = require('oauth2-server')

const accountDbHelper = require('./dbHelper/account')(require('./model/user'), require('./model/token'), require('./model/client'), require('./oAuthModel'))
const accountMth = require('./methods/account-mtd')(accountDbHelper)
const accountRoute = require('./routes/account')(express.Router(), accountMth)

const db = require('./db')

const expressApp = express()
const apiPort = 3000

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use(cors())
expressApp.use(bodyParser.json())

const secruityMth = require('./methods/secruity-mtd')(expressApp, OAuth2Server, require('./oAuthModel'))
const secruityRoute = require('./routes/secruity')(express.Router(), secruityMth)

const scheduleDbHelper = require('./dbHelper/schedule')(require('./model/schedule'), require('./model/user'))
const scheduleMth = require('./methods/schedule-mtd')(scheduleDbHelper)
const scheduleRoute = require('./routes/schedule')(express.Router(), scheduleMth, secruityMth)

expressApp.use('/app', secruityRoute)
expressApp.use('/user', accountRoute)
expressApp.use('/schedule', scheduleRoute)

expressApp.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))