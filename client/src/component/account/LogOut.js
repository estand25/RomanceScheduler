import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { account } from '../../action'

const LogOut = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const logOut = () => {
        alert('Log-Out')
        dispatch(account.setAccountLogOut())
        history.push('/about')
    }

    return (
        <button
            className="btn btn-danger"
            style={{margin: 15}}
            onClick={logOut}
        >
            LogOut
        </button>
    )
}

export default LogOut