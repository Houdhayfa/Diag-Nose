import axios from 'axios'  
import {GET_USER_RESERVATION,GET_ALL_RESERVATION,CONCLUDE_RESERVATION,ADD_RESERVATION,DELETE_RESERVATION} 
        from '../const/actionTypes'

import {setLoading} from './authActions'

export const getUserreservations= (user_id) => async dispatch =>{
    dispatch(setLoading())
    
    let result= await axios.get(`http://localhost:5000/user/reservation_all/${user_id}`)
    dispatch({
        type:GET_USER_RESERVATION,
        payload:{msg:result.data.msg,
                 reservations_user:result.data.reservations}
    })
    }
    export const concludeReservation= (reservation_id) => async dispatch =>{
        dispatch(setLoading())
        
        let result= await axios.put(`http://localhost:5000/reservation/conclude/${reservation_id}`)
        dispatch({
            type:CONCLUDE_RESERVATION,
            payload:{msg:result.data.msg}
        })
        dispatch(getAllreservations())
        }
    export const getAllreservations= () => async dispatch => {
        dispatch(setLoading())
        
        let result= await axios.get(`http://localhost:5000/reservation/all`)
        dispatch({
            type:GET_ALL_RESERVATION,
            payload:{msg:result.data.msg,
                     reservations_all:result.data.reservations_all}
        })
        }
        export const addReservation= (demande_id,formdata) => async dispatch => {
            dispatch(setLoading())
            
            let result= await axios.post(`http://localhost:5000/reservation/add/${demande_id}`,formdata)
            dispatch({
                type:ADD_RESERVATION,
                payload:{msg:result.data.msg}
            })
            dispatch(getAllreservations())
            }
        
        export const deleteReservation= (reservation_id) => async dispatch =>{
            dispatch(setLoading())
            
            let result= await axios.delete(`http://localhost:5000/reservation/delete/${reservation_id}`)
            dispatch({
                type:DELETE_RESERVATION,
                payload:{msg:result.data.msg}
            })
            dispatch(getAllreservations())
            }
    // export const getDemandeById= (demande_id) => async dispatch =>{
    //     dispatch(setLoading())
        
    //     let result= await axios.get(`http://localhost:5000/demande/${demande_id}`)
    //     dispatch({
    //         type:GET_DEMANDE,
    //         payload:{msg:result.data.msg,
    //                  demande:result.data.demande}
    //     })
    //     }
    // export const addDemande= (atelier_id,demande) => async dispatch =>{
    //     dispatch(setLoading())
        
    //     let result= await axios.post(`http://localhost:5000/demande/add/${atelier_id}`,demande)
    //     dispatch({
    //         type:ADD_DEMANDE,
    //         payload:{msg:result.data.msg,
    //                 demande:result.data.demande}
    //     })
    //     }
   
    // export const editDemande = (demande_id) => async dispatch =>{
    //     dispatch(setLoading())
        
    //     let result= await axios.put(`http://localhost:5000/demande/editDemande/${demande_id}`)
    //     dispatch({
    //         type:UPDATE_DEMANDE,
    //         payload:{msg:result.data.msg,
    //                 updatedDemande:result.data.updatedDemande}
    //     })
    //     }
      
