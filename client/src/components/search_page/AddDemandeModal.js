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
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DialogTitle from '@material-ui/core/DialogTitle'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import {addDemande} from '../../Store/actions/demandesActions'
import Toast from '../register_page/Toast'
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
    width:"70px",
    height:"70px",
    margin: theme.spacing(1),
    backgroundColor: "orange",
    color:"black",
  },
  avatarIcon:{
    width:"50px",
    height:"50px",
      fontSize:"2rem"
  }
 
}))

const theme = createMuiTheme({
    palette: {
      primary: {main:orange[500]}
    }
  })
 
  /*###################### Function Start #############################*/


const AddDemandeModal =(props) => {
  const classes = useStyles();
  const history=props.history

console.log(props)
  
  /*######################### Input control ############################*/

  const [inputMarque,setInputMarque]=useState("")
  const [inputDescription,setInputDescription]=useState("")

  const handelMarqueChange= (e) =>{
    setInputMarque(e.target.value)
  }
  const handelDescriptionChange= (e) =>{
    setInputDescription(e.target.value)
  }
   /*######################### Dispatch & Buttons ############################*/

const dispatch=useDispatch()

const handleConfirmer = () => {
    const formData={
        marque:inputMarque,
        description:inputDescription
    }
    dispatch(addDemande(props.atelier_id,formData))
    props.setOpen(false)
  };
  const handleRetour = () => {
    props.setOpen(false)
    history.push('/search') 
  };
  /*######################### State pour Toast ############################*/

  const msg=useSelector(state=>state.demandeReducer.msg)
  return (
    <div>
      <Dialog open={props.open} onClose={handleRetour} aria-labelledby="form-dialog-title">
          <div className={classes.modalHeader} >
         <Avatar className={classes.avatar}>
          <EventAvailableIcon className={classes.avatarIcon}/>
        </Avatar>
        <DialogTitle className={classes.title} id="form-dialog-title">Reserver </DialogTitle>
        </div>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="marque"
            label="Marque de la voiture"
            type="text"
            fullWidth
            value={inputMarque}
            onChange={handelMarqueChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description de la panne"
            type="text"
            fullWidth
            value={inputDescription}
            onChange={handelDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button className={classes.buttons} onClick={handleRetour} >
            Retour
          </Button>
          <Button className={classes.buttons} onClick={handleConfirmer} >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      <Toast msg={msg}/>
    </div>
  );
}
function CustomStyles(props) {
    return (
      <ThemeProvider theme={theme}>
        <AddDemandeModal {...props}/>
      </ThemeProvider>
    );
  }
  export default withRouter(CustomStyles)