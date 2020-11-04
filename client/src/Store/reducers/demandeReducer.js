import {GET_USER_DEMANDE} from '../const/actionTypes'

const initState={
    demande_all:[],
    demandes_user:[],
    msg:""
}

export default function (state=initState,{type,payload}){

    switch (type) {
        case GET_USER_DEMANDE:
            return {...state,isLoading:false,user:payload.user,msg:payload.msg};
           
        default:
            return state;
    }

}