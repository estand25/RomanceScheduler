var mongoose = require('mongoose')

var userModel = require('../model/user'),
    tokenModel = require('../model/token'),
    clientModel = require('../model/client')

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
    getAccessToken: getAccessToken,
    getClient: getClient,
    saveToken: saveToken,
    getUser: getUser,
    getUserFromClient: getUserFromClient,
    getRefreshToken: getRefreshToken,
    revokenToken: revokenToken
}