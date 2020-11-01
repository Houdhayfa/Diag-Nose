import React from 'react'
import {withRouter} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Divider, ListItem, Typography } from '@material-ui/core'
import List from '@material-ui/core/List';

import '../landing_page/styles/bottom.css'
const useStyles=makeStyles((theme) => ({
    root: {
        display:"flex",
        flexDirection:"row",
        height:"40vh",
        flexWrap:"noWrap",
        
        
    },
    buttons:{
        display:"block",
        color:"white",
        backgroundColor:"orange",
        textTransform:"none",
        fontFamily:"Lato",
        fontWeight:"lighter",
        fontSize:"1rem",
        '&:hover':{backgroundColor:"#FF8C00"}
      },
      headLineLeft:{
          color:"white",
          textAlign:"center"
      },
      headLineRight:{
        color:"white",
        textAlign:"justify"
    },
      bottomSection:{
         
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          width:"50%",
          
          
          
      },
      buttonContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:"20px"
      },
      dividerColor:{
          background:"orange"
      }
    
}))

function Bottom(props) {
    const classes=useStyles()
    const history=props.history
    return (
        <List className={classes.root}>
            <ListItem className={classes.bottomSection}>
                <Typography className={classes.headLineLeft} variant="h5">Rechercher l'atelier le plus proche</Typography>
                <div className={classes.buttonContainer}>
                <Button className={classes.buttons} onClick={() => history.push('/search')} variant="contained" >Recherche</Button>
                </div>
                
            </ListItem>

            <Divider classes={{root: classes.dividerColor}}  variant="middle" orientation="vertical"/>

            <ListItem className={classes.bottomSection}>
                
                <Typography className={classes.headLineRight} variant="h5">
                Inscrivez vous pour profiter de nos offres 
                </Typography>
                <div className={classes.buttonContainer}>
                <Button className={classes.buttons} onClick={() => history.push('/register')} variant="contained" >Inscription</Button>
                </div>
                
            </ListItem>
            
        </List>
    )
}

export default withRouter(Bottom)
