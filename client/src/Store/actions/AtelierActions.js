import axios from 'axios'
import {GET_ATELIER,ADD_ATELIER,GET_ALL_ATELIER,DELETE_ATELIER,UPDATE_ATELIER,SET_LOADING} from '../const/actionTypes'


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