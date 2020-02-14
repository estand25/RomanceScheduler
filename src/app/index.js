import React from 'react'
import '../index.css'

import regeneratorRuntime from "regenerator-runtime";

import {
    NavBar
} from '../component'

import {
    LogIn,
    LogOut,
    Profile,
    SignUp,
    About,
    Setting,
    Schedule,
} from '../page'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store'

import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={About} />
                        <Route path="/login" exact component={LogIn} />
                        <Route path="/logout" exact component={LogOut} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/signUp" exact component={SignUp} />
                        <Route path="/about" exact component={About} />
                        <Route path="/schedule" exact component={Schedule} />
                        <Route path="/setting" exact component={Setting} />
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App
