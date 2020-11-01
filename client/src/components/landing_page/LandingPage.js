import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Header from './Header'
import Bottom from './Bottom'
import Toast from '../register_page/Toast'
const useStyles=makeStyles((theme) => ({
    root: {
        minHeight:"100vh",
        backgroundImage:`url(${process.env.PUBLIC_URL +'/resources/background_dark.jpg'})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
    },
    cardsContainer:{
        display:"grid",
        placeItems:"center"
    },
    
}))


function LandingPage() {

/*######################### Toast ###########################*/
const message=useSelector((state) => state.authReducer.msg)

const classes=useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Header/>
            <Bottom/>
            <Toast msg={message}/>
        </div>
    )
}

export default LandingPage
