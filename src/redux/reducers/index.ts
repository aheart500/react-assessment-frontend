import {combineReducers} from 'redux'
import { AuthState } from '../../types'
import AuthReducer from './AuthReducer'
export interface RootState{
    Auth: AuthState
} 
export default combineReducers({Auth: AuthReducer})