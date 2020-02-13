import React from 'react'
import { Link } from 'react-router-dom'
import { Auth } from '../../component'

const Links = () => {
    return (
        <React.Fragment>
            <Link className="navbar-brand" to="/">
                About
            </Link>
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
            <Auth />
        </React.Fragment>
    )
}

export default Links