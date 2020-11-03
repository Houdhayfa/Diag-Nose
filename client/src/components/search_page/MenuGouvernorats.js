import React ,{useState,useEffect}from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from'@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {viewPortsList} from './viewPortsCenters'

const useStyles=makeStyles({
    button:{
     backgroundColor:"orange",
     '&:hover': {backgroundColor: "orange",color:"white",transform:'scale(1.08)'},
     fontFamily:"Lato"
    },
    ListItemParent: {
        '&:hover': {backgroundColor: "orange",color:"white",transform:'scale(1.08)',
        '& .MuiListItemText-primary':{color:'white'}},
        '&:hover $menutext': { fontWeight: 'bolder'},
        
    },
    menutext:{
        '& .MuiListItemText-primary': {fontFamily:"Lato"}
    },
})
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
  ListItemParent: {
    '&:hover': {backgroundColor: "orange",
                color:"white",
                transform:'scale(1.08)',
               '& .MuiListItemText-primary':{color:"white"}
               }
            }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: "white",
      },
    },
  },
}))(MenuItem);

export default function MenuGouvernorats(props) {
const classes=useStyles()
   
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.button}
      >
        Villes
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        {viewPortsList.map((item, index) => (
           
            <StyledMenuItem button key={index} 
            className={classes.ListItemParent}
            onClick={()=>{
              const {latitude,longitude,width,height,zoom}=item
              props.setViewport({latitude,longitude,width,height,zoom})
            }
              }
            >
              <ListItemText primary={item.ville} className={classes.menutext}  />
            </StyledMenuItem>
          ))}
      </StyledMenu>
    </div>
  );
}