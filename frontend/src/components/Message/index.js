import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './style.css'

const Message = () => {

    const { message } = useContext(Context)

    return (
        <div className="message">
            <h1>{message}</h1>
        </div>
    )
}

export default Message