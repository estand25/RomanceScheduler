import React from 'react'

const GeneralBtn = ({onClick, className, text}) => {
    return (
        <div>
            <div className={className}
                style={{margin: 15}} 
                onClick={onClick}
            >
                {text}
            </div>
        </div>
    )
}

export default GeneralBtn