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
import {addReservation} from '../../../Store/actions/reservationActions'

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
    width:"55px",
    height:"55px",
    margin: theme.spacing(1),
    backgroundColor: "orange",
    color:"black",
  },
  avatarIcon:{
      width:"35px",
      width:"35px"
  }
 
}))

const theme = createMuiTheme({
    palette: {
      primary: {main:orange[500]}
    }
  })
 
  /*###################### Function Start #############################*/
  

const AddReservationModal =(props) => {
  const classes = useStyles();
  const history=props.history

  const dispatch=useDispatch()
  
  console.log(props)
  /*######################### Input control && initial state ############################*/
  const demande_id=props.demande_id
  const demandes_all=useSelector(state => state.demandeReducer.demandes_all)
  const targetDemande=demandes_all.filter(demande => demande._id===demande_id)[0]
  const currentAdmin=useSelector(state=>state.authReducer.user)
 

  const [inputRendezVous,setInputRendezVous]=useState("")

  
  const handelRendezVousChange= (e) =>{
    setInputRendezVous(e.target.value)
  }
  
  
   /*######################### Dispatch & Buttons ############################*/




const handelSubmit = () => {
    
    const formData={
        rendezVous:inputRendezVous,
    }
    dispatch(addReservation(demande_id,formData))
    props.setOpen(false)
    
  };
  const handleRetour = () => {
    props.setOpen(false)
    history.push('/admin/AdminDemandes') 
  };
  
  return (
    <div>
      <Dialog open={props.open} onClose={handleRetour} aria-labelledby="form-dialog-title">
          <div className={classes.modalHeader} >
         <Avatar className={classes.avatar}>
           <img className={classes.avatarIcon} src={`${process.env.PUBLIC_URL}`+'/resources/reservation.svg'}/>
        </Avatar>
        <DialogTitle className={classes.title} id="form-dialog-title">Veuillez introduire la date de la reservation</DialogTitle>
        </div>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="rendezVous"
            label="Date de Reservation"
            fullWidth
            value={inputRendezVous}
            onChange={handelRendezVousChange}
          />
      
       
        </DialogContent>
        <DialogActions>
          <Button className={classes.buttons} onClick={handleRetour} >
            Retour
          </Button>
          <Button className={classes.buttons} onClick={handelSubmit} >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
function CustomStyles(props) {
    return (
      <ThemeProvider theme={theme}>
        <AddReservationModal {...props}/>
      </ThemeProvider>
    );
  }
  export default withRouter(CustomStyles)