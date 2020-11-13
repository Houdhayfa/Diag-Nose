import {LOGIN_USER,REGISTER,GET_AUTH_USER,AUTH_ERROR,LOGOUT_USER,SET_LOADING,EDIT_USER,RESET_ERROR,RESET_MESSAGE} from '../const/actionTypes'

const initState={
    token:localStorage.getItem('token'),
    user:{},
    isLoading:false,
    isAuth:false,
    err:"",
    msg:""
}
export default function (state = initState , {type,payload}) {
switch (type) {
    case REGISTER:
        return {...state,isLoading:false,user:payload.user,msg:payload.msg};
    case LOGIN_USER:
        localStorage.setItem("token",payload.token)
        return {...state,isLoading:false,isAuth:true, user:payload.user,msg:payload.msg};
    case SET_LOADING:
        return {...state,isLoading:true};
    case GET_AUTH_USER:
        return {...state,isLoading:false,isAuth:true, user:payload.user,msg:payload.msg}
    case LOGOUT_USER:
        localStorage.removeItem("token")
        return {...state,isAuth:false,msg:"Vous êtes déconnecté"} 
    case EDIT_USER:
        return {...state,isLoding:false,msg:payload.msg} 
    case AUTH_ERROR:
        return {...state,err:payload.err}  
    case RESET_ERROR:
        return {...state,err:""}
    case RESET_MESSAGE:
        return {...state,msg:""}    
    default:
        return state;
}
} 