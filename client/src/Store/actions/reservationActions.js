import axios from 'axios'  
import {GET_RESERVATION,
        GET_USER_RESERVATION,
        ADD_RESERVATION,
        GET_ALL_RESERVATION,
        DELETE_RESERVATION,
        UPDATE_RESERVATION,
        CONCLUDE_RESERVATION} 
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
    export const concludeReservation= (demande_id) => async dispatch =>{
        dispatch(setLoading())
        
        let result= await axios.put(`http://localhost:5000/reservation/conclude/${demande_id}`)
        dispatch({
            type:CONCLUDE_RESERVATION,
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
    // export const deleteDemande= (demande_id) => async dispatch =>{
    //     dispatch(setLoading())
        
    //     let result= await axios.delete(`http://localhost:5000/demande/delete/${demande_id}`)
    //     dispatch({
    //         type:DELETE_DEMANDE,
    //         payload:{msg:result.data.msg,
    //             demande:result.data.deleteDemande}
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
      
