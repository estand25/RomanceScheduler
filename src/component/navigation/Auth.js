import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Auth = () => {
    const account = useSelector(state => state.account)

    if(account.validUser){
        return (
            <div>
                <Link to="/profile" className='nav-link'>
                    {account.username + ' Profile'}
                </Link>
                <Link to="/logout" className='nav-link'>
                    Log-out
                </Link>
            </div>
        )
    } else {
        return (
            <div>
                <Link to="/login" className='nav-link'>
                    Log-In
                </Link>
                <Link to="/signUp" className='nav-link'>
                    Sign-Up
                </Link>
            </div>
        )
    }
}

export default Auth