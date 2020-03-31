import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRejectBtn, EditableField, EditableCalendarField, Utility, BtnGenerator } from '../general'
import { schedule } from '../../action'

const Schedule = ({item, setShow, setMessage, setTitle, setVariantType}) => {
    const dispatch = useDispatch()
    const accSeletor = useSelector(state => state.account)
    const setSeletor = useSelector(state => state.setting)

    const {rType, rResult, rScheduleDte} = item
    const {activityStr, actionStr, sexyStr, resultList, typeList} = setSeletor

    const [change, onChange] = useState(false)
    const [rTypeValue, setRtypeValue] = useState(typeList.filter(i => i.value == rType)[0])
    const [rResultValue, setRResultValue] = useState(resultList.filter((i) => {
        if(i.value == rResult){
            return i
        }
    }))
    const [dte, setDte] = useState(new Date(rScheduleDte))
    const [displayList, setDisplayList] = useState(resultList.filter((i) => i.rType == rType))
    const [label, setLabel] = useState('Activity')

    const onEdit = () => {
        if(!change)
        {

        }
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
        let payload = {
            userId: accSeletor.userId,
            token: accSeletor.token
        }

        if(!rResultValue.value || !rTypeValue.value || dte){
            var field = !rResultValue.value && !rTypeValue.value
                ? `- Romance Item && ${label}`
                : !rResultValue.value ? '- Romance Item '
                : !rTypeValue.value ? `- Romance ${label}` : ''

            var message = Utility.ErrorString(field)
            setMessage(message)
            setTitle('Error Adding Schedule')
            setVariantType('danger')

            dispatch(schedule.getSchedulesToDb(payload))
        } else {
            var updateSchedule = Object.assign({}, item)
            updateSchedule.token = accSeletor.token
            updateSchedule.rScheduleDte = dte.toDateString()
            updateSchedule.rResult = rResultValue.value
            updateSchedule.rType = rTypeValue.value
        
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
        }

        setShow(true)
    }

    const chgTypeMore = (i) => {
        setRtypeValue(i);
        let list;

        if(i.value == 'activity'){
            list = resultList.filter((i) => {
                return activityStr.includes(i.value)
            })
            onLabel('Activity')
        } else if(i.value == 'action') {
            list = resultList.filter((i) => {
                return actionStr.includes(i.value)
            })
            onLabel('Action')
        } else {
            list = resultList.filter((i) => {
                return sexyStr.includes(i.value)
            })
            onLabel('Sexy Time')
        }
        
        setDisplayList(list)
        setRResultValue('')
    }

    const btnList = [
        {
            className:'btn btn-outline-success',
            onClick: () => onEdit(),
            text: 'Edit'
        },
        {
            className:'btn btn-outline-danger',
            onClick:  () => onDelete(),
            text: 'Delete'
        }
    ]

    const btnList_ = [
        {
            className:'btn btn-outline-primary',
            onClick: () => onUpdate(),
            text: 'Update'
        },
        {
            className:'btn btn-outline-danger',
            onClick:  () => onEdit(),
            text: 'Cancel'
        }
    ]

    return (
        <div className='listWrapper'>
            <BtnGenerator
                list={btnList}
            />
            <EditableField
                edit={change}
                labelText={'Romance Type'}
                list={typeList}
                valueObj={rTypeValue}
                setValueObj={i => chgTypeMore(i)}
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
                <BtnGenerator
                    list={btnList_}
                />
                :
                <></>
            }
        </div>
    )
}

export default Schedule