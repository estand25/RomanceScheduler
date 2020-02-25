import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRejectBtn, EditableField, EditableCalendarField } from '../general'
import { schedule } from '../../action'

const Schedule = ({item, setShow, setMessage, setTitle, setVariantType}) => {
    const {rType, rActivity, rAction, rScheduleDte} = item
    const dispatch = useDispatch()
    const accSeletor = useSelector(state => state.account)
    const schSeletor = useSelector(state => state.schedule)
    const [change, onChange] = useState(false)

    const onEdit = () => {
        onChange(!change)
    }

    const onDelete = () => {
        var deleteSchedule = Object.assign({}, item)
        deleteSchedule.token = accSeletor.token
        
        dispatch(schedule.deleteScheduleToDb(deleteSchedule))

        let message = ['Schedule has been successfully deleted from your calendar ',
        'you have deleted the following schedule item',
        ` - Type: ${schSeletor.typeList.filter(i => i.value == rType)[0].label} `,
        rActivity ? 
        ` - Activity: ${schSeletor.activityList.filter(i => i.value == rActivity)[0].label} ` :
        ` - Action: ${schSeletor.actionList.filter(i => i.value == rAction)[0].label} `,
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
        ` - Type: ${schSeletor.typeList.filter(i => i.value == rType)[0].label} `,
        rActivity ? 
        ` - Activity: ${schSeletor.activityList.filter(i => i.value == rActivity)[0].label} ` :
        ` - Action: ${schSeletor.actionList.filter(i => i.value == rAction)[0].label} `,
        ` - Schedule Date: 
        ${new Intl.DateTimeFormat("en-GB", 
        {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(new Date(rScheduleDte))}` ]
        
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
                selection={rType}
                list={schSeletor.typeList}
            />
            {rActivity ?
                <EditableField
                    edit={change}
                    labelText={'Romance Activity'}
                    selection={rActivity}
                    list={schSeletor.activityList}
                /> :
                <EditableField
                    edit={change}
                    labelText={'Romance Action'}
                    selection={rAction}
                    list={schSeletor.actionList}
                />
            }
            <EditableCalendarField
                edit={change}
                labelText={'Romance Date'}
                value={rScheduleDte}
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