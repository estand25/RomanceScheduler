let userModel = require('../model/user')

module.exports = () => {
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

    newUser.save((err, user) => {
        if(err){
            return console.error(err);
        } else {
            console.log('Create new User', user);
        }  
    });
};

function logUserInDb(username, password) {
    userModel.findOne({
        username: username,
        password: password
    }).lean().exec((err, user) => {
        if(!user){
            console.error(err);
        } else {
            console.log('Found the user'. user);
        }
    });
};

function doesUserExist (username) {
    return userModel.findOne({
        username: username
    }).count() > 1
}
