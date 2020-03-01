import React, {useState,useEffect} from 'react'
import { MessageAlert, GeneralBtn } from '../general'
import { useSelector, useDispatch } from 'react-redux'
import { schedule } from '../../action'
import { ItemSchedule, ListSchedule } from '../../component'

const FormSchedule = () => {
    const [add, onAdd] = useState(false)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')
    const [variantType, setVariantType] = useState('')
    const dispatch = useDispatch()
    const accSeletor = useSelector(state => state.account)

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

    const refresh = () => {
        console.log('Refresh');
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
            <div className='row'>
                <GeneralBtn
                    onClick={addSchedule}
                    className={'btn btn-success'}
                    text={'Add'}
                />
                <GeneralBtn
                    onClick={refresh}
                    className={'btn btn-primary'}
                    text={'Refresh'}
                />
            </div>
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