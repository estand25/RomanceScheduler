let userDBHelper

module.exports = injectedUserDBHelper => {
    userDBHelper = injectedUserDBHelper

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
        return sendResponse(res, 'Invalid Credentials', true)
    }

    userDBHelper.doesUserExist(username)
        .then(
            doesUserExist => {
                if(doesUserExist == false){
                    return userDBHelper.registerUserInDB(username, password, email)
                }
                else {
                    throw new Error('User already exists')
                }
            }
        )
        .then(
            sendResponse(res, 'Registration was successful', null)
        )
        .catch(error => {
            sendResponse(res, 'Failed to register user', error)
        })
}

logIn = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if(!isString(username) || !isString(password)){
        return sendResponse(res, 'Invalid user information', true)
    }

    console.log('LogIn', username);
    console.log('LogIn function', userDBHelper.doesUserExist(''));
    
    var doesUserExist = userDBHelper.doesUserExist(username)

    if(doesUserExist){
        if(doesUserExist == true){
            sendResponse(res, 'User was successfully log-In', null)
            return userDBHelper.logUserInDb(username, password)
        } else {
            throw new Error('User does not exist')
        }
    } else {
        sendResponse(res, 'Failed to log-In user', null)
    }
}

sendResponse = (res, message, error) => {
    res
        .status(error != null ? error != null ? 400 : 200 : 400)
        .json({
            'message': message,
            'error': error
        })
}

isString = (parameter) => {
    return parameter != null
        &&  (typeof parameter === 'string'
            || parameter instanceof String) ? true : false
}