import {combineReducers} from 'redux'
import authReducer from './authReducer'
import atelierreducer from './atelierReducer'
import demandeReducer  from './demandeReducer'
import reservationReducer from './reservationReducer'
import userReducer from './userReducer'

export default combineReducers({
    authReducer,
    atelierreducer,
    demandeReducer,
    reservationReducer,
    userReducer
})