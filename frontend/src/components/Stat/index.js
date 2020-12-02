import React from 'react'

import './style.css'

const Stat = ({ children, className }) => {
    return (
        <div className={'stat ' + className}>
            {children}
        </div>
    )
}

export default Stat