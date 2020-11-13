import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Register from './Register'
import {resetError,resetMessage} from '../../Store/actions/authActions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height:"100vh"
  },
  appBar: {
    fontFamily:"Grandstander",
    background:"black",
  },
  logoTextOrange:{
    color:"orange"
},
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3,0),
  },

  logoTextOrange:{
    color:"orange"
},
logoContainer:{
    fontFamily:"Grandstander",
    background:"none",
    height:"64px",
    color:"white",
    '&:hover':{cursor:"pointer"}
},

}));

const RegisterPage=(props)=> {
const dispatch=useDispatch()
  useEffect(()=>{
dispatch(resetError())
  },[])
  useEffect(()=>{
    dispatch(resetMessage())
},[])
  const classes = useStyles();
  const history=props.history
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <div className={classes.logoContainer} onClick={() => history.push('/')} >
        <h1 className={classes.logoText} ><span className={classes.logoTextOrange} >Diag</span>.Nos</h1>
        </div>
       
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
       <Register/>
      </main>
      
      
    </div>
  );
}

export default withRouter(RegisterPage)