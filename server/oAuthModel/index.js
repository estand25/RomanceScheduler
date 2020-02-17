var mongoose = require('mongoose')

var userModel = require('../model/user'),
    tokenModel = require('../model/token'),
    clientModel = require('../model/client')

var loadExampleData = () => {
    var client1 = new clientModel({
        id: 'application',
        clientId: 'application',
        clientSecret: 'secret',
        grant: [
            'password',
            'refresh_token'
        ],
        redirectUris: []
    })

    var client2 = new clientModel({
        clientId: 'confidentialApplication',
        clientSecret: 'topSecret',
        grants: [
            'password',
            'client_credentials'
        ],
        redirectUris: []
    })

    var user = new userModel({
        username: 'standley.eugene',
        password: 'password'
    });

    client1.save((err, client) => {
        if(err){
            return console.error(err);
        }

        console.log('Created client1 ', client);
    })

    user.save((err, user) => {
        if(err){
            return console.error(err);
        }

        console.log('Created user ', user);
    })

    client2.save((err, client) => {
        if(err){
            return console.error(err);
        }

        console.log('Created client2 ', client);
    })
}

var dump = () => {
    clientModel.find( (err, clients) => {
        if(err){
            return console.error(err);
        }

        console.log('Clients ', clients);
    });

    tokenModel.find((err, tokens) => {
        if(err){
            return console.error(err);
        }

        console.log('Tokens ', tokens);
    })

    userModel.find((err, users) => {
        if(err){
            return console.error(err);
        }

        console.log('Users ', users);
    })
}

var getAccessToken = (token, callback) => {
    tokenModel.findOne({
        accessToken: token
    }).lean().exec(( (callback, err, token) => {
        if(!token){
            console.error('Token not found');
        }

        callback(err, token);
    }).bind(null, callback));
};

var getClient = (clientId, clientSecret, callback) => {
    console.log('ClientId', clientId);
    console.log('ClientSecret',clientSecret);
    
    clientModel.findOne({
        clientId: clientId,
        clientSecret: clientSecret
    }).lean().exec(( (callback, err, client) => {
        if(!client){
            console.error('Client not found');
        }

        callback(err, client);
    }).bind(null, callback));
};

var saveToken = (token, client, user, callback) => {
    token.client = {
        id: client.clientId
    };

    token.user = {
        username: user.username
    };

    var tokenInstance = new tokenModel(token);
    tokenInstance.save(( (callback, err, token) => {
        if(!token){
            console.error('Token not saved');
        } else {
            token = token.toObject();
            delete token._id;
            delete token.__v;
        }

        callback(err, token);
    }).bind(null, callback));
};

var getUser = (username, password, callback) => {
    userModel.findOne({
        username: username,
        password: password
    }).lean().exec(( (callback, err, user) => {
        if(!user){
            console.error('User not found');
        }

        callback(err, user)
    }).bind(null, callback));
};

var getUserFromClient = (client, callback) => {
    clientModel.findOne({
        clientId: client.clientId,
        clientSecret: client.clientSecret,
        grants: 'client_credentials'
    }).lean().exec(( (callback, err, client) => {
        if(!client){
            console.error('Client not found');
        }

        callback(err, {
            username: ''
        });
    }).bind(null, callback));
};

var getRefreshToken = (refreshToken, callback) => {
    tokenModel.findOne({
        refreshToken: refreshToken
    }).lean().exec(( (callback, err, token) => {
        if(!token){
            console.error('Token not found');
        }

        callback(err, token)
    }).bind(null, callback));
};

var revokenToken = (token, callback) => {
    tokenModel.deleteOne({
        refreshToken: token.refreshToken
    }).exec(( (callback, err, results) => {
        var deleteSuccess = results && results.deletedCount == 1;

        if(!deleteSuccess){
            console.error('Token not deleted');
        }

        callback(err, deleteSuccess);
    }).bind(null, callback));
};

module.exports = {
    loadExampleData: loadExampleData,
    dump: dump,
    getAccessToken: getAccessToken,
    getClient: getClient,
    saveToken: saveToken,
    getUser: getUser,
    getUserFromClient: getUserFromClient,
    getRefreshToken: getRefreshToken,
    revokenToken: revokenToken
}