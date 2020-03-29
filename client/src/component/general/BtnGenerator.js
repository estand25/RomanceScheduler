import React from 'react'

const BtnGenerator = ({list}) => {
    return (
        <div>
            {list
                .map(it => (
                    <button
                        key={it.text+'_'+it.className}
                        className={it.className}
                        style={{margin:15}}
                        onClick={it.onClick}
                    >
                        {it.text}
                    </button>
                ))

            }
        </div>
    )
}

export default BtnGenerator