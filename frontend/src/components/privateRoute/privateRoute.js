import React from 'react'
import { Route, Redirect } from 'react-router'

const PrivateRoute = (props) => {
    const isLoged = !!localStorage.getItem('token')
    return isLoged ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute