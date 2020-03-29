import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRejectBtn, Utility } from '../general'
import { setting } from '../../action'
import ReadOnlySetting from '../setting/ReadOnlySetting'
import EditSetting from '../setting/EditSetting'

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

export default _Setting