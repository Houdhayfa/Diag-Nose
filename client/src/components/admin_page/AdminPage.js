import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {logout,loadUser} from '../../Store/actions/authActions'
import {getAllAteliers,unmakePartner,makePartner} from '../../Store/actions/AtelierActions'
import {getAllUsers} from '../../Store/actions/userActions'
import {getAllDemandes} from '../../Store/actions/demandesActions'
import {getAllreservations} from '../../Store/actions/reservationActions'
import {Route, } from 'react-router-dom'
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
import LockIcon from '@material-ui/icons/Lock'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People'
import AvatarWithBadge from '../profile_page/AvatarWithBadge'
import AdminTable from './adminComponenets/AdminTable'
import AdminReservations from './adminComponenets/AdminReservations'
import {blockUser,unblockUser} from '../../Store/actions/userActions'
import  EditAtelierModal from './adminComponenets/EditAtelierModal'
import  AddReservationModal from './adminComponenets/AddReservationModal'
import {deleteDemande} from '../../Store/actions/demandesActions'
import {concludeReservation,deleteReservation } from '../../Store/actions/reservationActions'

const drawerWidth = 200;

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
    color:"orange",
    
},
  toolbar: theme.mixins.toolbar,
  content: {
    display:"grid",
    height:"100vh",
    flexGrow: 1,
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
   },
   welcomText:{
     fontSize:"6rem"
   }
}));

/*########################### Function start ##########################################*/

const AdminPage=(props)=> {
  
 
  const dispatch=useDispatch()
  /*########################### get all data && load user #######################*/
  useEffect(() =>{
    dispatch(loadUser())
   
  },[])
  useEffect(() =>{
    dispatch(getAllAteliers())
  },[])
  useEffect(() =>{
    dispatch(getAllUsers())
  },[])
  useEffect(() =>{
    dispatch(getAllDemandes())
  },[])
  useEffect(() =>{
    dispatch(getAllreservations())
  },[])
  
  const currentAdmin=useSelector(state=> state.authReducer.user) //pour la salutation
  const classes = useStyles();
  const history=props.history


  /*########################### Menu items control ##########################################*/

const list=[
  {text:"Deconnexion",
      icon:<PersonAddDisabledIcon/>,
      onClick: () => {dispatch(logout());
                      history.push('/')}
  },
  {text:"Carte",
      icon:<SearchIcon/>,
      onClick: () => history.push('/search')
  },
  {text:"Utilisateurs",
      icon:<PeopleIcon />,
      onClick: () => history.push('/admin/AdminUsers')
  },
  {text:"Ateliers",
      icon:<img  width="25px" height="25px" src={`${process.env.PUBLIC_URL}/resources/Ateliers.svg`} />,
      onClick: () => history.push('/admin/AdminAteliers')
  },
  {text:"Demandes",
      icon:<img  width="30px" height="30px" src={`${process.env.PUBLIC_URL}/resources/Demandes.png`}/>,
      onClick: () => history.push('/admin/AdminDemandes')
  },
  {text:"Reservations",
      icon:<img  width="30px" height="30px" src={`${process.env.PUBLIC_URL}/resources/reservations.jpg`} />,
      onClick: () => history.push('/admin/AdminReservations')
  },
 
]

/*######################## Routes components state/props #########################*/

/*############ Users ##############*/

const stateUsers=useSelector(state=> state.userReducer.All_Users)
const userData=stateUsers.map((user)=>{
     return{
         name:user.name,
         email:user.email,
         phone:user.phone,
         id:user._id,
         status:user.isBlocked? "Bloqué":"Actif"
    }
    })
    
    const userColumns=[
        {title:'Nom',field:'name'},
        {title:'Email',field:'email'},
        {title:'Téléphone',field:'phone'},
        {title:'ID',field:'id'},
        {title:'Etat du compte',field:'status'},

    ]
const userActions=[
  {icon:()=> <LockIcon/>,
   tooltip:'Bloquer',
   onClick: (event,rowData) => { dispatch(blockUser(rowData.id));
                                 
                                   }
  },
  {icon:()=> <LockOpenIcon/>,
    tooltip:'Réactiver',
    onClick: (event,rowData) => { dispatch(unblockUser(rowData.id));
                                  
                                    }
   }
]

/*############ Ateliers ##############*/
const [openEditAtelierModal,setEditAtelierModal]=useState(false)
const [EditAtelier_id,setEditAtelier_id]=useState("")// props pour editModal
const stateAtelier=useSelector(state=> state.atelierreducer.atelier_all)
const atelierData=stateAtelier.map((atelier)=>{
     return{
         name:atelier.name,
         address:atelier.address,
         email:atelier.email,
         phone:atelier.phone,
         id:atelier._id,
         status:atelier.isPartner? "Partenaire":"Ordinaire"
    }
    })
    
    const atelierColumns=[
        {title:'Nom',field:'name'},
        {title:'Adresse',field:'address'},
        {title:'Email',field:'email'},
        {title:'Téléphone',field:'phone'},
        {title:'Status',field:'status'},

    ]
const atelierActions=[
  
  {icon:()=> <img width="25px"height="25px"src={`${process.env.PUBLIC_URL}`+'/resources/pointer.svg'}
    />,
    tooltip:'Marquer comme partenaire',
    onClick: (event,rowData) => { dispatch(makePartner(rowData.id));
                                  
                                    }
   },
  {icon:()=> <img width="25px"height="25px"src={`${process.env.PUBLIC_URL}`+'/resources/unmakePartner.svg'}
  />,
  tooltip:'Marquer comme ordinaire',
  onClick: (event,rowData) => { dispatch(unmakePartner(rowData.id));
                                
                                  }
  },
  {icon:()=> <SettingsIcon/>,
    tooltip:'modifier',
    onClick: (event,rowData) => { setEditAtelierModal(true);setEditAtelier_id(rowData.id);
                                  
                                    }
  },
  {icon:'delete',
  tooltip:'supprimer',
  onClick: (event,rowData) => { dispatch(blockUser(rowData.id));
                                
                                  }
  }
]
/*############ Demandes ##############*/

const [openAddReservationModal,setAddReservationModal]=useState(false)
const [targetDemande_id,setTargetDemande_id]=useState("")// props pour reservation modal
const dateConverter=(string) =>{
  const str=string.slice(0,10).split("-").reverse().join("-")
  return str
  }
const stateDemande=useSelector(state=> state.demandeReducer.demandes_all)
const demandeData=stateDemande.map((demande)=>{
     return{
         user_name:stateUsers.filter(user=> user._id===demande.user)[0].name,
         date:dateConverter(demande.date),
         atelier_name:stateAtelier.filter(atelier=> atelier._id===demande.atelier)[0].name,
         marque:demande.marque,
         description:demande.description,
         id:demande._id
    }
    })
    
    const demandeColumns=[
        {title:'Client',field:'user_name'},
        {title:'Date',field:'date'},
        {title:'Atelier',field:'atelier_name'},
        {title:'Marque ',field:'marque'},
        {title:'Description de la panne',field:'description'},

    ]
const demandeActions=[
  {icon:'delete',
   tooltip:'supprimer',
   onClick: (event,rowData) => { dispatch(deleteDemande(rowData.id))}
  },
  {icon:() => <img width="25px"height="25px"src={`${process.env.PUBLIC_URL}`+'/resources/reservation.svg'}/>,
    tooltip:'Créer une reservation',
    onClick: (event,rowData) => { setTargetDemande_id(rowData.id);
                                  setAddReservationModal(true)
                                    }
   }
]

/*############ Reservations ##############*/
const ateliers=useSelector(state=> state.atelierreducer.atelier_all)
const stateReservations=useSelector(state=> state.reservationReducer.reservations_all)
const reservationData=stateReservations.map((reservation)=>{
  console.log(stateAtelier.filter(atelier=> atelier._id===reservation.atelier))
 
     return{
         user_name:stateUsers.filter(user=> user._id===reservation.user)[0].name,
         date:dateConverter(reservation.date),

         atelier_name:stateAtelier.filter(atelier=> atelier._id===reservation.atelier)[0].name,
         rendezVous:reservation.rendezVous,
         admin:stateUsers.filter(user=> user._id===reservation.admin)[0].name,
         id:reservation._id,
         isConcluded:reservation.isConcluded? "Cloturée" : "En cours"
    }
    })
    
    const reservationColumns=[
        {title:'Client',field:'user_name'},
        {title:'Date de création',field:'date'},
        {title:'Rendez-vous',field:'rendezVous'},
        {title:'Atelier',field:'atelier_name'},
        {title:'Admin ',field:'admin'},
        {title:'Status',field:'isConcluded'},

    ]
const reservationActions=[
  {icon:'delete',
   tooltip:'supprimer',
   onClick: (event,rowData) => { dispatch(deleteReservation(rowData.id))}
  },
  {icon:() => <img width="35px"height="35px"src={`${process.env.PUBLIC_URL}`+'/resources/conclude.png'}/>,
    tooltip:'Clôturer',
    onClick: (event,rowData) => { dispatch(concludeReservation(rowData.id))}
   }
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
        

        {/* ################### Routes  ###################### */}
      
        <Route exact path='/admin'>
        
      </Route>
      <Route path='/admin/AdminUsers'>
        <AdminTable title ="Utilisateurs" data={userData} columns={userColumns} actions={userActions} />
      </Route>
      <Route path='/admin/AdminAteliers'>
      <AdminTable title ="Ateliers" data={atelierData} columns={atelierColumns} actions={atelierActions} />
      </Route>
      <Route path='/admin/AdminReservations'>
        <AdminTable title ="Reservations" data={reservationData} columns={reservationColumns} actions={reservationActions} />
      </Route>
      <Route path='/admin/AdminDemandes'>
        <AdminTable title ="Demandes" data={demandeData} columns={demandeColumns} actions={demandeActions} />
      </Route>
      
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
      <EditAtelierModal open={openEditAtelierModal} setOpen={setEditAtelierModal} atelier_id={EditAtelier_id} />
      <AddReservationModal open={openAddReservationModal} setOpen={setAddReservationModal} demande_id={targetDemande_id}/>
    </div>
  );
}

export default AdminPage