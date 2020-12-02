import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Articles from './pages/Articles'
import Likes from './pages/Likes'
import Coments from './pages/Coments'

import PrivateRoute from './components/PrivateRoute'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/articles" component={Articles} />
                <PrivateRoute path="/likes" admin component={Likes} />
                <PrivateRoute path="/coments" admin component={Coments} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes