import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './style.css'

const Message = () => {

    const { message } = useContext(Context)

    return (
        <div className="message">
            <p>{message}</p>
        </div>
    )
}

export default Message