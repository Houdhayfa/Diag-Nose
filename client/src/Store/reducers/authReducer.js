import {LOGIN_USER,REGISTER,GET_AUTH_USER,AUTH_ERROR,LOGOUT_USER,SET_LOADING,EDIT_USER} from '../const/actionTypes'

const initState={
    token:localStorage.getItem('token'),
    user:{},
    isLoading:false,
    isAuth:false,
    msg:""
}
export default function (state = initState , {type,payload}) {
switch (type) {
    case REGISTER:
        return {...state,isLoading:false,user:payload.user,msg:payload.msg};
    case LOGIN_USER:
        localStorage.setItem("token",payload.token)
        return {...state,isLoading:false,isAuth:true, user:payload.user,msg:payload.msg};
    case AUTH_ERROR:
        return {...state,isLoading:false,isAuth:false,...payload};
    case SET_LOADING:
        return {...state,isLoading:true};
    case GET_AUTH_USER:
        return {...state,isLoading:false,isAuth:true, user:payload.user,msg:payload.msg}
    case LOGOUT_USER:
        localStorage.removeItem("token")
        return {...state,isAuth:false,msg:"Vous êtes déconnecté"} 
    case EDIT_USER:
        return {...state,isLoding:false,msg:payload.msg}    
    default:
        return state;
}
} 