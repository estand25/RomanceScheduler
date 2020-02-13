import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { account } from '../../action'

const LogIn = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUserName] = useState('')
    const [password, setPasssword] = useState('')

    const LI = () => {
        alert('Log-In')
        dispatch(account.authLogIn(username,password))
        history.push('/')
    }

    const CL = () => {
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
                onClick={LI}
            >
                Log-In
            </button>
            <button
                className='btn btn-primary'
                style={{margin: 15}}
                onClick={CL}
            >
                Cancel
            </button>
        </div>
    )
}

export default LogIn