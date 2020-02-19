import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '../../action'

const Profile = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const acc = useSelector(state => state.account)

    const [username, setUserName] = useState(acc.username)
    const [email, setEmail] = useState(acc.email)
    const [password, setPassword] = useState(acc.password)

    const update = () => {
        if(username != acc.username || email != acc.email || password != acc.password){
            alert('Update successfully')

            var accountPayload = {
                "userId": acc.userId,
                "token": acc.token
            }

            if(username != acc.username){
                accountPayload.username = username
            }

            if(email != acc.email){
                accountPayload.email = email
            }
            
            if(password != acc.password){
                accountPayload.password = password
            }

            dispatch(account.updateAccount(accountPayload))
        }

        history.push('/about')
    }

    const cancelUpdate = () => {
        history.push('/about')
    }

    return (
        <div className='form-group'>
            <h1>Profile</h1>
            <label className='logLabel'>User Name: </label>
            <div className="logSpace">
                <input
                    className='form-control'
                    style={{margin: 5}}
                    type='text'
                    value={username}
                    onChange={un => setUserName(un.target.value)}
                />
            </div>
            <label className='logLabel'>Email: </label>
            <div className="logSpace">
                <input
                    className='form-control'
                    style={{margin: 5}}
                    type='text'
                    value={email}
                    onChange={un => setEmail(un.target.value)}
                />
            </div>
            <label className='logLabel'>Password: </label>
            <div className="logSpace">
                <input
                    className='form-control'
                    style={{margin: 5}}
                    type='password'
                    value={password}
                    onChange={un => setPassword(un.target.value)}
                />
            </div>
            <button
                className='btn btn-success'
                style={{margin: 5}}
                onClick={update}
            >
                Update Profile
            </button>
            <button
                className='btn btn-danger'
                style={{margin: 5}}
                onClick={cancelUpdate}
            >
                Cancel
            </button>
        </div>
    )
}

export default Profile