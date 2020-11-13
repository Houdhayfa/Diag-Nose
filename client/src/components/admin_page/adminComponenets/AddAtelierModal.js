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
import {addAtelier} from '../../../Store/actions/AtelierActions'
import AddCircleIcon from '@material-ui/icons/AddCircle'
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
    width:"'40px",
    height:"'40px",
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


const AddAtelierModal =(props) => {
  const classes = useStyles();
  const history=props.history

 
  
  /*######################### Input control ############################*/
  

 

  const [inputName,setInputName]=useState("")
  const [inputEmail,setInputEmail]=useState("")
  const [inputPhone,setInputPhone]=useState("")
  const [inputAddress,setInputAddress]=useState("")
  const [inputLatitude,setInputLatitude]=useState("")
  const [inputLongitude,setInputLongitude]=useState("")
  
  
  const handelEmailChange= (e) =>{
    setInputEmail(e.target.value)
  }
  const handelNameChange= (e) =>{
    setInputName(e.target.value)
  }
  const handelPhoneChange= (e) =>{
    setInputPhone(e.target.value)
  }
  const handelAddressChange= (e) =>{
    setInputAddress(e.target.value)
  }
  const handelLatitudeChange= (e) =>{
    setInputLatitude(e.target.value)
  }
  const handelLongitudeChange= (e) =>{
    setInputLongitude(e.target.value)
  }
  
   /*######################### Dispatch & Buttons ############################*/

const dispatch=useDispatch()


const handelSubmit = () => {
    
    const formData={
        email:inputEmail,
        name:inputName,
        phone:inputPhone,
        address:inputAddress,
        latitude:inputLatitude,
        longitude:inputLongitude
    }
    dispatch(addAtelier(formData))
    props.setOpen(false)
    history.push('/admin/AdminAteliers') 
  };
  const handleRetour = () => {
    props.setOpen(false)
    history.push('/admin') 
  };
  
  return (
    <div>
      <Dialog open={props.open} onClose={handleRetour} aria-labelledby="form-dialog-title">
          <div className={classes.modalHeader} >
         <Avatar className={classes.avatar}>
         <img  width="25px" height="25px" src={`${process.env.PUBLIC_URL}/resources/Ateliers.svg`} />
        </Avatar>
        <DialogTitle className={classes.title} id="form-dialog-title">Ajouter Atelier</DialogTitle>
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
           <TextField
            margin="dense"
            id="address"
            label="Adresse"
            type="text"
            fullWidth
            value={inputAddress}
            onChange={handelAddressChange}
          />
           <TextField
            margin="dense"
            id="latitude"
            label="Latitude"
            type="number"
            fullWidth
            value={inputLatitude}
            onChange={handelLatitudeChange}
          />
           <TextField
            margin="dense"
            id="longitude"
            label="Longitude"
            type="number"
            fullWidth
            value={inputLongitude}
            onChange={handelLongitudeChange}
          />
       
        </DialogContent>
        <DialogActions>
          <Button className={classes.buttons} onClick={handleRetour} >
            Retour
          </Button>
          <Button className={classes.buttons} onClick={handelSubmit} >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
function CustomStyles(props) {
    return (
      <ThemeProvider theme={theme}>
        <AddAtelierModal {...props}/>
      </ThemeProvider>
    );
  }
  export default withRouter(CustomStyles)