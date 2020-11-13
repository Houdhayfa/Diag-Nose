import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {register} from '../../Store/actions/authActions'
import {withRouter} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles,ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors'
import Toast from './Toast'
import ErrorToast from './ErrorToast'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${process.env.PUBLIC_URL +'/resources/register0.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "orange",
    color:"black",
  },
  form: {
    width: '100%', 
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily:"Lato",
    fontWeight:"lighter",
    fontSize:"1rem",
    '&:hover':{backgroundColor:"#FF8C00"}
  },
  tiltle:{fontFamily:"Lato"},
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

}))
                         /* ########## theme ########*/
const theme = createMuiTheme({
  palette: {
    primary: {main:orange[500]}
  }
})

 /*################ Function Register Start ####################*/

const Register= (props) => {

const classes = useStyles();
const history=props.history

/*################## Form value control ##################*/

const [nameInput,setNameInput]=useState("")
const [emailInput,setEmailInput]=useState("")
const [phoneInput,setPhoneInput]=useState("")
const [passwordInput,setPasswordInput]=useState("")
const handelNameInput=(e) =>{
  setNameInput(e.target.value)
}
const handelEmailInput=(e) =>{
  setEmailInput(e.target.value)
}
const handelPhoneInput=(e) =>{
  setPhoneInput(e.target.value)
}
const handelPasswordInput=(e) =>{
  setPasswordInput(e.target.value)
}

const handelConfirm= (e) =>{
  e.preventDefault()
  dispatch(register({
    name:nameInput,
    email:emailInput,
    phone:phoneInput,
    password:passwordInput
  }))
  
}

/*######################### Toast ###########################*/
const message=useSelector((state) => state.authReducer.msg)
const errMessage=useSelector(state => state.authReducer.err)
const dispatch=useDispatch()

return (
  <Grid container component="main" className={classes.root}>
    <div className={classes.toolbar} />
    <Grid item xs={false} sm={6} md={8} className={classes.image} />
    <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography className={classes.title} component="h1" variant="h5">
          Créer un compte
        </Typography>
        <form onSubmit={handelConfirm} className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nom"
            name="name"
            autoComplete="name"
            value={nameInput}
            onChange={handelNameInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email "
            name="email"
            autoComplete="email"
            value={emailInput}
            onChange={handelEmailInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Numéro de Téléphone"
            name="phone"
            autoComplete="phone"
            value={phoneInput}
            onChange={handelPhoneInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={passwordInput}
            onChange={handelPasswordInput}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            S'inscrire
          </Button>
        </form>
      </div>
    </Grid>
    <Toast msg={message}/>
    <ErrorToast msg={errMessage} />
  </Grid>
  
    
  );
}
function CustomStyles() {
  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
}
export default withRouter(CustomStyles)
