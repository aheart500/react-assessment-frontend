import React, { useState, useRef } from 'react'
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux'
import { RootState } from '../redux/reducers';
import { API_URI, Categories } from '../CONSTATNS';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';
import Axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import UserInfo from './UserInfo';
import { Post } from '../types';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 3px 0px gray',
    },
    upperLine:{
        height: '3px',
        width: '100%',
        backgroundColor: '#d55844'
    },
    textField:{
        padding: '0.5rem 1rem',
    },
    textFieldInput: {
        fontSize: '1.5rem',
        lineHeight: '1.6rem',
    },
    buttons: {
        borderRadius: '10px',
        fontWeight: 'bold'
    },
    uploadButton:{
        margin: '0 1rem',
        width: '-webkit-fill-available'
    },
    fileInput: {
        display: 'none'
    },
    postButton:{
        margin: '0.5rem 1rem',
    },
    filesBox: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '1rem'
    },
    fileContainer:{
        border: '1px solid black',
        maxWidth: '22%',
        height: '100px',
        margin: '0.5rem',
        position: 'relative'
    },
    deleteIcon:{
        position: 'absolute',
        right: '-25px',
        top: '-25px'
    },
    file: {
        maxHeight: '100%',
        maxWidth: '100%'
    },
    progress: {
        margin: '0.5rem 1rem',
        height:'0.8rem',
        borderRadius: '5px'
    },
    formControl: {
        margin: '1rem'
    }
})
);
const toArray = (fileList: any)=> {
    return Array.prototype.slice.call(fileList);
}

const CreatePost = ({addPost}:{addPost: (post: Post)=> void}) => {
    const classes = useStyles()
    const user = useSelector((state: RootState)=> state.Auth.user)
    const [text, setText] = useState('')
    const [category, setCategory] = useState<any>('None')
    const [files, setFiles] = useState<any>([])
    const [progressRatio, setProgressRatio] = useState(0)
    const [loading, setLoading] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const fileInput = useRef(null)
   
    const handleFilesUpload = (e:any)=>{
        if(e.target.files){
            setFiles([...files, ...toArray(e.target.files)])
        }
    }
    const removeFile = (name: any) =>{
        setFiles(files.filter((file: any)=> file.name !== name))
    }
    const handlePost = () =>{
        setLoading(true)
        let formData = new FormData()
        formData.append('data', JSON.stringify({text, category, user_id: user._id}))
        files.forEach((file: any)=> formData.append('files', file))
        Axios.post(API_URI+ '/posts', formData, {
            onUploadProgress: pv => setProgressRatio((pv.loaded *100) / pv.total)
        }).then(({data})=> {
            addPost(data)
            setSnackOpen(true)
            setFiles([])
            setCategory('None')
            setText('')
        }).catch(err=> console.log(err)).finally(()=> setLoading(false))
    }
    return (
        <div className={classes.container}>
            <div className={classes.upperLine} />
            <UserInfo user={user} />

            <InputBase multiline rows={4} value={text} onChange={e=> setText(e.target.value)} className={classes.textField}
            inputProps={{className: classes.textFieldInput}} placeholder="What's on your mind?"/>

            <FormControl className={classes.formControl}>
                <InputLabel id="label">Category</InputLabel>
                <Select
                labelId="label"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                <MenuItem value={'None'}>None</MenuItem>
                {Categories.map(c =>  <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
            </FormControl>
            
            <div className={classes.filesBox}>
            {files.map((file: any, i: any)  => {
                return (
                    <div key={i} className={classes.fileContainer}>
                        <IconButton className={classes.deleteIcon} onClick={()=> removeFile(file.name)}>
                            <DeleteIcon />
                        </IconButton>
                        {file.type.startsWith('image')? <img className={clsx(classes.file)} src={URL.createObjectURL(file)} alt='uploaded'/> : (
                            <video controls className={clsx(classes.file)} src={URL.createObjectURL(file)} />
                        )}
                    </div>
                )   
            })}
            </div>
            {loading && <LinearProgress variant="determinate" value={progressRatio} className={classes.progress} />}

            <Button variant='outlined' startIcon={<CloudUploadIcon />} onClick={()=> {if(fileInput.current)(fileInput as any).current.click()}}
            className={clsx(classes.buttons, classes.uploadButton)}> Upload Images / Videos </Button>

            <input ref={fileInput} type='file' id='files' accept="image/*,video/*" onChange={handleFilesUpload} multiple className={classes.fileInput} />

            <Button onClick={handlePost} variant='contained' color='secondary' disabled={(text.length === 0 && files.length ===0) || loading}
            className={clsx(classes.buttons,classes.postButton)}>Post</Button>

            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={()=> setSnackOpen(false)}>
                <MuiAlert elevation={6} variant="filled" onClose={()=> setSnackOpen(false)} severity="success">
                    Your post is added successfully
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default CreatePost
