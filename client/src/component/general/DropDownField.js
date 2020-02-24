import React from 'react'
import Select from 'react-select'

const DropDownField = ({label, value, onChange, options}) =>{
    return (
        <div>
            <label className="logLabel">{label}</label>
            <Select
                value={value}
                onChange={onChange}
                options={options}
                defaultValue={value}
            />
        </div>
    )
}

export default DropDownField