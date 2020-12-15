import React, {useState, useEffect} from 'react'
import Container from '@material-ui/core/Container'
import MyAppBar from '../components/MyAppBar'
import Grid  from '@material-ui/core/Grid'
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import UserBox from '../components/UserBox'
import CreatePost from '../components/CreatePost';
import { Post as PostType } from '../types';
import Post from '../components/Post';
import {getPosts, deletePost} from '../services/Posts'
import FilterBox, { FilterState } from '../components/FilterBox';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        marginTop: '1rem',
    },
    userBox: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    chip:{
      margin: '0 0.4rem'
    }
  }),
);
const Home = () => {
    const classes = useStyles()
    const [posts, setPosts] = useState<PostType[]>([])
    const [filter, setFilter] = useState<FilterState>({categories: [], tags: []})
    useEffect(()=>{
      getPosts().then(res=> {
        setPosts(res)
      }).catch(err=> console.log(err))
    },[])
    
    const addPost = (post: PostType) => setPosts([post, ...posts])
    const removePost = (id: string| number) => {
        deletePost(id).then(()=> setPosts(posts.filter(post=> post._id !== id)))
    }

      const filteredPosts =  posts.filter(post=>{
        const matchCategory = filter.categories.length === 0 || filter.categories.includes(post.category)
        const matchTags = filter.tags.length === 0 || filter.tags.find(tag=> post.tags?.includes(tag)) !== undefined
        return matchCategory && matchTags
      }) 
    return (
        <>
        <MyAppBar />
        <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={2} >
                <Grid item sm={4} className={classes.userBox}>
                    <UserBox />
                </Grid>
                <Grid item sm={8} xs={12}>
                    <CreatePost addPost={addPost}/>
                    <FilterBox filter={filter} setFilter={setFilter} />
                    {filteredPosts.map(post => <Post key={post._id} data={post} removePost={removePost} />)}
                </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default Home
