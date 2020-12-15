import { ACTION, AuthState, User } from '../../types'
import {LOGIN,LOGOUT} from '../Action_Types'

let initialUser: User = {
    name: '',
    age: 0,
    description: '',
    image : '',
    email: '',
    password: '',
    username: '',
    _id: ''
}

const initalState: AuthState = {
    isLogged: false, 
    user: initialUser
}

const reducer  = (state = initalState,  action : ACTION<{user: User}>) : AuthState =>{
    switch(action.type){
        case LOGIN: return {...state, isLogged: true, user: action.payload.user}
        case LOGOUT: return {...state, isLogged: false, user: initialUser}
        default: return state
    }
}

export default reducer