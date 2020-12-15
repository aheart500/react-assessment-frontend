import React from 'react'
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Post as PostType } from '../types'
import {useSelector} from 'react-redux'
import UserInfo from './UserInfo';
import { API_URI } from '../CONSTATNS';
import { RootState } from '../redux/reducers';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 3px 0px gray',
        marginTop: '1rem'
    },
    upperLine:{
        height: '3px',
        width: '100%',
        backgroundColor: '#d55844'
    },
    userInfoBox:{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '0.5rem'
    },
    info:{
        display: 'flex',
        padding: '0 1rem',
        alignItems:'center'
    },
    postText: {
        fontSize: '1.5rem',
        lineHeight: '1.6rem',
        padding: '1rem'
    },
    hashtag:{
        color: '#2c87f0',
        fontStyle: 'italic',
    },
    fileContainer:{
        textAlign: 'center'
    },
    file: {
        maxHeight: '100%',
        maxWidth: '100%',
        margin: '0.5rem 0'
    },
    deleteIcon:{
        marginLeft: 'auto'
    },
  }),
);
const Post = ({data, removePost}: {data: PostType, removePost: (id: string| number) => void}) => {
    const classes = useStyles()
    const userId = useSelector((state: RootState) => state.Auth.user._id) 
    return (
        <div className={classes.container}>
            <div className={classes.upperLine} />
            <UserInfo user={data.user}/>
            <div className={classes.info}>
                <Typography variant='caption' style={{marginRight: '2rem'}}>Category: {data.category}</Typography>
               {data.tags && data.tags?.length > 0 && <Typography variant='caption'>Tags: {data.tags?.join(',')}</Typography>}
               {userId === data.user._id && (
                <IconButton className={classes.deleteIcon} onClick={()=> removePost(data._id)}>
                   <DeleteIcon />
               </IconButton>
               )}
            </div>
            <div dangerouslySetInnerHTML={{__html: data.text.replace(/(#[\p{L}]+)/ugi, `<span class=${classes.hashtag}>$1</span>`)}} className={classes.postText}/>
            <div className={classes.fileContainer}>
                {data.files?.map((file, i) => {
                    return file.fileType === 'image' ? <img key={i} className={classes.file} src={API_URI + '/uploads/'+ file.name} alt='post'/> : (
                        <video key={i} className={classes.file} controls src={API_URI + '/uploads/'+ file.name}/>
                    ) 
                })}
            </div>

        </div>
    )
}

export default Post
