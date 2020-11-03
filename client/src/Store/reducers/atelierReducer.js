import {GET_ATELIER,ADD_ATELIER,GET_ALL_ATELIER,DELETE_ATELIER,UPDATE_ATELIER,SET_LOADING} from '../const/actionTypes'


const initState={
    atelier_all:[],
    atelier:{},
    isLoading:false,
    error:"",
    msg:""
}
export default function (state = initState , {type,payload}) {
  switch (type) {
    case GET_ATELIER:
        return {...state,isLoading:false,atelier:payload.atelier,msg:payload.msg};
    case ADD_ATELIER:
        return {...state,isLoading:false,ateliers:payload.atelier,msg:payload.msg};
    case GET_ALL_ATELIER:
        return {...state,isLoading:false,atelier_all:payload};
    case UPDATE_ATELIER:
        return {...state,isLoading:false,atelier:payload.atelier,msg:payload.msg};
    case SET_LOADING:
        return {...state,isLoading:true}
    default:
        return state;
}
} 