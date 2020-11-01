import React ,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {ThemeProvider,createMuiTheme,makeStyles} from '@material-ui/core/styles'
import {orange} from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import {login} from '../../Store/actions/authActions'


                  /*############### theme ################*/
const useStyles = makeStyles((theme) => ({
buttons:{
    fontFamily:"Lato",
    fontWeight:"lighter",
    fontSize:"1rem",
    '&:hover':{backgroundColor:"#FF8C00"}
  },

  title:{
    fontFamily:"Lato"
  },
  modalHeader:{
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
  marginTop:"20px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "orange",
    color:"black",
  },
  avatarIcon:{
      fontSize:"2rem"
  }
 
}))

const theme = createMuiTheme({
    palette: {
      primary: {main:orange[500]}
    }
  })
 
  /*###################### Function Start #############################*/


const LoginModal =(props) => {
  const classes = useStyles();
  const history=props.history


  
  /*######################### Input control ############################*/

  const [inputEmail,setInputEmail]=useState("")
  const [inputPassword,setInputPassword]=useState("")
  const handelEmailChange= (e) =>{
    setInputEmail(e.target.value)
  }
  const handelPasswordChange= (e) =>{
    setInputPassword(e.target.value)
  }
   /*######################### Dispatch & Buttons ############################*/

const dispatch=useDispatch()

const handleConnexion = () => {
    const formData={
        email:inputEmail,
        password:inputPassword
    }
    dispatch(login(formData))
    props.setOpen(false)
    // history.push('/profile') 
  };
  const handleRetour = () => {
    props.setOpen(false)
    history.push('/') 
  };
  
  return (
    <div>
      <Dialog open={props.open} onClose={handleRetour} aria-labelledby="form-dialog-title">
          <div className={classes.modalHeader} >
         <Avatar className={classes.avatar}>
          <PersonIcon className={classes.avatarIcon} />
        </Avatar>
        <DialogTitle className={classes.title} id="form-dialog-title">Se connecter</DialogTitle>
        </div>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Adresse Email"
            type="email"
            fullWidth
            value={inputEmail}
            onChange={handelEmailChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            value={inputPassword}
            onChange={handelPasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button className={classes.buttons} onClick={handleRetour} >
            Retour
          </Button>
          <Button className={classes.buttons} onClick={handleConnexion} >
            Connexion
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
function CustomStyles(props) {
    return (
      <ThemeProvider theme={theme}>
        <LoginModal {...props}/>
      </ThemeProvider>
    );
  }
  export default withRouter(CustomStyles)