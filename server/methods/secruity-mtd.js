let expressApp
let oAuthModel
let OAuth2Server
let Request
let Response

module.exports = (injectExpressApp, injectOauth2servier, injectoAuthModel) => {
    expressApp = injectExpressApp
    oAuthModel = injectoAuthModel
    OAuth2Server = injectOauth2servier

    expressApp.oauth = new OAuth2Server({
        model: oAuthModel,
        accessTokenLifetime: 60 * 900000,
        allowBearerTokensInQueryString: true
    })

    Request = OAuth2Server.Request
    Response = OAuth2Server.Response

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