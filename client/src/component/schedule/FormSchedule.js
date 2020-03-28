import React, {useState, useEffect} from 'react'
import { MessageAlert, GeneralBtn, AcceptRejectBtn } from '../general'
import { useSelector, useDispatch } from 'react-redux'
import { schedule, setting } from '../../action'
import { ItemSchedule, ListSchedule } from '../../component'
import Anime from 'react-anime';

const FormSchedule = () => {
    const dispatch = useDispatch()
    const accSeletor = useSelector(state => state.account)

    const [add, onAdd] = useState(false)
    const [show, setShow] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')
    const [variantType, setVariantType] = useState('')

    useEffect(
        () => {
            let payload = {
                userId: accSeletor.userId,
                token: accSeletor.token
            }

            dispatch(schedule.getSchedulesToDb(payload))
            dispatch(setting.getSettingAllToDb(payload))
        },[refresh]
    )  

    const addSchedule = () =>{
        onAdd(!add)
    }

    const refreshSchedule = () => {
        setRefresh(!refresh)
    }

    let animeAddSchedule = {
        opacity: [0,1],
        translateX: [-64,0],
        delay: (el, i) => i * 10
    }

    let animeListSchedule = {
        opacity: [0,1],
        translateY: [-64, 0],
        delay: (el, i) => i *  20
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
            <AcceptRejectBtn
                acceptStyle='btn btn-success'
                acceptOnClick={addSchedule}
                acceptText={'Add'}
                rejectStyle='btn btn-primary'
                rejectOnClick={refreshSchedule}
                rejectText={'Refresh'}
            />
            <Anime {...animeAddSchedule}>
                <ItemSchedule
                    add={add}
                    onChange={onAdd}
                    setShow={setShow}
                    setMessage={setMessage}
                    setTitle={setTitle}
                    setVariantType={setVariantType}
                />
            </Anime>
            <Anime {...animeListSchedule}>
                <ListSchedule 
                    setShow={setShow}
                    setMessage={setMessage}
                    setTitle={setTitle}
                    setVariantType={setVariantType}
                />
            </Anime>
        </div>
    )
}

export default FormSchedule