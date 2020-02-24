let scheduleModel
let userModel

module.exports = (injectScheduleMode, injectUserModel) => {
    scheduleModel = injectScheduleMode
    userModel = injectUserModel

    return {
        addScheduleInDb: addScheduleInDb,
        getAllScheduleInDb: getAllScheduleInDb,
        updateScheduleInDb: updateScheduleInDb,
        deleteScheduleInDb: deleteScheduleInDb
    }
}

addScheduleInDb = (schedule) =>{
    return userModel
        .findOne({
            _id: schedule.rUserId
        })
        .then(
            user => {
                if(user){
                    var scheduleInstance = new scheduleModel(schedule) 
                    scheduleInstance.save((err) => {
                        if(err){
                            return console.error(err);
                        }
                    })

                    return scheduleInstance
                } else {
                    return null
                }
            }
        )
}

getAllScheduleInDb = () => {
    return scheduleModel
        .find({}, (err, allSchedule) => {
            if(err){
                console.error(err);
            }

            return allSchedule
        })
}

updateScheduleInDb = (schedule) => {

}

deleteScheduleInDb = (schedule) => {
    return userModel
        .findOne({
            _id: schedule.rUserId
        })
        .then(
            user => {
                return scheduleModel
                    .findOne({
                        _id: schedule._id
                    })
                    .then(
                        sch => {
                            if(sch){
                                sch.remove({_id: schedule._id}, (err) => {
                                        if(err){
                                            return console.error(err);
                                        }
                                    }) 
                                    return schedule
                            } else {
                                return null
                            }
                        }
                    )
                    .catch(err => {
                        return console.error(err);
                    })
            }
        )
}
