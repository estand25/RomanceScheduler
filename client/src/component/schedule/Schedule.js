import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRejectBtn, EditableField, EditableCalendarField, Utility } from '../general'
import { schedule } from '../../action'

const Schedule = ({item, setShow, setMessage, setTitle, setVariantType}) => {
    const dispatch = useDispatch()
    const accSeletor = useSelector(state => state.account)
    const setSeletor = useSelector(state => state.setting)

    const {rType, rResult, rScheduleDte} = item
    const {activityStr, actionStr, resultList, typeList} = setSeletor

    const [change, onChange] = useState(false)
    const [rTypeValue, setRtypeValue] = useState(typeList.filter(i => i.value == rType)[0])
    const [rResultValue, setRResultValue] = useState(resultList.filter((i) => {
        if(i.value == rResult){
            return i
        }
    }))

    const [dte, setDte] = useState(new Date(rScheduleDte))
    const [displayList, setDisplayList] = useState(resultList.filter((i) => i.rType == 'activity'))

    const [label, setLabel] = useState('Activity')

    const onEdit = () => {
        onChange(!change)
    }

    const onDelete = () => {
        let deleteSchedule = Object.assign({}, item)
        deleteSchedule.token = accSeletor.token
        
        let payload = {
            userId: accSeletor.userId,
            token: accSeletor.token
        }
        
        setMessage(Utility.MessageString(
            'deleted',
            new Date(dte),
            rTypeValue.label,
            label,
            rResultValue[0].label
        ))
        setTitle('Schedule Deleted Successfully')
        setVariantType('danger')
        
        dispatch(schedule.deleteScheduleToDb(deleteSchedule))
            .then(i => { 
                dispatch(schedule.getSchedulesToDb(payload))
            })

        setShow(true)
    }

    const onUpdate = () => {
        var updateSchedule = Object.assign({}, item)
        updateSchedule.token = accSeletor.token
        updateSchedule.rScheduleDte = dte.toDateString()
        updateSchedule.rResult = rResultValue.value
        updateSchedule.rType = rTypeValue.value
        
        let payload = {
            userId: accSeletor.userId,
            token: accSeletor.token
        }
       
        setMessage(Utility.MessageString(
            'update',
            new Date(dte),
            rTypeValue.label,
            label,
            rResultValue.label
        ))
        setTitle('Schedule Updated Successfully')
        setVariantType('primary')

        dispatch(schedule.updateScheduleToDb(updateSchedule))
            .then(i => {
                dispatch(schedule.getSchedulesToDb(payload))
            })

        setShow(true)
    }

    const chgTypeMore = (i) => {
        setRtypeValue(i);
        let list;

        if(i.value == 'activity'){
            list = resultList.filter((i) => {
                return activityStr.includes(i.value)
            })
            setLabel('Activity')
        } else {
            list = resultList.filter((i) => {
                return actionStr.includes(i.value)
            })
            setLabel('Action')
        }
        
        setDisplayList(list)
        setRResultValue('')
    }

    return (
        <div className='listWrapper'>
            <AcceptRejectBtn
                acceptStyle='btn btn-outline-success'
                acceptOnClick={onEdit}
                acceptText='Edit'
                rejectStyle='btn btn-outline-danger'
                rejectOnClick={onDelete}
                rejectText='Delete'
            />
            <EditableField
                edit={change}
                labelText={'Romance Type'}
                list={typeList}
                valueObj={rTypeValue}
                setValueObj={chgTypeMore}
            />
            <EditableField
                edit={change}
                labelText={'Romance ' + label}
                list={displayList}
                valueObj={rResultValue}
                setValueObj={setRResultValue}
            />
            <EditableCalendarField
                edit={change}
                labelText={'Romance Date'}
                dte={dte}
                setDte={setDte}
            />
            { change ? 
                <AcceptRejectBtn
                    acceptStyle='btn btn-outline-primary'
                    acceptOnClick={onUpdate}
                    acceptText='Update'
                    rejectStyle='btn btn-outline-danger'
                    rejectOnClick={onEdit}
                    rejectText='Cancel'
                /> :
                <></>
            }
        </div>
    )
}

export default Schedule