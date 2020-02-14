import React from 'react'
import { Link } from 'react-router-dom'
import { Auth } from '../../component'
import { useSelector } from 'react-redux'

const Links = () => {
    const account = useSelector(state => state.account)

    const ValidNavBar = () => {
        if(account.validUser){
            return (
                <div className="collpase navbar-collapse">
                    <div className="navbar-nav mr-auto">
                        <div className="collpase navbar-collapse">
                            <Link className="navbar-brand" to="/schedule">
                                Schedule
                            </Link>
                        </div>
                        <div className="collpase navbar-collapse">
                            <Link className="navbar-brand" to="/setting">
                                Setting
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="collpase navbar-collapse">
                    <div className="navbar-nav mr-auto"/>
                </div>
            )
        }
    }

    return (
        <React.Fragment>
            <Link className="navbar-brand" to="/">
                About
            </Link>
            <ValidNavBar/>
            <Auth />
        </React.Fragment>
    )
}

export default Links