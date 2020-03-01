let settingModel

module.exports = (injectSetting) => {
    settingModel = injectSetting

    return {
        addSettingInDb: addSettingInDb,
        getAllSettingInDb: getAllSettingInDb,
        updateSettingInDb: updateSettingInDb,
        deleteSettingInDb: deleteSettingInDb
    }
}

addSettingInDb = (setting) => {
    return settingModel
        .findOne({
            label: setting.label,
            value: setting.value
        })
        .then(
            set => {
                if(!set){
                    var settingInstane = new settingModel(setting)                    
                    settingInstane.save((err) => {
                        if(err){
                            console.error(err);
                        }
                    })

                    return settingInstane
                } else {
                    return null
                }
            }
        )
}
getAllSettingInDb = () => {
    return settingModel
        .find({}, (err, allSetting) => {
            if(err){
                console.error(err);
            }

            return allSetting
        })   
}
updateSettingInDb = (setting) => {
    return settingModel
        .findOne({
            _id: setting._id
        })
        .then(
            set => {
                if(set){
                    set.remove({id: setting._id}, (err) => {
                        if(err){
                            return console.error(err);
                        }
                    })

                    return addSettingInDb(setting) 
                } else {
                    return null
                }
            }
        )
}
deleteSettingInDb = (setting) => {
    return settingModel
        .findOne({
            _id: setting._id
        })
        .then(
            set => {
                if(set){
                    set.remove({id: setting}, (err) => {
                        if(err){
                            return console.error(err);
                        }
                    })

                    return setting
                } else {
                    return null
                }
            }
        )
}