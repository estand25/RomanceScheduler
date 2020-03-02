import React, {useState} from 'react'
import { DropDownField, AcceptRejectBtn, Utility } from '../general'
import { useDispatch, useSelector} from 'react-redux'
import Calendar from 'react-calendar'
import { schedule } from '../../action'
import RandomDateGene from 'random-date-generator'

const ItemSchedule = ({add, onChange, setShow, setMessage, setTitle, setVariantType}) => {
    const dispatch = useDispatch()
    const acc = useSelector(state => state.account)
    const set = useSelector(state => state.setting)

    const { activityStr, actionStr, resultList, typeList } = set

    const [romanceItem, onRomanceItemSelect] = useState('')
    const [romanceDte, onRomanceDte] = useState(new Date())
    const [romanceResult, onRomanceResult] = useState('')
    const [label, onLabel] = useState('Activity')
    const [displayList, setDisplayList] = useState(resultList.filter((i) => i.rType == 'activity'))

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
        
        let message = Utility.MessageString(
            'added', 
            new Date(romanceDte),
            romanceItem.label, 
            label,
            romanceResult.label
        )

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
                return activityStr.includes(i.value)
            })
            onLabel('Activity')
        } else {
            list = resultList.filter((i) => {
                return actionStr.includes(i.value)
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