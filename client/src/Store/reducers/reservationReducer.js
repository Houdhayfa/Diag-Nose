import {GET_USER_RESERVATION,GET_ALL_RESERVATION,CONCLUDE_RESERVATION,ADD_RESERVATION,DELETE_RESERVATION,RESET_MESSAGE,REACTIVATE_RESERVATION} from '../const/actionTypes'

const initState={
    reservations_all:[],
    reservations_user:[],
    error:"",
    msg:""
}

export default function (state=initState,{type,payload}){

    switch (type) {
        case GET_USER_RESERVATION:
            return {...state,reservations_user:payload.reservations_user};
        case GET_ALL_RESERVATION:
            return {...state,reservations_all:payload.reservations_all};
        case CONCLUDE_RESERVATION:
            return {...state,msg:payload.msg}
        case REACTIVATE_RESERVATION:
            return {...state,msg:payload.msg}
        case ADD_RESERVATION:
            return {...state,msg:payload.msg}
        case DELETE_RESERVATION:
            return {...state,msg:payload.msg}
        case RESET_MESSAGE:
            return {...state,msg:""}  
        default:
            return state;
    }

}