let userDBHelper

module.exports = (injectUserDbHelper) => {
    userDBHelper = require('../dbHelper/account')
    // console.log('injectUserDbHelper', injectUserDbHelper);
    // console.log('userDBHelper', userDBHelper);
    // userDBHelper = injectUserDbHelper
    
    return {
        registerUser: registerUser,
        logIn: logIn
    }
}

registerUser = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    if(!isString(username) || !isString(password) || !isString(email)){
        return sendResponse(res, 'Invalid Credentials', true, null)
    }

    userDBHelper().doesUserExist(username)
        .then(
            doesUserExist => {
                if(doesUserExist == false){
                    return userDBHelper().registerUserInDB(username, password, email)
                }
                else {
                    throw new Error('User already exists')
                }
            }
        )
        .then(
            sendResponse(res, 'Registration was successful', null, null)
        )
        .catch(error => {
            sendResponse(res, 'Failed to register user', error, null)
        })
}

logIn = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if(!isString(username) || !isString(password)){
        return sendResponse(res, 'Invalid user information', true, null)
    }

    userDBHelper().doesUserExist(username)
        .then( doesUserExist => {
            if(doesUserExist){
                userDBHelper().logUserInDb(username, password)
                    .then(accessToken => {
                        sendResponse(res, 'User was successfully log-In', null, accessToken)
                    })

            } else {
                sendResponse(res, 'Failed to log-In user', 'User does not exist', null)
            }
        })
        .catch(error => {
            sendResponse(res, 'Failed to log-In user', error, null)
        })
}

sendResponse = (res, message, error, data) => {
    var json = {}
    var status = 0

    if(message){
        json.message = message
        status = 200
    }

    if(error){
        json.error = error 
        status = 400
    }

    if(data){
        json.data = data
    }

    return res
        .status(status)
        .json(json)
}

isString = (parameter) => {
    return parameter != null
        &&  (typeof parameter === 'string'
            || parameter instanceof String) ? true : false
}
