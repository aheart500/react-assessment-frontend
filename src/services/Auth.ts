import axios from 'axios'
import { API_URI } from '../CONSTATNS'
import { User } from '../types'


export const configWithToken = (token: string) => ({headers: {Authorization: 'Bearer ' + token}})

const me = async(token: string) : Promise<User| null> => {
    const result = await  axios.get(API_URI+ '/me',configWithToken(token))
    if(!result.data) return null
    return result.data as User
}
const LoginFun = async(data : {username: string, password: string}) =>{
    const result = await axios.post(API_URI + '/login', data) 
    return result.data
}
const RegisterFun = async (formData: FormData)=>{
    const result = await axios.post(API_URI + '/users', formData)
    return result.data
}
export {me, LoginFun, RegisterFun}