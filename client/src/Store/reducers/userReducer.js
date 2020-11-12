import {GET_USER,GET_ALL_USER,BLOCK_USER,UNBLOCK_USER} from '../const/actionTypes'

const initState={
    targetUser:{},
    All_Users:[],
    msg:""
}
 const userReducer =(state=initState,{type,payload}) =>{
    switch (type) {
        case GET_USER:
            return {...state,targetUser:payload.user,msg:payload.msg};
        case GET_ALL_USER:
            return {...state, All_Users:payload.All_Users};
        case BLOCK_USER:
            return {...state,msg:payload.msg};
        case UNBLOCK_USER:
            return {...state,msg:payload.msg}; 
        default:
            return state;
    }
}
export default userReducer