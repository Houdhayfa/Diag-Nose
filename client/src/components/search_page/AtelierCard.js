import React from 'react';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
const useStyles = makeStyles({
  root: {
    width:"100%",
    height:"100%",
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
  
    transform: 'scale(0.8)',
  },
  pos: {
    fontSize: "1 rem",
  },
  title: {
    marginBottom: 12,
    fontSize: "0.8rem",
  },
  buttons:{
      marginLeft:"34%",
    display:"block",
    color:"white",
    backgroundColor:"orange",
    textTransform:"none",
    fontWeight:"lighter",
    fontSize:"0.9rem",
    '&:hover':{backgroundColor:"#FF8C00",transform:"scale(1.1)"}
  }
});

export default function AtelierCard(props) {
  const isAuth=useSelector(state=> state.authReducer.isAuth)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handelClick=(e)=>{
    e.stopPropagation();
    props.setOpenModal(true);
    console.log('reserver')
  }

  
// console.log(props)
  return (
    <div>
    <Card className={classes.root}>
      <CardContent>
        
        <Typography className={classes.pos} color="textSecondary">
          Nom:
        </Typography>
        <Typography className={classes.title} variant="body2" component="p">
          {props.name}
        </Typography>
        <Divider/>
        <Typography className={classes.pos} color="textSecondary">
          Adresse:
        </Typography>
        <Typography className={classes.title}  variant="body2" component="p">
        {props.address}
        </Typography>
        <Divider/>
        <Typography className={classes.pos} color="textSecondary">
          Téléphone:
        </Typography>
        <Typography className={classes.title}  variant="body2" component="p">
        {props.phone}
        </Typography>
        <Divider/>
        <Typography className={classes.pos} color="textSecondary">
          Email:
        </Typography>
        <Typography className={classes.title}  variant="body2" component="p">
        {props.email}
        </Typography>
      </CardContent>
      <CardActions>
      <Button className={classes.buttons} size="small" onClick={handelClick}>
      Reserver
      </Button>
      </CardActions>
        
          
        
      
    </Card>
    
    </div>
  );
}