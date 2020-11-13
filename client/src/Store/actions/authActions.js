import axios from 'axios'
import {LOGIN_USER,REGISTER,GET_AUTH_USER,AUTH_ERROR,LOGOUT_USER, SET_LOADING,EDIT_USER,RESET_ERROR,RESET_MESSAGE} from '../const/actionTypes'




const setAuthHeader=(token) =>{
    
        if(token) {
            axios.defaults.headers.common['x-auth-token'] = token;
        } else {
            delete axios.defaults.headers.common['x-auth-token']
        }
    
    
}

export const register = (Formdata) => async dispatch =>{
    dispatch(setLoading())
try {
    const response= await axios.post('http://localhost:5000/auth/register',Formdata)
    dispatch({
        type:REGISTER,
        payload:response.data
    })
} 
catch (error) {
    const err=error.response.data
    console.log(err)
    dispatch({
        type:AUTH_ERROR,
        payload:{err:err}
    })
}
}

export const login = (Formdata) => async dispatch =>{
    dispatch(setLoading())
    try {
        const response= await axios.post('http://localhost:5000/auth/login',Formdata)
        dispatch({
            type:LOGIN_USER,
            payload:response.data
        })
    } 
    catch (error) {
        const err=error.response.data
        console.log(err)
        dispatch({
            type:AUTH_ERROR,
            payload:{err:err}
        })
    }
    }

export const loadUser=()=> async dispatch =>{
setAuthHeader(localStorage.token)
dispatch(setLoading())
try {
    const res= await axios.get('http://localhost:5000/auth/getAuth')
dispatch({
    type:GET_AUTH_USER,
    payload:res.data
})
} 
catch (error) {
    console.log(error)
   
}

}
 export const setLoading =() => dispatch =>{
dispatch({
    type:SET_LOADING,
})
}
export const logout =() => dispatch =>{
    
    dispatch({
        type:LOGOUT_USER,
    })
    }
    export const editUser = (user_id,Formdata) => async dispatch =>{
        dispatch(setLoading())
        try {
            const response= await axios.put(`http://localhost:5000/user/editUser/${user_id}`,Formdata)
            dispatch({
                type:EDIT_USER,
                payload:response.data.msg
            })
            dispatch(loadUser())
        } 
        catch (error) {
            console.log(error)
           
        }
        }
    export const resetError = () => async dispatch =>{
        
        try {
            dispatch({
                type:RESET_ERROR,
            })
            
        } 
        catch (error) {
            console.log(error)
            
        }
        }
    export const resetMessage = () => async dispatch =>{
       
        try {
            dispatch({
                type:RESET_MESSAGE,
            })
            
        } 
        catch (error) {
            console.log(error)
            
        }
        }
  