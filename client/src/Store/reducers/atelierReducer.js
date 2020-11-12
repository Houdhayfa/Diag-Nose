import {GET_ATELIER,ADD_ATELIER,GET_ALL_ATELIER,UPDATE_ATELIER,SET_LOADING,MAKE_PARTNER,UNMAKE_PARTNER} from '../const/actionTypes'


const initState={
    atelier_all:[],
    targetAtelier:{},
    isLoading:false,
    error:"",
    msg:""
}
export default function (state = initState , {type,payload}) {
  switch (type) {
    case GET_ATELIER:
        return {...state,isLoading:false,targetAtelier:payload.targetAtelier,msg:payload.msg};
    case ADD_ATELIER:
        return {...state,isLoading:false,ateliers:payload.atelier,msg:payload.msg};
    case GET_ALL_ATELIER:
        return {...state,isLoading:false,atelier_all:payload};
    case UPDATE_ATELIER:
        return {...state,isLoading:false,atelier:payload.atelier,msg:payload.msg};
    case SET_LOADING:
        return {...state,isLoading:true}
    case MAKE_PARTNER:
        return {...state}
    case UNMAKE_PARTNER:
        return {...state}
    default:
        return state;
}
} 