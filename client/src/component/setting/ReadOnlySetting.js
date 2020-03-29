import React from 'react'

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

export default ReadOnlySetting