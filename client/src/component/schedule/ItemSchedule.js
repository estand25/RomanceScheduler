import React, {useState, useEffect} from 'react'
import { DropDownField, AcceptRejectBtn } from '../general'
import { useDispatch, useSelector} from 'react-redux'
import Calendar from 'react-calendar'
import {schedule} from '../../action'
import RandomDateGene from 'random-date-generator'

const ItemSchedule = ({add, onChange, setShow, setMessage, setTitle, setVariantType}) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.schedule)
    const acc = useSelector(state => state.account)

    const [romanceItem, onRomanceItemSelect] = useState('')
    const [activityItem, onActivityItemSelect] = useState('')
    const [actionItem, onActionItemSelect] = useState('')
    const [romanceDte, onRomanceDte] = useState(new Date())

    useEffect(
        () => {
            dispatch(schedule.getScheduleTypes())
            dispatch(schedule.getScheduleActions())
            dispatch(schedule.getScheduleActivites())
        },[]
    )

    const onAdd = async() => {
        var newSchedule = {
            rType: romanceItem.value,
            rScheduleDte: romanceDte.toDateString(),
            rUserId: acc.userId,
            token: acc.token
        }

        if(activityItem.value){
            newSchedule.rResult = activityItem.value
        }

        if(actionItem.value){
            newSchedule.rResult = actionItem.value
        }
        
        let payload = {
            userId: acc.userId,
            token: acc.token
        }
        
        let message = [`Schedule has been successfully added to your calendar `,
        `You have added the following schedule item `,
        ` - Type: ${romanceItem.label} `,
        activityItem.value ? 
        ` - Activity: ${activityItem.label} ` :
        ` - Action: ${actionItem.label} `,
        ` - Schedule Date: ${romanceDte.toDateString()}` ]
        
        setMessage(message)
        setTitle('Schedule Added Successfully')
        setVariantType('success')

        dispatch(schedule.addScheduleToDb(newSchedule))
            .then(i => { 
                dispatch(schedule.getSchedulesToDb(payload))
            })

        onRomanceItemSelect('')
        onActionItemSelect('')
        onActivityItemSelect('')
        onRomanceDte(new Date())

        setShow(true)
        onChange(!add)
    }

    const onCancel = () => {
        onChange(!add)
    }

    const Item = () => {
        if(add){
            return (
                <div className="addWrapper">
                    <DropDownField
                        label={'Romance Item:'}
                        value={romanceItem}
                        onChange={r => onRomanceItemSelect(r)}
                        options={selector.typeList}
                    />
                    {romanceItem.value == '' || romanceItem.value == undefined ?
                        <></> :
                        romanceItem.value == 'activity' ?
                            <DropDownField
                                label={'Romance Activity:'}
                                value={activityItem}
                                onChange={i => onActivityItemSelect(i)}
                                options={selector.activityList}
                            /> :
                            <DropDownField
                                label={'Romance Action:'}
                                value={actionItem}
                                onChange={i => onActionItemSelect(i)}
                                options={selector.actionList}
                            />
                    }
                    <div className='calendar'>
                        <Calendar
                            value={romanceDte}
                            onChange={c => onRomanceDte(c)}
                        />
                    </div>
                    <AcceptRejectBtn
                        acceptStyle='btn btn-outline-success'
                        acceptOnClick={onAdd}
                        acceptText={'Add'}
                        rejectStyle={'btn btn-outline-danger'}
                        rejectOnClick={onCancel}
                        rejectText={'Cancel'}
                    />
                </div>
            )
        } else {
            return <></>
        }
    }
    return (
        <Item />
    )
}

export default ItemSchedule