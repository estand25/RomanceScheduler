module.exports = (router, routeMethod) => {
    router.all('/oauth/token', routeMethod.obtainToken)

    return router
}