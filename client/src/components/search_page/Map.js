import React,{useState,useEffect,useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import ReactMapGl, { Marker,GeolocateControl,NavigationControl,Popup } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import {setRTLTextPlugin} from 'react-map-gl'
import {makeStyles} from '@material-ui/core/styles'
import RoomIcon from '@material-ui/icons/Room';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import {getAllAteliers} from '../../Store/actions/AtelierActions'
import AtelierCard from './AtelierCard'
import AddDemandeModal from './AddDemandeModal'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const mapboxApiAccessToken=process.env.REACT_APP_MAPBOX_TOKEN
//arabe
setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    null,
    true
  );
   
  /*#################  style ######################*/
  const useStyle=makeStyles({
    root:{
      width:'100%',
      height:'89vh'
    },
    avatar: {
      
        backgroundColor: "orange",
        color:"black",
      },
      logoTextOrange:{
        color:"orange"
    },
   
  })

  /*############################ navigationController style ###################################*/
const navStyle={position: 'absolute',
                right: "50%",
                top:"70vh"}
  
 /*############################################## Function start ############################################*/


 function Search(props) {
  const classes=useStyle()
  //import state
  const [atelier_all,setAtelier_all]=useState([])
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getAllAteliers())
  },[])
  const atelier_list=useSelector((state) => state.atelierreducer.atelier_all)
  useEffect(() => {
    setAtelier_all(atelier_list)
  },[atelier_list])

  const  [shownPopup,setShownPopup]=useState({})
  const mapRef=useRef()
  
  /*########################## AdddemandeModal control ###################################*/
  const [openModal,setOpenModal]=useState(false)
  
    return (
     <div className={classes.root} >


        <ReactMapGl 
        ref={mapRef}
        {...props}
        >
          
           {atelier_all.map((atelier) => (
             <>
            <Marker setShownPopup={setShownPopup} key={atelier._id}latitude={atelier.latitude} longitude={atelier.longitude} offsetLeft={-20} offsetTop={-30}>
                <Avatar className={classes.avatar}>
                <Button onClick={e => {  
                                        setShownPopup({[atelier._id]:true})}}>
                {atelier.isPartner?  <img 
                                    width="30px"height="30px"
                                    src={`${process.env.PUBLIC_URL}`+'/resources/pointer.svg'}
                                    />: <RoomIcon/>}
                </Button>
                </Avatar>
            </Marker>
            {shownPopup[atelier._id]? (
              <Popup
              
            anchor={"top"}
            closeOnClick={false}
            closeButton={true}
            onClose={() => setShownPopup({[atelier._id]:false})}
            latitude={atelier.latitude} 
            longitude={atelier.longitude}
            offsetTop={10}>
              <AtelierCard
              
              setOpenModal={setOpenModal}
              openModal={openModal}
              name={atelier.name}
              phone={atelier.phone}
              email={atelier.email}
              address={atelier.address}
              
              />
              <AddDemandeModal open={openModal} setOpen={setOpenModal} atelier_id={atelier._id}/>
            </Popup>) : null}
            
            </>
           ))
            
            }
       
        <div style={{position: 'absolute',top:"14.5%",transform: `translate(${20}px, ${0}px)`}}>
          <NavigationControl  />
         
        </div>
        {/* <Geocoder
        style={{position:"static"}}
        mapboxApiAccessToken={mapboxApiAccessToken}
        mapRef={mapRef}
        label={"Chercher un lieux"}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto={true}
        onViewportChange={(viewport) => {viewport.zoom=12
                                        props.setViewport(viewport)}}
        /> */}
        <GeolocateControl
         style={{position:"static"}}
          label={"Ma position"}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          auto={true}
          onViewportChange={(viewport) => {viewport.zoom=12
                                          props.setViewport(viewport)}}
          style={{width:"29px",marginTop:"2%",transform: `translate(${20}px, ${0}px)` }}
        />
        </ReactMapGl>
     </div>
    )
}

export default Search
