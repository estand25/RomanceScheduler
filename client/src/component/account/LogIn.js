import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '../../action'

const LogIn = () => {
    const acc = useSelector(state => state.account)
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUserName] = useState('')
    const [password, setPasssword] = useState('')

    const logIn = async() => {
        dispatch(account.AccountLogIn(username, password))
        
        history.push('/')
    }

    const cancelLogIn = () => {
        alert('Cancel Log-In')
    }

    return (
        <div className="form-group">
            <h1>Log-In</h1>
            <label className='logLabel'>User Name: </label>
            <div className='logSpace'>
                <input 
                    className="form-control"
                    style={{margin: 5}}
                    type="text"
                    value={username}
                    onChange={un => setUserName(un.target.value)}
                />
            </div>
            <label className='logLabel'>Password: </label>
            <div className='logSpace'>
                <input 
                    className="form-control"
                    style={{margin: 5}}
                    type="password"
                    value={password}
                    onChange={un => setPasssword(un.target.value)}
                />
            </div>
            <button
                className='btn btn-success'
                style={{margin: 15}}
                onClick={logIn}
            >
                Log-In
            </button>
            <button
                className='btn btn-danger'
                style={{margin: 15}}
                onClick={cancelLogIn}
            >
                Cancel
            </button>
        </div>
    )
}

export default LogIn