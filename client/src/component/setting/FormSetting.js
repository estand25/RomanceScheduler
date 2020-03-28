import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { AcceptRejectBtn, MessageAlert, Utility } from '../general'
import { setting } from '../../action'
import Anime from 'react-anime'

const ItemSetting = ({add, onAdd, onShow, onMessage, onTitle, onVarientType}) => {
    const dispatch = useDispatch()
    const acc = useSelector(state => state.account)

    const [l_, onL_] = useState("")
    const [v_, onV_] = useState("")
    const [r_, onR_] = useState("")

    const _onAdd = () => {
        var newSetting = {
            label: l_,
            value: v_,
            rType: r_,
            userId: acc.userId,
            token: acc.token
        }

        let payload = {
            userId: acc.userId,
            token: acc.token
        }

        let message = Utility.MessageString2(
            'added',
            l_,
            v_,
            r_
        )

        onMessage(message)
        onTitle('Setting Added Successfully')
        onVarientType('success')

        dispatch(setting.addSettingResultToDb(newSetting))
            .then(i => {
                dispatch(setting.getSettingAllToDb(payload))
            })

        onL_('')
        onV_('')
        onR_('')

        onShow(true)
        onAdd(!add)
    }

    const _Cancel = 
        () => onAdd(!add)

    const _Else = () => {
        onL_("")
        onV_("")
        onR_("")

        return <></>
    }

    if(add){
        return (
            <div className='listWrapper'>
                <EditSetting
                    lLabel={'Label: '}
                    vLabel={l_}
                    onLabel={o => onL_(o.target.value)}
                    lValue={'Value: '}
                    vValue={v_}
                    onValue={o => onV_(o.target.value)}
                    lRType={'rType: '}
                    vRType={r_}
                    onRType={o => onR_(o.target.value)}
                    onEdit={_onAdd}
                    onEditLabel={'Add'}
                    onDelete={_Cancel}
                    onDeleteLabel={'Cancel'}
                />
            </div>
        )
    } else {
        return <_Else />
    }
}

const EditSetting = ({lLabel, vLabel, onLabel, lValue, vValue, onValue, lRType, vRType, onRType, onEdit, onEditLabel, onDelete, onDeleteLabel}) => {
    return (
        <div>
            <label className="logLabel">{lLabel}</label><br/>
            <input className="form-control"
                type="text"
                value={vLabel}
                onChange={onLabel}
            /><br/>
            <label className="logLabel">{lValue}</label><br/>
            <input className="form-control"
                type="text"
                value={vValue}
                onChange={onValue}
            /><br/>
            <label className="logLabel">{lRType}</label><br/>
            <input className="form-control"
                type="text"
                value={vRType}
                onChange={onRType}
            /><br/>
            <AcceptRejectBtn
                acceptStyle='btn btn-success'
                acceptOnClick={onEdit}
                acceptText={onEditLabel}
                rejectStyle='btn btn-danger'
                rejectOnClick={onDelete}
                rejectText={onDeleteLabel}
            />
        </div>
    )
}

const ReadOnlySetting = ({lLabel, vLabel, lValue, vValue, lRType, vRType}) => {
    return (
        <div>
            <label className="logLabel">{lLabel}</label>
            <label className="logLabel">{vLabel}</label>
            <br/>
            <label className="logLabel">{lValue}</label>
            <label className="logLabel">{vValue}</label>
            <br/>
            <label className="logLabel">{lRType}</label>
            <label className="logLabel">{vRType}</label>
            <br/>
        </div>        
    )
}

const _Setting = ({ item, onShow, onMessage, onTitle, onVarientType })  => {
    const dispatch = useDispatch()
    const acc = useSelector(state => state.account)

    const [l_, onL_] = useState(item.label)
    const [v_, onV_] = useState(item.value)
    const [r_, onR_] = useState(item.rType)
    const [change, onChange] = useState(false)
    
    const onEdit = () => onChange(!change)
    const _onDelete = () => onChange(!change)

    const onDelete = () => {
        let deleteSetting = Object.assign({}, item)
        deleteSetting.token = acc.token

        let payload = {
            userId: acc.userId,
            token: acc.token
        }

        onMessage(Utility.MessageString2(
            'deleted',
            l_,
            v_,
            r_
        ))
        onTitle('Deleted Setting Successfully')
        onVarientType('danger')

        dispatch(setting.deleteSettingToDo(deleteSetting)
            .then(i => {
                dispatch(setting.getSettingAll(payload))
            }))

        onShow(true)
    }
    
    const _onUpdate = () => {
        var updateSetting = Object.assign({}, item)
        updateSetting.token = acc.token
        updateSetting.label = l_
        updateSetting.value = v_
        updateSetting.rType = r_

        let payload = {
            token: acc.token
        }

        onMessage(Utility.MessageString2(
            'updated',
            l_,
            v_,
            r_
        ))
        onTitle('Updated Setting Successfully')
        onVarientType('primary')

        dispatch(setting.updateSettingToDo(updateSetting))
            .then(i => {
                dispatch(setting.getSettingAllToDb(payload))
            })
        
        onShow(true)
        onChange(!change)
    }

    return (
        <div className='listWrapper'>
            <AcceptRejectBtn
                acceptStyle='btn btn-outline-success'
                acceptOnClick={onEdit}
                acceptText='Edit'
                rejectStyle='btn btn-outline-danger'
                rejectOnClick={onDelete}
                rejectText='Delete'
            />
            { !change ? 
                <ReadOnlySetting
                    lLabel={'Label:'}
                    vLabel={l_}
                    lValue={'Value:'}
                    vValue={v_}
                    lRType={'rType:'}
                    vRType={r_}
                />
            :
                <EditSetting
                    lLabel={'Label:'}
                    vLabel={l_}
                    onLabel={l => onL_(l.target.value)}
                    lValue={'Value:'}
                    vValue={v_}
                    onValue={l => onV_(l.target.value)}
                    lRType={'rType:'}
                    vRType={r_}
                    onRType={l => onR_(l.target.value)}
                    onEdit={_onUpdate}
                    onEditLabel={'Update'}
                    onDelete={_onDelete}
                    onDeleteLabel={'Cancel'}
                />
            }
        </div>
    )
}

const ListSetting = ({ onShow, onMessage, onTitle, onVarientType }) => {
    const settingSelector = useSelector(state => state.setting)

    if(settingSelector.resultList.length > 0){
        return (
            <div>
                {settingSelector.resultList
                    .map(item => (
                        <_Setting
                            key={item._id}
                            item={item}
                            onShow={onShow}
                            onMessage={onMessage}
                            onTitle={onTitle}
                            onVarientType={onVarientType}
                        />
                    ))
                }
            </div>
        )
    } else {
        return (
            <div className='addWrapper'>
                {'You have not current setting'}
            </div>
        )
    }
}

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

    return (
        <div>
            <MessageAlert
                show={show}
                setShow={onShow}
                heading={title}
                body={message}
                variantType={variantType}
            />
            <AcceptRejectBtn
                acceptStyle='btn btn-success'
                acceptOnClick={addSetting}
                acceptText={'Add'}
                rejectStyle='btn btn-primary'
                rejectOnClick={refreshSetting}
                rejectText={'Refresh'}
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