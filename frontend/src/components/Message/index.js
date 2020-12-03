import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './style.css'

const Message = ({ error }) => {

    const { message } = useContext(Context)

    return (
        <div className="message">
            { error && <ion-icon name="alert-circle"></ion-icon> }
            <p>{message}</p>
        </div>
    )
}

export default Message