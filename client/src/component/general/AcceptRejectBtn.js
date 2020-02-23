import React from 'react'

const AcceptRejectBtn = ({acceptStyle, acceptOnClick, acceptText, rejectStyle, rejectOnClick, rejectText}) => {
    return (
        <div>
            <button
                className={acceptStyle}
                style={{margin:15}}
                onClick={acceptOnClick}
            >
                {acceptText}
            </button>
            <button
                className={rejectStyle}
                style={{margin:15}}
                onClick={rejectOnClick}
            >
                {rejectText}
            </button>
        </div>
    )
}

export default AcceptRejectBtn