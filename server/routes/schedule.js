module.exports = (router, routeMethod, secruityMethod) => {
    router.post('/add', secruityMethod.authenticateRequest, routeMethod.addSchedule)
    router.get('/', secruityMethod.authenticateRequest, routeMethod.getAllSchedule)

    return router
}