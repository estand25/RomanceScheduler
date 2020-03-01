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
    const { typeList, activityStr, actionStr, resultList } = selector

    const [romanceItem, onRomanceItemSelect] = useState('')
    const [romanceDte, onRomanceDte] = useState(new Date())
    const [romanceResult, onRomanceResult] = useState('')
    const [label, onLabel] = useState('Activity')
    const [displayList, setDisplayList] = useState(resultList.filter((i) => {
        return !activityStr.split(',').includes(i.value)
    }))

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
            rResult:romanceResult.value,
            rUserId: acc.userId,
            token: acc.token
        }
        
        let payload = {
            userId: acc.userId,
            token: acc.token
        }
        
        let message = [`Schedule has been successfully added to your calendar `,
        `You have added the following schedule item `,
        ` - Type: ${romanceItem.label} `,
        ` - ${label}: ${romanceResult.label}`,,
        ` - Schedule Date: 
        ${new Intl.DateTimeFormat("en-GB", 
        {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(new Date(romanceDte))}`]
        
        setMessage(message)
        setTitle('Schedule Added Successfully')
        setVariantType('success')

        dispatch(schedule.addScheduleToDb(newSchedule))
            .then(i => { 
                dispatch(schedule.getSchedulesToDb(payload))
            })

        onRomanceItemSelect('')
        onRomanceResult('')
        onRomanceDte(new Date())

        setShow(true)
        onChange(!add)
    }

    const onCancel = () => {
        onChange(!add)
    }

    const chgTypeMore = (i) => {
        onRomanceItemSelect(i);
        let list;

        if(i.value == 'activity'){
            list = resultList.filter((i) => {
                return !activityStr.split(',').includes(i.value)
            })
            onLabel('Activity')
        } else {
            list = resultList.filter((i) => {
                return !actionStr.split(',').includes(i.value)
            })
            onLabel('Action')
        }
        
        setDisplayList(list)
        onRomanceResult('')
    }

    const Item = () => {
        if(add){
            return (
                <div className="addWrapper">
                    <DropDownField
                        label={'Romance Item:'}
                        value={romanceItem}
                        onChange={r => chgTypeMore(r)}
                        options={typeList}
                    />
                    <DropDownField
                        label={`Romance ${label}:`}
                        value={romanceResult}
                        onChange={i => onRomanceResult(i)}
                        options={displayList}
                    />
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