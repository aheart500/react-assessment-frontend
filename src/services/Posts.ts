import axios from 'axios'
import { API_URI } from '../CONSTATNS'
import { Post } from '../types'


const getPosts = async() : Promise<Post[]> => {
    const result = await axios.get(API_URI+ '/posts')
    if(!result.data) return []
    return result.data as Post[]
}

const deletePost = async(id: string |number) => {
    const result = await axios.delete(API_URI+ '/posts/'+ id)
    return result.data 
}

export {getPosts, deletePost}