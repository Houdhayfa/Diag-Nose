import {GET_USER_DEMANDE,ADD_DEMANDE,GET_ALL_DEMANDE,DELETE_DEMANDE,RESET_MESSAGE} from '../const/actionTypes'

const initState={
    demandes_all:[],
    demandes_user:[],
    error:"",
    msg:""
}

export default function (state=initState,{type,payload}){

    switch (type) {
        case GET_USER_DEMANDE:
            return {...state,demandes_user:payload.demande_all};
        case ADD_DEMANDE:
            return {...state,msg:payload.msg};
        case GET_ALL_DEMANDE:
            return {...state,demandes_all:payload.demande_all} 
        case DELETE_DEMANDE:
            return {...state,msg:payload.msg}
        case RESET_MESSAGE:
            return {...state,msg:""}   
        default:
            return state;
    }

}