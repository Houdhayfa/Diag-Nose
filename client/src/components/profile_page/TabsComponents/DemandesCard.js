import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'



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
  }
});

export default function DemandeCard({demandes}) {
  const classes = useStyles();
  const ateliers=useSelector(state=>state.atelierreducer.atelier_all)
  
 
          console.log(`demandes: ${demandes}`)
// console.log(` atelier:${atelierNames(ateliers,"5fa00f542987bb27c00ff9b0")}`)
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        { demandes.map((demande,index) =>{
          const x=ateliers.filter(atelier => atelier._id==demande.atelier)
          let atelier_name=x[0].name 
          return (
          < div key={index}>
          <Divider/>
          <Typography className={classes.date} variant="h5" component="h2">
           {dateConverter(demande.date)}
         </Typography>
         <Divider/>
         <div className={classes.contenu}>
         <Typography className={classes.title} color="textSecondary">
          Voiture
         </Typography>
         <Typography className={classes.pos} variant="h5" component="h2">
           {demande.marque}
         </Typography>
         <Divider/>
         <Typography className={classes.title} color="textSecondary">
          Atelier:
         </Typography>
         <Typography className={classes.pos} variant="h5" component="h2">
         {atelier_name}
         </Typography>
         <Divider/>
         
         <Typography className={classes.title} color="textSecondary">
           Description de panne
         </Typography>
         <Typography className={classes.pos} variant="h5" component="h2">
           {demande.description}
         </Typography>
         </div>
         </div>
        )})
        }
        
        
      </CardContent>
      
    </Card>
  );
}