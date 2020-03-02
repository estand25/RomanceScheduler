module.exports = (router, routerMethod, secruityMethod) => {
    router.get('/', secruityMethod.authenticateRequest, routerMethod.getAllSetting)
    router.post('/add', secruityMethod.authenticateRequest, routerMethod.addSetting)
    router.patch('/update', secruityMethod.authenticateRequest, routerMethod.updateSetting)
    router.delete('/delete', secruityMethod.authenticateRequest, routerMethod.deleteSetting)
   
    return router
}