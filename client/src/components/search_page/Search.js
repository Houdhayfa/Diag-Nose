import React ,{useState,useEffect}from 'react';
import {withRouter} from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Map from './Map'
import MenuGouvernorats from './MenuGouvernorats'

const mapboxApiAccessToken=process.env.REACT_APP_MAPBOX_TOKEN
const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  root: {
    width:"100%",
    height:"100vh",
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    fontFamily:"Grandstander",
    background:"black",
  },
  arrow: {
      '&:hover':{background:"orange",color:"white",transform:"scale(1.02)"},
      marginRight: theme.spacing(2),
  },
  logoContainer:{
   '&:hover':{cursor:"pointer"},
   display:"flex",
   justifyContent:"center"
  },
  logoTextOrange: {
    color:"orange"
},

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  dividerColor:{
    background:"orange"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
 
  
  content: {
    marginTop:theme.spacing(8),
    flexGrow: 1,
   
    
  },
  
}));
/*########################   Function start ##############################*/

const  Search= (props) =>  {
  const history=props.history
  const classes = useStyles();
  const theme = useTheme();
  

  /*########################   viewport control ##############################*/
  
    const [viewport,setViewport]=useState({
        latitude:36.80278,
        longitude:10.17972,
        width:"100%",
        height:"100%",
        zoom:12
    })
   
 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            
            edge="start"
            className={classes.arrow}
            onClick= {() => {history.push('/')}}
          >
            <ChevronLeftIcon />
          </IconButton>
            
                
                <MenuGouvernorats setViewport={setViewport}/>
             
            
        </Toolbar>
        
      </AppBar>
      
      <main className={classes.content}>
        
        
       <Map mapboxApiAccessToken={mapboxApiAccessToken}
        {...viewport}
        
        onViewportChange={(viewport) => {setViewport(viewport)}}
        mapStyle={"mapbox://styles/mightyghoul/ckgz98yxv24ok19pfz45cu67o"}
        setViewport={setViewport}
        />
      </main>
    </div>
  );
}
export default withRouter(Search)