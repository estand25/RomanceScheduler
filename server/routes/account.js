module.exports = (router, routeMethods) => {
    router.post('/registerUser', routeMethods.registerUser)
    router.post('/login', routeMethods.logIn)

    return router
}