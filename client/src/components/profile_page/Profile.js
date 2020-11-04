import React from 'react';
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
import MailIcon from '@material-ui/icons/Mail';
import AvatarWithBadge from './AvatarWithBadge'
import Tabs from './Tabs'

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

const Profile=(props)=> {
  const classes = useStyles();
  const history=props.history
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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem className={classes.ListItemParent} button key={text}>
              <ListItemIcon className={classes.menuicon} >{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText disableTypography className={classes.menutext} primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider classes={{root: classes.dividerColor}} variant="middle" />
        <List>
          {['All mail', 'thrash', 'Spam'].map((text, index) => (
            <ListItem className={classes.ListItemParent} button key={text}>
              <ListItemIcon className={classes.menuicon} >{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText disableTypography className={classes.menutext} primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      
    </div>
  );
}

export default withRouter(Profile)