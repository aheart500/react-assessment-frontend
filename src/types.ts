export interface User {
    username: string,
    email: string,
    name: string,
    password: string,
    description: string,
    age: number, 
    image: string,
    _id: string | number
}
export interface fileType {
    name: string, 
    fileType: 'image'| 'video'
}
export interface Post {
    user: User,
    text: string,
    files?: [fileType],
    category: string,
    likers?: [User]
    tags?: Array<string>,
    _id: string | number
}
export type ACTION<T> = {type: string; payload: T}
export interface AuthState{
    isLogged: boolean,
    user: User,
}
