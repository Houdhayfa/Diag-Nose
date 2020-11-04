import React,{useState} from 'react'
import {makeStyles,ThemeProvider,createMuiTheme} from '@material-ui/core'
import {Tabs,Tab,AppBar} from '@material-ui/core'
import Demandes from './TabsComponents/Demandes'
import Reservations from './TabsComponents/Reservations'
import Infos from './TabsComponents/Infos'

const theme = createMuiTheme({
    palette: {
      primary: {
        main:"#ff9800" ,
      },
      secondary: {
        main: "#000000",
      },
    },
    typography:{
        color:"#ffffff"
    }
  });
  const useStyales=makeStyles({
    root:{
      width:"700px"
    },
      appbar:{
         
        display:"flex",
        justifyContent:"center"
      },
      tab:{
        color:"white",
        textTransform:"none",
        fontFamily:"Lato",
        fontWeight:"lighter",
        fontSize:"1rem",
        '&:hover':{color:'black'}
      }
  })



function TabsBox() {
    const classes=useStyales()
const [value,setValue]=useState(0)

const handelTabs= (e,updatedValue) =>{
    console.log(updatedValue)
    setValue(updatedValue)
}


  return (
      <ThemeProvider theme={theme}>
    <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
            <Tabs value={value} onChange={handelTabs} >
                <Tab label="Infos" className={classes.tab}/>
                <Tab label="Demandes" className={classes.tab}/>
                <Tab label="Reservations" className={classes.tab}/>
            </Tabs>
        </AppBar>
        <Infos value={value} index={0}/>
        <Demandes value={value} index={1}/>
        <Reservations value={value} index={2}/>
    </div>
    </ThemeProvider>
    )
}

export default TabsBox
