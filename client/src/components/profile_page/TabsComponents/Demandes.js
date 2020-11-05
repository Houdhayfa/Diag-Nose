import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getUserDemandes} from '../../../Store/actions/demandesActions'
import { makeStyles } from '@material-ui/core/styles';

import DemandeCard from './DemandesCard'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



/*########################## function start ########################*/

function Demandes(props) {
  const classes = useStyles();
  const {value,index}=props// tabs props
  const dispatch=useDispatch()
  const user=useSelector((state) => state.authReducer.user)
  useEffect(()=> {
    dispatch(getUserDemandes(user._id))
  },[user])
    const demandes=useSelector(((state)=>state.demandeReducer.demandes_user))
    return (
        <div>
          {value==index? (
            <DemandeCard demandes={demandes}/>
          ):null}  
        </div>
    )
}

export default Demandes
