import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import {concludeReservation }from'../../../Store/actions/reservationActions'


const dateConverter=(string) =>{
    const str=string.slice(0,10).split("-").reverse().join("-")
    return str
    }

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  date:{
    color:"orange",
    textAlign:"center",
    backgroundColor:"black"
  },
  contenu:{
    margin:"10px"
  },
  concludedSpan:{
    color:"red",
    fontStyle:"italic"
    },
  notConcludedSpan:{
    color:"#39FF14",
    fontStyle:"italic"
    },
    concludedButton:{
        backgroundColor:"#39FF14"
    },
    notconcludedButton:{
        backgroundColor:"red"
    },
    concludeSection:{
        display:"flex",
        justifyContent:"spaceEvenly"
    },
    buttons:{
        backgroundColor:"red",
        color:"white",
        borderRadius:"15px",
        marginLeft:"40%"
    }
});

export default function ReservationCard({reservations}) {
  const dispatch=useDispatch()
  const classes = useStyles();
  const ateliers=useSelector(state=>state.atelierreducer.atelier_all)
  const handelClick=() =>{
      dispatch(concludeReservation())
  }
 
          console.log(`reservations: ${reservations}`)
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        { reservations.map((reservation,index) =>{
          const x=ateliers.filter(atelier => atelier._id==reservation.atelier)
          let atelier_name=x[0].name
          let atelier_address=x[0].address
          return (
          < div key={index}>
          <Divider/>
          <Typography className={classes.date} variant="h5" component="h2">
           {dateConverter(reservation.date)}
         </Typography>
         <Divider/>
         <div className={classes.contenu}>
         <Typography className={classes.title} color="textSecondary">
          Rendez-vous le:
         </Typography>
         <Typography className={classes.pos} variant="h5" component="h2">
           {reservation.rendezVous}
         </Typography>
         <Divider/>
         <Typography className={classes.title} color="textSecondary">
          Chez:
         </Typography>
         <Typography className={classes.pos} variant="h5" component="h2">
         {atelier_name}
         </Typography>
         <Divider/>
         <Typography className={classes.title} color="textSecondary">
          Adresse:
         </Typography>
         <Typography className={classes.pos} variant="h5" component="h2">
         {atelier_address}
         </Typography>
         <Divider/>
         
         <Typography className={classes.title} color="textSecondary">
          Etat de l'affaire'
         </Typography>
         
         
            
            
            <Typography className={classes.pos} variant="h5" component="h2">
                {reservation.isConcluded ?
                <span className={classes.concludedSpan}>Affaire clôturée</span>
                :
                <span className={classes.notConcludedSpan} >Affaire active</span>}
            </Typography>


                {
                
                // a deplacer vers admin 
                
                /* <Button onClick={handelClick} className={classes.buttons}>
                    {reservation.isConcluded ?
                        <span  > Marquer comme en cours</span>
                        :<span >clôturer</span>}
                </Button> */}
         
         </div>
         </div>
        )})
        }
        
        
      </CardContent>
      
    </Card>
  );
}