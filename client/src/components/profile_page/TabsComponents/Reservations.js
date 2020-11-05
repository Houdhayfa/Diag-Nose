import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getUserreservations} from '../../../Store/actions/reservationActions'
import ReservationCard from './ReservationCard'

function Reservations(props) {
    const {value,index}=props


    const dispatch=useDispatch()
  const user=useSelector((state) => state.authReducer.user)
  useEffect(()=> {
    dispatch(getUserreservations(user._id))
  },[user])
    const reservations=useSelector(((state)=>state.reservationReducer.reservations_user))
    return (
        <div>
          {value==index? (
            <ReservationCard reservations={reservations}/>
           
          ):null}  
        </div>
    )
}

export default Reservations
