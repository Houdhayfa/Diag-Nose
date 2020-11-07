import {GET_USER_DEMANDE,ADD_DEMANDE} from '../const/actionTypes'

const initState={
    demandes_all:[],
    demandes_user:[],
    msg:""
}

export default function (state=initState,{type,payload}){

    switch (type) {
        case GET_USER_DEMANDE:
            return {...state,isLoading:false,demandes_user:payload.demande_all,msg:payload.msg};
        case ADD_DEMANDE:
            return {...state,isLoading:false,msg:payload.msg};
           
        default:
            return state;
    }

}