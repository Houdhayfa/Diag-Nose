import axios from 'axios'
import {GET_ALL_ATELIER,SET_LOADING,MAKE_PARTNER,UNMAKE_PARTNER,GET_ATELIER,UPDATE_ATELIER,ADD_ATELIER} from '../const/actionTypes'


export const setLoading =() => dispatch =>{
    dispatch({
        type:SET_LOADING,
    })
    }
export const getAllAteliers = () => async dispatch =>{
    dispatch(setLoading())
    
    try {
        const response= await axios.get('http://localhost:5000/atelier/all')
        dispatch({
            type:GET_ALL_ATELIER,
            payload:response.data
        })
    } 
    catch (error) {
        console.log(error)
        // dispatch({
        //     type:AUTH_ERROR,
        // })
    }
}
export const getTargetAtelier = (atelier_id) => async dispatch =>{
    dispatch(setLoading())
   const result=await axios.get(`http://localhost:5000/atelier/${atelier_id}`)
   dispatch({
       type:GET_ATELIER,
      payload: {targetAtelier:result.data.targetAtelier,
       msg:result.data.msg}
   })
 }

export const makePartner = (atelier_id) => async dispatch =>{
    try {
        const response=await axios.put(`http://localhost:5000/atelier/makePartner/${atelier_id}`)
        dispatch({
            type:MAKE_PARTNER,
            payload:{msg:response.data.msg,
                    isPartner:response.data.updatedAtelier.isPartner}
        })
        dispatch(getAllAteliers())
    } 
    catch (error) {
        console.log(error)
    }
} 
export const unmakePartner = (atelier_id) => async dispatch =>{
    try {
        const response=await axios.put(`http://localhost:5000/atelier/unmakePartner/${atelier_id}`)
        dispatch({
            type:UNMAKE_PARTNER,
            payload:{msg:response.data.msg,
                    isPartner:response.data.updatedAtelier.isPartner}
        })
        dispatch(getAllAteliers())
    } 
    catch (error) {
        console.log(error)
    }
}
export const editAtelier = (atelier_id,formData) => async dispatch =>{
    try {
        const response=await axios.put(`http://localhost:5000/atelier/editAtelier/${atelier_id}`,formData)
        dispatch({
            type:UPDATE_ATELIER,
            payload:{msg:response.data.msg}
        })
        dispatch(getAllAteliers())
    } 
    catch (error) {
        console.log(error)
    }
}

export const addAtelier = (formData) => async dispatch =>{
    try {
        const response=await axios.post(`http://localhost:5000/atelier/add`,formData)
        dispatch({
            type:ADD_ATELIER,
            payload:{msg:response.data.msg}
        })
        dispatch(getAllAteliers())
    } 
    catch (error) {
        console.log(error)
    }
}