import React, {useState} from 'react'
import { MessageAlert } from '../general'
import { AddSchedule, ItemSchedule, ListSchedule } from '../../component'

const FormSchedule = () => {
    const [add, onAdd] = useState(false)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')
    const [variantType, setVariantType] = useState('')

    const addSchedule = () =>{
        onAdd(!add)
    }

    return (
        <div>
            <MessageAlert
                show={show}
                setShow={setShow}
                heading={title}
                body={message}
                variantType={variantType}
            />
            <AddSchedule
                addSchedule={addSchedule}
            />
            <ItemSchedule
                add={add}
                onChange={onAdd}
                setShow={setShow}
                setMessage={setMessage}
                setTitle={setTitle}
                setVariantType={setVariantType}
            />
            <ListSchedule 
                setShow={setShow}
                setMessage={setMessage}
                setTitle={setTitle}
                setVariantType={setVariantType}
            />
        </div>
    )
}

export default FormSchedule