import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRejectBtn, MessageAlert, BtnGenerator } from '../general'
import { setting } from '../../action'
import Anime from 'react-anime'
import { ItemSetting, ListSetting} from '../../component'

const FormSetting = () => {
    const dispatch = useDispatch();
    const accSelector = useSelector(state => state.account)

    const [add, onAdd] = useState(false)
    const [show, onShow] = useState(false)
    const [refresh, onRefresh] = useState(false)
    const [message, onMessage] = useState('')
    const [title, onTitle] = useState('')
    const [variantType, onVarientType] = useState('')

    useEffect(
        () => {
            let  payload = {
                userId: accSelector.userId,
                token: accSelector.token
            }

            dispatch(setting.getSettingAllToDb(payload))
        },[refresh]
    )

    const addSetting = () => onAdd(!add)
    const refreshSetting = () => onRefresh(!refresh)

    let animeItem = {
        opacity: [0,1],
        translateX: [-64,0],
        delay: (el, i) => i * 10
    }

    let animeList = {
        opacity: [0,1],
        translateY: [-64, 0],
        delay: (el, i) => i *  20
    }

    const btnList = [
        {
            className:'btn btn-success',
            onClick: () => addSetting(),
            text: 'Add'
        },
        {
            className:'btn btn-primary',
            onClick:  () => refreshSetting(),
            text: 'Refresh'
        }
    ]

    return (
        <div>
            <MessageAlert
                show={show}
                setShow={onShow}
                heading={title}
                body={message}
                variantType={variantType}
            />
            <BtnGenerator
                list={btnList}
            />
            <Anime {...animeItem}>
                <ItemSetting 
                    add={add}
                    onAdd={onAdd}
                    onShow={onShow}
                    onMessage={onMessage}
                    onTitle={onTitle}
                    onVarientType={onVarientType}
                />
            </Anime>
            <Anime {...animeList}>
                <ListSetting
                    onShow={onShow}
                    onMessage={onMessage}
                    onTitle={onTitle}
                    onVarientType={onVarientType}
                />
            </Anime>
        </div>
    )

}

export default FormSetting