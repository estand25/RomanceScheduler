import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { account } from '../../action'

const LogOut = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const LO = () => {
        alert('Log-Out')
        // dispatch(account.setAuthLog(false))
        dispatch(account.setAuthLogOut())
        history.push('/about')
    }

    return (
        <button
            className="btn btn-success"
            style={{margin: 15}}
            onClick={LO}
        >
            LogOut
        </button>
    )
}

export default LogOut