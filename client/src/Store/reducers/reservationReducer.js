import {GET_USER_RESERVATION,GET_ALL_RESERVATION,CONCLUDE_RESERVATION} from '../const/actionTypes'

const initState={
    reservations_all:[],
    reservations_user:[],
    msg:""
}

export default function (state=initState,{type,payload}){

    switch (type) {
        case GET_USER_RESERVATION:
            return {...state,reservations_user:payload.reservations_user,msg:payload.msg};
            case GET_ALL_RESERVATION:
                return {...state,reservations_all:payload.reservation_all,msg:payload.msg};
            case CONCLUDE_RESERVATION:
                return state
        default:
            return state;
    }

}