
let { google } = require('googleapis');
let privateKey = require('../serect/index');
let jwtClient = new google.auth.JWT(
    privateKey.keyFile.client_email,
    null,
    privateKey.keyFile.private_key,
    ['https://www.googleapis.com/auth/calendar']);
    
    jwtClient.authorize(function (err, tokens) {
        if (err) {
                console.log(err);
        return;
        } else {
            console.log("Successfully connected!");
        }
});

module.exports = {
    google,
    jwtClient
}