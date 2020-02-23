import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { schedule } from '../../action'

const ListSchedule = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.schedule)

    useEffect(
        () => {
            dispatch(schedule.getAllSchedule)
        },[]
    )

    const List = () => {
        console.log('List Schedule', selector.scheduleList);
        
        return (
            <div>
                {'List Schedule'}
            </div>
        )
    }

    return (
        <List />
    )
}

export default ListSchedule