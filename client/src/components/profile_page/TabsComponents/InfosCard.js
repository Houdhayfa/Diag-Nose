import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'




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

export default function InfosCard() {
  const classes = useStyles();
  const user=useSelector(state=>state.authReducer.user)
  const [infos,setInfos]=useState({})
 useEffect(()=>{
setInfos({
  name:user.name,
  phone:user.phone,
  email:user.email
})
 },[user])
         
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
      
          < div >
         
         <div className={classes.contenu}>
         <Typography className={classes.title} color="textSecondary">
          Nom
         </Typography>
         <Typography className={classes.pos} variant="h5" component="h2">
           {infos.name}
         </Typography>
         <Divider/>
         <Typography className={classes.title} color="textSecondary">
          Email:
         </Typography>
         <Typography className={classes.pos} variant="h5" component="h2">
         {infos.email}
         </Typography>
         <Divider/>
         
         <Typography className={classes.title} color="textSecondary">
           Numéro de téléphone:
         </Typography>
         <Typography className={classes.pos} variant="h5" component="h2">
           {infos.phone}
         </Typography>
         </div>
         </div>
        
        
        
        
      </CardContent>
      
    </Card>
  );
}