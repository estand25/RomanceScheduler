import React from 'react'

const AddSchedule = ({addSchedule}) => {
    return (
        <div>
            <div className='btn btn-success'
                style={{margin: 15}} 
                onClick={addSchedule}
            >
                Add
            </div>
        </div>
    )
}

export default AddSchedule