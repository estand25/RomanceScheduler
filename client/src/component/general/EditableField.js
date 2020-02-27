import React from 'react'
import {DropDownField} from '../general'

const EditableField = ({edit, labelText, list, valueObj, setValueObj}) => {
    console.log('EditableField', valueObj);
    
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
