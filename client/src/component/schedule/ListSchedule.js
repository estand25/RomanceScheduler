import React from 'react'
import { useSelector } from 'react-redux'
import { Schedule} from '../../component'

const ListSchedule = () => {
    const schSeletor = useSelector(state => state.schedule)

    const List = () => {
        let schList = schSeletor.scheduleList

        if(schList){
            return (
                <div>
                    {schList
                        .map(item => (
                            <Schedule
                                key={item._id}
                                item={item}
                            />
                        ))
                    }
                </div>
            )
        } else {
            return (
                <div>{'You have not current schedules'}</div>
            )
        }
    }

    return (
        <List />
    )
}

export default ListSchedule