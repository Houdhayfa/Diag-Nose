import axios from 'axios'
import {LOGIN_USER,REGISTER,GET_AUTH_USER,AUTH_ERROR,LOGOUT_USER, SET_LOADING} from '../const/actionTypes'




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
    console.log(error)
    dispatch({
        type:AUTH_ERROR,
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
        console.log(error)
        dispatch({
            type:AUTH_ERROR,

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
    dispatch({
        type:AUTH_ERROR,
    })  
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
  