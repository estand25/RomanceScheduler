import React from 'react'
import ReactDom from 'react-dom'
import './src/index.css'
import regeneratorRuntime from "regenerator-runtime"
import App from './src/app'

ReactDom.render(
    <App />,
    document.getElementById('app')
)