import React from 'react'
import { Alert } from 'react-bootstrap'

const MessageAlert = ({show, setShow, heading, body, variantType}) => {
    if(show){
        return (
            <Alert autoFocus variant={variantType} onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{heading}</Alert.Heading>
                {body.map(line => (
                    <p key={line}>{line}</p>
                ))}
            </Alert>
        )
    } else {
        return <></>
    }
}

export default MessageAlert
