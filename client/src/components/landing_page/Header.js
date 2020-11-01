import React , {useState,useEffect}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {makeStyles,useTheme} from '@material-ui/core/styles'
import { AppBar, Collapse, CssBaseline, IconButton, Toolbar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Avatar from '@material-ui/core/Avatar'
import Login from '../login_page/Login'
import {logout} from '../../Store/actions/authActions'
import '../landing_page/styles/Header.css'


/*############################### Menu width control ##################################*/
const resolution= window.innerWidth
console.log(`Resolution:${resolution}`)
const widthControl= (res) =>{
let MenuParams={
    MenuDirection:"right",
    width:"200px"
  }
  if (res>600) {
                console.log(`Resolution:${res}`);
                return MenuParams}
  else {MenuParams={
    MenuDirection:"top",
    width:"100vw"
  } 
  return MenuParams}
  
}

let MenuParams=widthControl(resolution)
const drawerWidth = MenuParams.width
const direction=MenuParams.MenuDirection
console.log(`DrawerWidth: ${drawerWidth}`)
/*############################### Style ##################################*/

const useStyles=makeStyles((theme) => ({
    root: {
        display:"grid",
        placeItems:"center",
        height:"100vh",
        paddingTop:"20%"
       },
    appbar: {
     background:"none",
      fontFamily:"Grandstander",
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    
    appBarShift: {
        background:"none",
      fontFamily:"Grandstander",
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], 
        {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    icons:{
      color:"white",
      fontSize:"2rem"
    },
    logoText:{
        flexGrow:"2"
    },
    appbarContainer:{
        width:"98%",
        margin:"0 auto"
    },
    logoTextOrange:{
        color:"orange"
    },
    welcomText:{
        fontFamily:"Grandstander",
        color:"white"
    },
    arabicText:{
        fontFamily:"Lalezar",
        color:"white"
    },
    logoArabicTextColor:{
        fontFamily:"Lalezar",
        color:"orange"
    },
    upperTextDiv:{
        marginLeft:"14%"
    },
    downArrow:{
        
        fontSize:"4rem",
        color:"orange",
        
    },
    ArrowContainer:{
        display:"block",
        margin:"0 40%  auto auto"
    },
    hide: {
        display: 'none',
      },
    drawer: {
    width: drawerWidth,
    flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
          height:"78px",
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
      ListItemParent: {
        '&:hover': {backgroundColor: "orange",color:"white",transform:'scale(1.06)'},
         '&:hover $menutext': { fontWeight: 'bolder'},
       },
       menutext:{
        fontFamily:"Lato",
       },
       dividerColor:{
         background:"orange"
       },
       avatar:{
         marginRight:"15px"
       },
       menuicon:{
         color:"black"
       }
   
}))

 



    /*############################### Function  Header ##################################*/

function Header(props) {
  const history=props.history

     /*##################### Menu elemenets control && logout dispatch ##################################*/
const isUser=useSelector((state) => state.authReducer.isAuth)
const isAdmin=useSelector((state) =>state.authReducer.user.isAdmin)
const dispatch=useDispatch()

const MenuChanger= (isUser,isAdmin) =>{
   const List=[
    ,
    {
        text:"Inscription",
        icon:<PersonAddIcon/>,
        onClick: () => history.push('/register')
    },
    {
        text:"Recherche",
        icon:<SearchIcon/>,
        onClick: () => history.push('/search')
    },
]
const setConnectionItem = (isUser) =>{
  let connectionItem={}
  if(!isUser) {
    connectionItem={text:"Connexion",
                    icon:<PersonIcon/>,
                    onClick: () => setOpenModal(true)} 
    return connectionItem}
  if(isUser) {
      connectionItem={text:"Deconnexion",
                      icon:<PersonAddDisabledIcon/>,
                      onClick: () => dispatch(logout())}
     return connectionItem}
  }
    const  connectionItem=setConnectionItem(isUser)
    if(!isUser) {
      List.unshift(connectionItem)}
    console.log(`IS USER :${isUser}`)
    
  if (isUser) {
    List.push({text:"Profile",
               icon:<AccountCircleIcon />,
               onClick: () => history.push('/profile')});
    List.unshift(connectionItem)
}
  if (isAdmin) List.push({
  text:"Admin",
  icon:<VisibilityIcon/>,
  onClick: () => history.push('/admin')
})
return List
}
const menuItemList=MenuChanger(isUser,isAdmin)
  useEffect(()=>{
    MenuParams=widthControl(resolution)
  },[resolution])

                   /*############# Menu ON/OFF #################*/
    const [menuIsOpen,setOpen]=useState(false)
    const menuON =()=>{
        setOpen(true)
    }
    const menuOFF =()=>{
        setOpen(false)
    }
    /*############################### Menu ON/OFF ##################################*/

    const classes=useStyles()
    const theme = useTheme();
    const [checked,setChecked]=useState(false)
    useEffect(() => {
        setChecked(true);
    },[])

    /*############################ Control LOGIN modal ###########################*/

    const [isModalOpen,setOpenModal]=useState(false)


    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={2}>
             <Toolbar className={classes.appbarContainer}>
                <h1 className={classes.logoText} ><span className={classes.logoTextOrange} >Diag</span>.Nos</h1>
                <IconButton onClick={()=> menuON()} color="inherit" aria-label="open drawer" edge="end" className="myCustomButton">
                   <MenuIcon  variant="round" className={classes.icons}/>
                </IconButton>
                </Toolbar>
            </AppBar>
            <div>
            <Collapse in={checked} {...(checked ? {timeout:2000}:{})} >
                <div className={classes.upperTextDiv}>
                <Typography  variant="h4" className={classes.arabicText}>كان كرهبتك عزيزة.
                  <span className={classes.logoArabicTextColor} >عليك</span>
                </Typography>
                </div>
                
                <div>
                
                <Typography variant="h3"className={classes.welcomText}> 
                <span className={classes.logoTextOrange} >{` Diag`}</span>
                  .Nos
                  <span  className="rotativeText" >{`tic`}</span>
                  <span className={classes.arabicText} >  {`شوف اقرب  `} </span>
                </Typography>
                </div>
                
                
                
                <div>
                    <IconButton className={classes.ArrowContainer} elevation={2}>
                     <ExpandMoreIcon className={classes.downArrow}/>
                    </IconButton>
                </div>
                </Collapse>
            </div>
            <Drawer className={classes.drawer} anchor={direction} varaiant="persistent" open={menuIsOpen} classes={{
          paper: classes.drawerPaper,
        }}>
            <div className={classes.drawerHeader}>
          <IconButton  className="myCustomButton" onClick={menuOFF}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Avatar  className={classes.avatar}  src={`url(${process.env.PUBLIC_URL +'/resources/no-profile-picture.jpg'})`}/>
         <div></div>
        </div>
        <Divider classes={{root: classes.dividerColor}} variant="middle"/>
             <List>
              
          {menuItemList.map((item, index) => {
               const {text,icon,onClick}=item
              return(
              
            <ListItem button key={index} className={classes.ListItemParent} onClick={onClick}>
              <ListItemIcon className={classes.menuicon} >{icon}</ListItemIcon>
              <ListItemText disableTypography className={classes.menutext} primary={text} />
            </ListItem>
          )})}
        </List>
        </Drawer>
        <Login open={isModalOpen} setOpen={setOpenModal} />
        </div>
        
    )
}

export default withRouter(Header)
