module.exports = (router, routeMethod, secruityMethod) => {
    router.get('/', secruityMethod.authenticateRequest, routeMethod.getAllSchedule)
    router.post('/add', secruityMethod.authenticateRequest, routeMethod.addSchedule)
    router.patch('/update', secruityMethod.authenticateRequest, routeMethod.updateSchedule)
    router.delete('/delete', secruityMethod.authenticateRequest, routeMethod.deleteSchedule)

    return router
}