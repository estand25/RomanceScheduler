import React, {useState} from 'react'
import {DropDownField} from '../general'

const EditableField = ({edit, labelText, selection, list}) => {
    const [valueObj, setValueObj] = useState(list.filter(i => i.value == selection)[0])

    if(edit){
        return (
            <DropDownField
                label={labelText + ': '}
                value={valueObj}
                onChange={i => setValueObj(i)}
                options={list}
            />
        )
    } else {
        return (
            <div className='logLabel'>
                {labelText + ': ' + valueObj.label}
            </div>
        )
    }
}

export default EditableField
