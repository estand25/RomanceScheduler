import React, { useState } from 'react'
import Calendar from 'react-calendar'

const EditableCalendarField = ({edit, labelText, value}) => {
    const [dte, setDte] = useState(new Date(value))

    if(edit){
        return (
            <div className='calendar'>
                <Calendar
                    value={dte}
                    onChange={d => setDte(dte)}
                />
            </div>
        )
    } else {
        return (
            <div  className='logLabel'>
                {labelText + ': ' + new Intl.DateTimeFormat("en-GB", 
                {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                }).format(dte)}
            </div>
        )
    }
}

export default EditableCalendarField