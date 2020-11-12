import React,{useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
    const {msg}=props
    useEffect(() => {
        if (msg==="Compte ajouté") setOpen(true)
        if (msg==="Vous êtes connecté") setOpen(true)
        if (msg==="Vous êtes déconnecté") setOpen(true)
        if (msg==="Demande enregistrée") setOpen(true)
        if (msg==="demande supprimée") setOpen(true)
        if (msg==="utilisateur bloqué") setOpen(true)
        if (msg==="compte réactivé") setOpen(true)
        if (msg==="Reservation enregistrée") setOpen(true)
        if (msg==="Reservation clôturée") setOpen(true)
        if (msg==="Reservation supprimée") setOpen(true)
    },[msg])

    console.log(msg)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
         {props.msg}
        </Alert>
      </Snackbar>
      
    </div>
  );
}