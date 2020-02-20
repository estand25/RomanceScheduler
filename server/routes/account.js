module.exports = (router, routeMethods) => {
    // router.post('/registerUser', routeMethods.registerUser)
    router.post('/login', routeMethods.logIn)
    router.patch('/update/:id', routeMethods.updateAccount)

    return router
}