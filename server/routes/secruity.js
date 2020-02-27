module.exports = (router, routeMethod) => {
    
    router.all('/oauth/token', routeMethod.obtainToken)
    router.get('/', routeMethod.authenticateRequest, (req, res) => {
        res.send('Congratulations, you are in a secruity area!')
    })

    return router
}