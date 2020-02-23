let scheduleModel
let userModel

module.exports = (injectScheduleMode, injectUserModel) => {
    scheduleModel = injectScheduleMode
    userModel = injectUserModel

    return {
        addScheduleInDb: addScheduleInDb,
        getAllScheduleInDb: getAllScheduleInDb
    }
}

addScheduleInDb = (schedule) =>{
    return userModel
        .findOne({
            _id: schedule.rUserId
        })
        .then(
            user => {
                var scheduleInstance = new scheduleModel(schedule)
                console.log('addScheduleInDb', schedule);
                
                scheduleInstance.save((err, schedule) => {
                    if(err){
                        return console.error(err);
                    }
                    console.log('addScheduleInDb', schedule);

                    return schedule
                })
            }
        )
}

getAllScheduleInDb = (schedule) => {
    return userModel
        .find({
            _id: schedule.rUserId
        })
        .then(
            allSchedule => {
                return allSchedule
            }
        )
}
