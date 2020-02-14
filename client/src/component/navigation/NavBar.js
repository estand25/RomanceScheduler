import React from 'react'
import { Links } from '../../component'

const NavBar = () => {
    return (
        <div className='container'>
            <div className='navbar navbar-expand-lg navbar-dark bg-dark'
                style={{marginBottom: 20}}>
                <Links />
            </div>
        </div>
    )
}

export default NavBar