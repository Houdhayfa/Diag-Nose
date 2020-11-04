import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getUserDemandes} from '../../../Store/actions/demandesActions'

function Demandes(props) {
  const user=useSelector((state) => state.authReducer.user)
  const dispatch=useDispatch()
  const [demandes,setDemandes]=useState()
  console.log(user)
  useEffect(()=> {
    dispatch(getUserDemandes(user._id))
  })
    const {value,index}=props
    return (
        <div>
          {value==index? (
           <h1> Demandes</h1>
          ):null}  
        </div>
    )
}

export default Demandes
