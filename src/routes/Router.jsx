import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Index from '../pages/Index'
import Viewmovie from '../pages/Viewmovie'
import Addmovie from '../pages/Addmovie'
import Login from '../pages/Login'
import Profile from '../pages/Profile'


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Index} exact />
                <Route path="/view_movie/:id" component={Viewmovie} exact />
                <Route path="/add" component={Addmovie} exact />
                <Route path="/Login" component={Login} exact />
                <Route path="/profile" component={Profile} exact />

            </Switch>
        </BrowserRouter>
    )
}

export default Router