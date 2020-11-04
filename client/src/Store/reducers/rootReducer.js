import {combineReducers} from 'redux'
import authReducer from './authReducer'
import atelierreducer from './atelierReducer'
import demandeReducer  from './demandeReducer'


export default combineReducers({
    authReducer,atelierreducer,demandeReducer
})