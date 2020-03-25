module.exports = (router, calendarMth, secruityMethod) => {
    router.get('/list', secruityMethod.authenticateRequest, calendarMth.getAllEvents)
    router.post('/add', secruityMethod.authenticateRequest, calendarMth.addEvent)

    return router
}