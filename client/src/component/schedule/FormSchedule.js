import React, {useState} from 'react'
import { AddSchedule, ItemSchedule, ListSchedule } from '../../component'

const FormSchedule = () => {
    const [add, onAdd] = useState(false)

    const addSchedule = () =>{
        onAdd(!add)
    }

    return (
        <div>
            <AddSchedule
                addSchedule={addSchedule}
            />
            <ItemSchedule
                add={add}
                onChange={onAdd}
            />
            <ListSchedule />
        </div>
    )
}

export default FormSchedule