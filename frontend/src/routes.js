import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Articles from './pages/Articles'

import PrivateRoute from './components/privateRoute/privateRoute'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/articles" component={Articles} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes