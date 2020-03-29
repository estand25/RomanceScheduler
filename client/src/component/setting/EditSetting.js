import React from 'react'
import { AcceptRejectBtn } from '../general'

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

export default EditSetting