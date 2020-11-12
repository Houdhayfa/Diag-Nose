import axios from 'axios'
import {setLoading} from './authActions'
import {GET_USER,GET_ALL_USER,BLOCK_USER,UNBLOCK_USER} from '../const/actionTypes'


export const getTargetUser = (user_id) => async dispatch =>{
   dispatch(setLoading())
  const result=await axios.get(`http://localhost:5000/user/${user_id}`)
  dispatch({
      type:GET_USER,
     payload: {targetUser:result.data.targetUser,
      msg:result.data.msg}
  })
}
export const getAllUsers = () => async dispatch =>{
    dispatch(setLoading())
   const result=await axios.get(`http://localhost:5000/admin/allUsers`)
   dispatch({
    type:GET_ALL_USER,
    payload:{All_Users:result.data.All_Users,
             msg:result.data.msg}
   })
 }
 export const blockUser = (user_id) => async dispatch =>{
    dispatch(setLoading())
   const result=await axios.put(`http://localhost:5000/admin/block/${user_id}`)
   dispatch({
       type:BLOCK_USER,
      payload:{ msg:result.data.msg}
   })
   dispatch(getAllUsers())
 }
 export const unblockUser = (user_id) => async dispatch =>{
    dispatch(setLoading())
   const result=await axios.put(`http://localhost:5000/admin/unblock/${user_id}`)
   dispatch({
      type:UNBLOCK_USER,
      payload: {msg:result.data.msg}
   })
   dispatch(getAllUsers())
 }