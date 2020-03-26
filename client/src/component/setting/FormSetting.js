import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRejectBtn, MessageAlert, GeneralBtn } from '../general'
import { setting } from '../../action'

const ItemSetting = ({add, onAdd, setShow, setTitle, setVarientType}) => {
    const [l_, onL_] = useState("")
    const [v_, onV_] = useState("")
    const [r_, onR_] = useState("")
    const _onAdd = () => {}
    const _Cancel = () => {}

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

const _Setting = ({ item }) => {
    
    const onEdit = () => onChange(!change)
    const onDelete = () => {}

    const _onEdit = () => {}
    const _onDelete = () => {}

    const [l_, onL_] = useState(item.label)
    const [v_, onV_] = useState(item.value)
    const [r_, onR_] = useState(item.rType)
    const [change, onChange] = useState(false)

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
                    onEdit={_onEdit}
                    onEditLabel={'Update'}
                    onDelete={_onDelete}
                    onDeleteLabel={'Cancel'}
                />
            }
        </div>
    )
}

const ListSetting = ({setShow, setMessage, setTitle, setVarientType}) => {
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

    const [refresh, onRefresh] = useState(false)
    const [add, onAdd] = useState(false)

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
            <div className='row'>
                <GeneralBtn
                    onClick={addSetting}
                    className={'btn btn-success'}
                    text={'Add'}
                />
                <GeneralBtn
                    onClick={refreshSetting}
                    className={'btn btn-primary'}
                    text={'Refresh'}
                />
            </div>
            <ItemSetting 
                add={add}
                onAdd={onAdd}
            />
            <ListSetting
            />
        </div>
    )

}

export default FormSetting