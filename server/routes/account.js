module.exports = (router, routeMethods, secruityMethod) => {
    // router.post('/registerUser', routeMethods.registerUser)
    router.post('/login', routeMethods.logIn)
    router.patch('/update/:id', secruityMethod.authenticateRequest, routeMethods.updateAccount)

    return router
}