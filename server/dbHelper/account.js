var userModel
var tokenModel
var clientModel
var oAuthModel

module.exports = (injectUserModel, injectTokenModel, injectClientModel, injectoAuthModel) => {
    userModel = injectUserModel ? injectUserModel : userModel
    tokenModel = injectTokenModel ? injectTokenModel : tokenModel
    clientModel = injectClientModel ? injectClientModel : clientModel
    oAuthModel = injectoAuthModel ? injectoAuthModel : oAuthModel

    return {
        registerUserInDb: registerUserInDb,
        logUserInDb: logUserInDb,
        doesUserExist: doesUserExist,
        updateAccountInDb: updateAccountInDb
    }
}

registerUserInDb = (username, password, email) => {
};

logUserInDb = (username, password) => {
    return userModel.findOne({
        username: username,
        password: password
    })
    .then( user => {
        return tokenModel.findOne({
           user: {
               username: user.username
           } 
        }).then(
            token => {
                return {
                    userId: user._id,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    accessToken: token.accessToken
                }
            }
        )
    })
    .catch(err => {
        console.error(err);
    })
};

updateAccountInDb = (accountObj) => {
    var username = accountObj.username
    var password = accountObj.password
    var email = accountObj.email
    var userId = accountObj.userId

    console.log('dbHelper AccountObj', accountObj);
    
    return userModel.findOne({
        _id: userId
    }).then(
        user => {
            var update_username = false, 
                update_password = false, 
                update_email = false

            if(username){
                user.username = username
                update_username = true
                console.log('dbHelper Account', update_username);
            }

            if(password){
                user.password = password
                update_password = true
                console.log('dbHelper Account', update_password);
            }

            if(email){
                user.email = email
                update_email = true
                console.log('dbHelper Account', update_email);
            }

            console.log('dbHelper Account', user);
            
            if(update_username || update_password || update_email){
                user.save()

                return {
                    update_username: update_username,
                    update_password: update_password,
                    update_email: update_email
                }
            } else {
                return {
                    update_username: false,
                    update_password: false,
                    update_email: false
                }
            }
    })
    .catch(err => {
        console.error(err);
    })
}

doesUserExist = (username) => {
    return userModel.exists({ username: username})
        .then(i => {
            return i
        })  
}