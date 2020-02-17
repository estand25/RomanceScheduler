const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const OAuth2Server = require('oauth2-server')
const Request = OAuth2Server.Request
const Response = OAuth2Server.Response

const db = require('./db')

const expressApp = express()
const apiPort = 3000

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(cors())
expressApp.use(bodyParser.json())

expressApp.oauth = new OAuth2Server({
    model: require('./oAuthModel'),
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: true
});

const accountDbHelper = require('./dbHelper/account')
const accountMth = require('./methods/account-mtd')(accountDbHelper)
const accountRoute = require('./routes/account')(express.Router(), accountMth)

// obtainToken = (req, res) => {
//     var request = new Request(req);
//     var response = new Response(res);

//     return expressApp.oauth.token(request, response)
//         .then( (token) => {
//             res.json(token)
//         }).catch( (err) => {
//             res.status(err.code || 500).json(err);
//         })
// }

// authenticateRequest = (req, res, next) => {
//     var request = new Request(req)
//     var response = new Response(res)

//     return expressApp.oauth.authenticate(request, response)
//         .then( () => {
//             next();
//         }).catch( (err) => {
//             res.status(err.code || 500).json(err)
//         })
// }

// expressApp.all('/oauth/token', obtainToken)
// expressApp.get('/', authenticateRequest, (req, res) => {
//     res.send('Congratulations, you are in a secret area! ');
// })

expressApp.use('/user',accountRoute)

expressApp.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))


//https://blog.cloudboost.io/how-to-make-an-oauth-2-server-with-node-js-a6db02dc2ce7 
//https://www.freecodecamp.org/news/deploy-a-react-node-app-to/