import React from 'react'
import { useSelector } from 'react-redux'
import {_Setting } from '../../component'

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

export default ListSetting