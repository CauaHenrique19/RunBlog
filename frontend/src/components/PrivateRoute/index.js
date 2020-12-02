import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'

import { Context } from '../../context/context'

const PrivateRoute = (props) => {
    const { token, user } = useContext(Context)
    return props.admin ? 
        ( user.admin ? <Route {...props} /> : <Redirect to="/login" /> ) : 
        token ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute