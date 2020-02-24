import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRejectBtn, EditableField } from '../general'
import { schedule } from '../../action'

const Schedule = ({item}) => {
    const {rType, rActivity, rAction} = item
    const dispatch = useDispatch()
    const accSeletor = useSelector(state => state.account)
    const schSeletor = useSelector(state => state.schedule)
    const [change, onChange] = useState(false)

    const onEdit = () => {
        onChange(!change)
    }

    const onDelete = () => {
        // alert('Delete Item')
        var deleteSchedule = Object.assign({}, item)
        deleteSchedule.token = accSeletor.token
        
        console.log('onDelete', deleteSchedule);
        
        // dispatch(schedule.deleteScheduleToDb())
    }

    const onUpdate = () => {
        var updateSchedule = Object.assign({}, item)

        console.log('onUpdate', updateSchedule);
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