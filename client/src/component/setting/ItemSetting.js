import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Utility } from '../general'
import EditSetting from './EditSetting'

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

export default ItemSetting