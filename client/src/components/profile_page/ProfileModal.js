import React ,{useEffect, useState} from 'react'
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
import {editUser,loadUser} from '../../Store/actions/authActions'


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


const ProfileModal =(props) => {
  const classes = useStyles();
  const history=props.history


  
  /*######################### Input control && initial state ############################*/
  const user=useSelector(state=>state.authReducer.user)
  useEffect(() => {
    setInputName(user.name)
    setInputEmail(user.email)
    setInputPhone(user.phone)
    setUser_id(user._id)
},[user])
 
  const [inputName,setInputName]=useState("user.name")
  const [inputEmail,setInputEmail]=useState("user.email")
  const [inputPhone,setInputPhone]=useState("user.phone")
  const [user_id,setUser_id]=useState("user._id")

  console.log(`user id:${user_id}`)
  const handelEmailChange= (e) =>{
    setInputEmail(e.target.value)
  }
  const handelNameChange= (e) =>{
    setInputName(e.target.value)
  }
  const handelPhoneChange= (e) =>{
    setInputPhone(e.target.value)
  }
  
   /*######################### Dispatch & Buttons ############################*/

const dispatch=useDispatch()


const handelSubmit = () => {
    
    const formData={
        email:inputEmail,
        name:inputName,
        phone:inputPhone
    }
    dispatch(editUser(user_id,formData))
    props.setOpen(false)
    
  };
  const handleRetour = () => {
    props.setOpen(false)
    history.push('/profile') 
  };
  
  return (
    <div>
      <Dialog open={props.open} onClose={handleRetour} aria-labelledby="form-dialog-title">
          <div className={classes.modalHeader} >
         <Avatar className={classes.avatar}>
          <PersonIcon className={classes.avatarIcon} />
        </Avatar>
        <DialogTitle className={classes.title} id="form-dialog-title">Modifier mon profile</DialogTitle>
        </div>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom"
            fullWidth
            value={inputName}
            onChange={handelNameChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Adresse Email"
            type="email"
            fullWidth
            value={inputEmail}
            onChange={handelEmailChange}
          />
        
          <TextField
            margin="dense"
            id="phone"
            label="Numéro de téléphone"
            type="text"
            fullWidth
            value={inputPhone}
            onChange={handelPhoneChange}
          />
       
        </DialogContent>
        <DialogActions>
          <Button className={classes.buttons} onClick={handleRetour} >
            Retour
          </Button>
          <Button className={classes.buttons} onClick={handelSubmit} >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
function CustomStyles(props) {
    return (
      <ThemeProvider theme={theme}>
        <ProfileModal {...props}/>
      </ThemeProvider>
    );
  }
  export default withRouter(CustomStyles)