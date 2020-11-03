import {combineReducers} from 'redux'
import authReducer from './authReducer'
import atelierreducer from './atelierReducer'


export default combineReducers({
    authReducer,atelierreducer
})