let userModel
let tokenModel
let clientModel
let oAuthModel

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
    var update = {}
    var filter = {
        _id: accountObj.userId
    }

    if(accountObj.username){
        update.username = accountObj.username
    }

    if(accountObj.password){
        update.password = accountObj.password
    }

    if(accountObj.email){
        update.email = accountObj.email
    }

    return userModel
        .findByIdAndUpdate(filter, update, (err, oldUser) => {
            if(err){
                console.error(err);
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