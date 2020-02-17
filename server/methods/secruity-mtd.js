let expressApp
let Request
let Response

module.exports = (injectExpressApp, injectRequest, injectResponse) => {
    expressApp = injectExpressApp
    Request = injectRequest
    Response = injectResponse

    return {
        obtainToken: obtainToken,
        authenticateRequest: authenticateRequest
    }
}


obtainToken = (req, res) => {
    var request = new Request(req);
    var response = new Response(res);

    return expressApp.oauth.token(request, response)
        .then( (token) => {
            res.json(token)
        }).catch( (err) => {
            res.status(err.code || 500).json(err);
        })
}

authenticateRequest = (req, res, next) => {
    var request = new Request(req)
    var response = new Response(res)

    return expressApp.oauth.authenticate(request, response)
        .then( () => {
            next();
        }).catch( (err) => {
            res.status(err.code || 500).json(err)
        })
}