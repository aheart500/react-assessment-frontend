import { LoginFun, RegisterFun } from "../../services/Auth"
export const login = async  (values: {username: string, password: string})=> {
    const res = await  LoginFun(values)
    if(res){
        localStorage.setItem('token', res)
        return true
    }
    return false
}

export const register = async  (formData: FormData)=> {
    const res = await  RegisterFun(formData)
    if(res){
        localStorage.setItem('token', res)
        return true
    }
    return false
}
export const logout = () =>{
    localStorage.removeItem('token')
    window.location.replace('/login')
}