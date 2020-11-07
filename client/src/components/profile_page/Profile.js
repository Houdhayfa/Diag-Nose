import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../Store/actions/authActions'
import {getAllAteliers} from '../../Store/actions/AtelierActions'
import {withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import AvatarWithBadge from './AvatarWithBadge'
import Tabs from './Tabs'
import ProfileModal from './ProfileModal'

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    fontFamily:"Grandstander",
    background:"black",

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  logoTextOrange:{
    color:"orange"
},
  toolbar: theme.mixins.toolbar,
  content: {
    display:"grid",
    placeContent:"center",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  avatarContainer:{
      height:"64px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
  },
  logoTextOrange:{
    color:"orange"
},
logoContainer:{
    fontFamily:"Grandstander",
    background:"none",
    height:"64px",
    color:"white",
    '&:hover':{cursor:"pointer"}
},
ListItemParent: {
       
    '&:hover': {backgroundColor: "orange",color:"white",transform:'scale(1.08)'},
     '&:hover $menutext': { fontWeight: 'bolder'},
        
   },
   menuicon:{
    color:"black"
  },
   menutext:{
    fontFamily:"Lato",
   },
   dividerColor:{
     background:"orange"
   }
}));

/*########################### Function start ##########################################*/

const Profile=(props)=> {
  
 
  const dispatch=useDispatch()
  /*########################### get all ateliers && load user #######################*/
  useEffect(() =>{
   dispatch(getAllAteliers())
  })// parceque DemandeCard useffect est plus vite le state 
  
  const classes = useStyles();
  const history=props.history

  /*########################### Modal control #######################*/
  const [isModalOpen,setOpenModal]=useState(false)
  /*########################### Menu items control ##########################################*/

const list=[
  {text:"Deconnexion",
      icon:<PersonAddDisabledIcon/>,
      onClick: () => {dispatch(logout());
                      history.push('/')}
  },
  {text:"Recherche",
      icon:<SearchIcon/>,
      onClick: () => history.push('/search')
  },
  {text:"Modifier mon profile",
      icon:<SettingsIcon/>,
      onClick: () => setOpenModal(true)
  },
]
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <div className={classes.logoContainer} onClick={() => history.push('/')} >
        <h1 className={classes.logoText} ><span className={classes.logoTextOrange} >Diag</span>.Nos</h1>
        </div>
       
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
       <Tabs/>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
                  <div className={classes.avatarContainer}>
                  <AvatarWithBadge />
                  </div>
        <div  />
        <Divider classes={{root: classes.dividerColor}} variant="middle"/>
        <List>
          {list.map((item, index) => {
            const {text,icon,onClick}=item
            return (
            <ListItem className={classes.ListItemParent} button key={text} onClick={onClick}>
              <ListItemIcon className={classes.menuicon} >{icon}</ListItemIcon>
              <ListItemText disableTypography className={classes.menutext} primary={text} />
            </ListItem>
          )
          })}
        </List>
       
      </Drawer>
      <ProfileModal open={isModalOpen} setOpen={setOpenModal} />
    </div>
  );
}

export default withRouter(Profile)