import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { AcceptRejectBtn, MessageAlert, GeneralBtn, Utility } from '../general'
import { setting } from '../../action'

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

    const _Cancel = () => {
        onAdd(!add)
    }

    if(add){
        return (
            <div className='listWrapper'>
                <EditSetting
                    lLabel={'Label: '}
                    vLabel={l_}
                    onLabel={onL_}
                    lValue={'Value: '}
                    vValue={v_}
                    onValue={onV_}
                    lRType={'rType: '}
                    vRType={r_}
                    onRType={onR_}
                    onEdit={_onAdd}
                    onEditLabel={'Add'}
                    onDelete={_Cancel}
                    onDeleteLabel={'Cancel'}
                />
            </div>
        )
    } else {
        return <></>
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
                    onLabel={l => onL_(l)}
                    lValue={'Value:'}
                    vValue={v_}
                    onValue={l => onV_(l)}
                    lRType={'rType:'}
                    vRType={r_}
                    onRType={l => onR_(l)}
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
    const setSelector = useSelector(state => state.setting)
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

    const onEdit = () => {}

    const onDelete = () => {}

    const addSetting = () => onAdd(!add)

    const refreshSetting = () => onRefresh(!refresh)

    return (
        <div>
            <AcceptRejectBtn
                acceptStyle='btn btn-success'
                acceptOnClick={addSetting}
                acceptText={'Add'}
                rejectStyle='btn btn-primary'
                rejectOnClick={refreshSetting}
                rejectText={'Refresh'}
            />
            <ItemSetting 
                add={add}
                onAdd={onAdd}
                onShow={onShow}
                onMessage={onMessage}
                onTitle={onTitle}
                onVarientType={onVarientType}
            />
            <ListSetting
            />
        </div>
    )

}

export default FormSetting