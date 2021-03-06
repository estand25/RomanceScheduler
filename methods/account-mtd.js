let userDBHelper

module.exports = (injectUserDbHelper) => {
    userDBHelper = injectUserDbHelper
    
    return {
        registerUser: registerUser,
        logIn: logIn,
        updateAccount: updateAccount
    }
}

registerUser = (req, res) => { 
}

logIn = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if(!isString(username) || !isString(password)){
        return sendResponse(res, 'Invalid user information', true, null)
    }

    userDBHelper.doesUserExist(username)
        .then( doesUserExist => {
            if(doesUserExist){
                userDBHelper.logUserInDb(username, password)
                    .then(accessToken => {
                        sendResponse(res, 'User was successfully log-In', null, accessToken)
                    })
            } else {                
                sendResponse(res, 'User does not exist', null, null)
            }
        })
        .catch(error => {
            sendResponse(res, 'Failed to log-In user', error, null)
        })
}

updateAccount = (req, res) => {   
    var accountObj = {
        userId: req.params.id
    }
    const { username, password, email } = req.body

    if(username){
        accountObj.username = username
    }

    if(password){
        accountObj.password = password
    }

    if(email){
        accountObj.email = email
    }

    userDBHelper.updateAccountInDb(accountObj)
        .then(update => {
            sendResponse(res, 'Account update', null, update)
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
