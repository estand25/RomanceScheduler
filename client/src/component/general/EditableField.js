import React from 'react'
import {DropDownField} from '../general'
import _ from 'lodash'

const EditableField = ({edit, labelText, list, valueObj, setValueObj}) => {    
    let valueObject

    if(_.isArray(valueObj)){
        valueObject = Object.assign({}, valueObj[0])
    } else {
        valueObject = Object.assign({}, valueObj)
    }

    if(edit){
        return (
            <DropDownField
                label={labelText + ': '}
                value={valueObject}
                onChange={setValueObj}
                options={list}
            />
        )
    } else {
        if(valueObject == undefined){
            return <></>
        }

        return (
            <div className='logLabel'>
                {labelText + ': ' + valueObject.label}
            </div>
        )
    }
}

export default EditableField
