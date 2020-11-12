import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

function PrivateRoute({component:Component,...rest}) {
    const isAuth=useSelector(state=> state.authReducer.isAuth)
    if(!isAuth) {
        return <Redirect to={"/"}/>
    }
    return <Route componenet={Component} {...rest} />
}

export default PrivateRoute
