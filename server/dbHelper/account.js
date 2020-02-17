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
        doesUserExist: doesUserExist
    }
}

registerUserInDb = (username, password, email) => {
    var newUser = new userModel({
        username: username,
        password: password,
        email: email
    })
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
                    accessToken: token.accessToken
                }
            }
        )
    })
    .catch(err => {
        console.error(err);
    })
};

doesUserExist = (username) => {
    return userModel.exists({ username: username})
        .then(i => {
            return i
        })  
}