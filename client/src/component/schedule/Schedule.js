import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRejectBtn, EditableField, EditableCalendarField } from '../general'
import { schedule } from '../../action'

const AdditionTypeField = ({change, rType, rActivityValue, setRActivityValue, activityList, rActionValue, setRActionValue, actionList}) => {    
    console.log('AdditionTypeField', rType);
    
    // if(rActionValue == undefined || rActivityValue == undefined){
    //     return (
    //         <></>
    //     )
    // }

    if(rType){
        console.log('AdditionTypeField', activityList);
        console.log('AdditionTypeField', rActionValue);
        
        if(rActivityValue == undefined){
            return (
                <></>
            )
        }
        return (
            <EditableField
                edit={change}
                labelText={'Romance Activity'}
                list={activityList}
                valueObj={rActivityValue}
                setValueObj={setRActivityValue}
            />
        )
    } else {
        console.log('AdditionTypeField', actionList);
        console.log('AdditionTypeField', rActionValue);
        
        if(rActivityValue == undefined){
            return (
                <></>
            )
        }

        return (
            <EditableField
                edit={change}
                labelText={'Romance Action'}
                list={actionList}
                valueObj={rActionValue}
                setValueObj={setRActionValue}
            />
        )
    }
}

const Schedule = ({item, setShow, setMessage, setTitle, setVariantType}) => {
    console.log('Schedule', item);
    
    const {rType, rResult, rScheduleDte} = item
    let resultType = rResult == 'activity'
    const dispatch = useDispatch()
    const accSeletor = useSelector(state => state.account)
    const schSeletor = useSelector(state => state.schedule)
    const {typeList, activityList, actionList} = schSeletor

    const [change, onChange] = useState(false)
    const [rTypeValue, setRtypeValue] = useState(typeList.filter(i => i.value == rType)[0])

    const   [rResultValue, setRResultValue] = useState(resultType ? activityList.filter(i => i.value == rResult)[0] : actionList.filter(i => i.value == rResult)[0])
    // const [rActivityValue, setRActivityValue] = useState(activityList.filter(i => i.value == rResult)[0])
    // const [rActionValue, setRActionValue] = useState(actionList.filter(i => i.value == rResult)[0])
    const [dte, setDte] = useState(new Date(rScheduleDte))

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

        dispatch(schedule.deleteScheduleToDb(deleteSchedule))
            .then(i => { 
                dispatch(schedule.getSchedulesToDb(payload))
            })

        let message = ['Schedule has been successfully deleted from your calendar ',
        'you have deleted the following schedule item',
        ` - Type: ${typeList.filter(i => i.value == rType)[0].label} `,
        rActivity ? 
        ` - Activity: ${activityList.filter(i => i.value == rResult)[0].label} ` :
        ` - Action: ${actionList.filter(i => i.value == rResult)[0].label} `,
        ` - Schedule Date: 
        ${new Intl.DateTimeFormat("en-GB", 
        {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(new Date(rScheduleDte))}` ]
        
        setMessage(message)
        setTitle('Schedule Deleted Successfully')
        setVariantType('danger')
        setShow(true)
    }

    const onUpdate = () => {
        var updateSchedule = Object.assign({}, item)
        updateSchedule.token = accSeletor.token


        console.log('onUpdate', updateSchedule);        
        let message = ['Schedule has been successfully update from your calendar ',
        'you have updated the following schedule item',
        ` - Type: ${typeList.filter(i => i.value == rTypeValue.value)[0].label} `,
        rActivity ? 
        ` - Activity: ${activityList.filter(i => i.value == rActivityValue.value)[0].label} ` :
        ` - Action: ${actionList.filter(i => i.value == rActionValue.value)[0].label} `,
        ` - Schedule Date: 
        ${new Intl.DateTimeFormat("en-GB", 
        {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(new Date(dte))}` ]
        
        setMessage(message)
        setTitle('Schedule Updated Successfully')
        setVariantType('primary')
        setShow(true)
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
                setValueObj={setRtypeValue}
            />
            {/* <AdditionTypeField
                change={change}
                rType={rActionValue == 'activity'}
                rActivityValue={rActivityValue}
                setRActivityValue={setRActivityValue}
                activityList={activityList}
                rActionValue={rActionValue}
                setRActionValue={setRActionValue}
                actionList={actionList}
            /> */}
            {/* {
             rActivityValue ?
            <EditableField
                edit={change}
                labelText={'Romance Activity'}
                list={activityList}
                valueObj={rActivityValue}
                setValueObj={setRActivityValue}
            /> :
            <EditableField
                edit={change}
                labelText={'Romance Action'}
                list={actionList}
                valueObj={rActionValue}
                setValueObj={setRActionValue}
            />
            }
            <EditableField
                edit={change}
                labelText={'Romance ' + resultType ? 'Activity' : 'Action'}
                list={resultType ? activityList : actionList}
                valueObj={rResultValue}
                setValueObj={setRResultValue}
            /> */}
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