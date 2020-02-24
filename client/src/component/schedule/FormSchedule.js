import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { schedule } from '../../action'
import { MessageAlert } from '../general'
import { AddSchedule, ItemSchedule, ListSchedule } from '../../component'

const FormSchedule = () => {
    const dispatch = useDispatch()
    const accSeletor = useSelector(state => state.account)
    const [add, onAdd] = useState(false)

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(
        () => {
            let payload = {
                userId: accSeletor.userId,
                token: accSeletor.token
            }

            dispatch(schedule.getSchedulesToDb(payload))
        },[]
    )

    const addSchedule = () =>{
        onAdd(!add)
    }

    return (
        <div>
            <MessageAlert
                show={show}
                setShow={setShow}
                heading={'Schedule Add Successfully'}
                body={message}
                variantType={'success'}
            />
            <AddSchedule
                addSchedule={addSchedule}
            />
            <ItemSchedule
                add={add}
                onChange={onAdd}
                setShow={setShow}
                setMessage={setMessage}
            />
            <ListSchedule />
        </div>
    )
}

export default FormSchedule