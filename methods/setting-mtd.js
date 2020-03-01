let settingDbHelper

module.exports = (injectSettingDbHelper) => {
    settingDbHelper = injectSettingDbHelper
    
    return {
        addSetting: addSetting,
        getAllSetting: getAllSetting,
        updateSetting: updateSetting,
        deleteSetting: deleteSetting
    }
}

addSetting = (req, res) => {    
    settingDbHelper.addSettingInDb(req.body)
        .then(setting => {
            if(setting){
                sendResponse(res, 'Add new setting option successfully', null, setting)
            } else {
                sendResponse(res, 'Failed to add setting options', 'Setting can not be added', null)
            }
        })
        .catch((error) => {
            sendResponse(res, 'Failed to add setting', error, null)
        })
}

getAllSetting = (req, res) => {
    settingDbHelper.getAllSettingInDb()
        .then(setting => {
            sendResponse(res, 'All setting returned successfully', null, setting)
        })
        .catch((error) => {
            sendResponse(res, 'Failed to received settings', error, null)
        })
}
updateSetting = (req, res) => {
    settingDbHelper.updateSettingInDb(req.body)
        .then(setting => {
            if(setting){
                sendResponse(res, 'Setting successfully update', null, setting)
            } else {
                sendResponse(res, 'Failed to update setting', 'Setting has not been update', null)
            }
        })
        .catch((error) => {
            sendResponse(res, 'Failed to update setting', error, null)
        })
}
deleteSetting = (req, res) => {
    settingDbHelper.deleteSettingInDb(req.body)
        .then(setting => {
            if(setting){
                sendResponse(res, 'Setting successfully Deleted', null, setting)
            } else {
                sendResponse(res, 'Failed to delete setting option', 'Setting does not exist to deleted', null)
            }
        })
        .catch((error) => {
            sendResponse(res, 'Failed to delete setting', error, null)
        })
}

sendResponse = (res, message, error, data) => {
    var json = {}
    var status = 0

    if(message){
        json.message = message
        status = 200
    }

    if(error){
        json.error = error 
        status = 400
    }

    if(data){
        json.data = data
    }

    return res
        .status(status)
        .json(json)
}