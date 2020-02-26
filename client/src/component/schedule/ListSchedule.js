import React, {useEffect, useState} from 'react'
import Anime from 'react-anime';
import { useSelector, useDispatch } from 'react-redux'
import { Schedule } from '../../component'
import { schedule } from '../../action'

const ListSchedule = ({setShow, setMessage, setTitle, setVariantType}) => {
    const dispatch = useDispatch()
    const schSeletor = useSelector(state => state.schedule)
    const accSeletor = useSelector(state => state.account)

    useEffect(
        () => {
            let payload = {
                userId: accSeletor.userId,
                token: accSeletor.token
            }

            dispatch(schedule.getSchedulesToDb(payload))
        },[]
    )  

    const List = () => {
        if(schSeletor.scheduleList.length > 0){
            return (
                <div>
                    {schSeletor.scheduleList
                        .map(item => (
                            <Schedule
                                key={item._id}
                                item={item}
                                setShow={setShow}
                                setMessage={setMessage}
                                setTitle={setTitle}
                                setVariantType={setVariantType}
                            />
                        ))
                    }
                </div>
            )
        } else {
            return (
                <div className='addWrapper'>
                    {'You have not current schedules'}
                </div>
            )
        }
    }

    return (
        <List />
    )
}

export default ListSchedule