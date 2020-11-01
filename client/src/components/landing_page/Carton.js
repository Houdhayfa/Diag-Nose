import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    maxHeight:350,
    borderRadius:"3%",
    border:"solid 0.5px orange",
    marginBottom:"50px"
  },
  buttonContainer:{
    dispaly:"flex",
    justifyContent:"center"
  },
  buttons:{
    color:"white",
    backgroundColor:"orange",
    fontWeight:"lighter",
    fontSize:"1rem",
    
  },
  textContainer:{
    textAlign:"center"
  },
  CardText:{
   color:"black",
   fontWeight:"bold"
  }
});

export default function Carton() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={process.env.PUBLIC_URL+'/resources/TunisMap.jpg'}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.textContainer} >
          
          <Typography className={classes.CardText} variant="body3" color="textSecondary" component="p">
            Trouvez facilement l'atelier de diagnostic auto le plus proche de vous
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonContainer}>
        <Button className={classes.buttons} size="small" color="orange">
          Chercher
        </Button>
        
      </CardActions>
    </Card>
  );
}