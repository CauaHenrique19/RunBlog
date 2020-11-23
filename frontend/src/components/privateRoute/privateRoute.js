import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'

import { Context } from '../../context/context'

const PrivateRoute = (props) => {
    const { token } = useContext(Context)
    return token ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute