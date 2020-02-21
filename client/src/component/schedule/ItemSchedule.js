import React, {useState} from 'react'
import Select from 'react-select'
import Calendar from 'react-calendar'
import RandomDateGene from 'random-date-generator'

const RomanceTypeOptions = [
    {value: 'activity', label: 'Activity'},
    {value: 'action', label: 'Action'}
]

const ActivityListOptions = [
    {value: 'movienight', label: 'Movie Night'},
    {value: 'parkwalk', label: 'Park Walk'},
    {value: 'inhomedinner', label: 'In-Home Dinner'},
    {value: 'restaurants', label: 'Restaurants'}
]

const ActionListOptions = [
    {value: 'flowers', label: 'Flowers'},
    {value: 'nothingbundtcake', label: 'Nothing Bundt Cake'},
    {value: 'wine', label: 'Wine'}
]

const DropDownField = ({label, value, onChange, options}) =>{
    return (
        <div>
            <label className="logLabel">{label}</label>
            <Select
                value={value}
                onChange={onChange}
                options={options}
            />
        </div>
    )
}

const ItemSchedule = ({add}) => {
    const [romanceItem, onRomanceItemSelect] = useState('')
    const [activityItem, onActivityItemSelect] = useState('')
    const [actionItem, onActionItemSelect] = useState('')
    const [romanceDte, onRomanceDte] = useState(new Date())

    const onAdd = () => {
        console.log('Romance Item', romanceItem);
        console.log('Romance Activity', activityItem);
        console.log('Romance Action', actionItem);
        console.log('Calender', romanceDte.toDateString());
    }

    const Item = () => {
        if(add){
            return (
                <div className="addWrapper">
                    <DropDownField
                        label={'Romance Item:'}
                        value={romanceItem}
                        onChange={r => onRomanceItemSelect(r.value)}
                        options={RomanceTypeOptions}
                    />
                    <DropDownField
                        label={'Romance Activity:'}
                        value={activityItem}
                        onChange={i => onActivityItemSelect(i.value)}
                        options={ActivityListOptions}
                    />
                    <DropDownField
                        label={'Romance Action:'}
                        value={actionItem}
                        onChange={i => onActionItemSelect(i.value)}
                        options={ActionListOptions}
                    />
                    <div className='calendar'>
                        <Calendar
                            value={romanceDte}
                            onChange={c => onRomanceDte(c)}
                        />
                    </div>
                    <button
                        className='btn btn-outline-success'
                        style={{margin:15}}
                        onClick={onAdd}
                    >
                        Add
                    </button>
                    <button
                        className='btn btn-outline-danger'
                        style={{margin:15}}
                    >
                        Cancel
                    </button>
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