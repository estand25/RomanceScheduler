import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRejectBtn, MessageAlert, GeneralBtn } from '../general'

const ItemSettig = ({add, onAdd, setShow, setTitle, setVarientType}) => {

}

const ListSetting = ({setShow, setMessage, setTitle, setVarientType}) => {
    
}

const FormSetting = () => {
    const dispatch = useDispatch();
    const setSelector = useSelector(state => state.setting)

    const onEdit = () => {}

    const onDelete = () => {}

    const addSetting = () => {}

    const refreshSetting = () => {}

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
            <div className='listWrapper'>
                <AcceptRejectBtn
                    acceptStyle='btn btn-outline-success'
                    acceptOnClick={onEdit}
                    acceptText='Edit'
                    rejectStyle='btn btn-outline-danger'
                    rejectOnClick={onDelete}
                    rejectText='Delete'
                />
                <div>test</div>
            </div>

        </div>
    )

}

export default FormSetting