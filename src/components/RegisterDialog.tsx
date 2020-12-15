import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useFormik} from 'formik'
import DefaultImage from '../assets/default-user.jpg'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import Loader from './Loader';
import { register } from '../redux/actions/Auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    input: {
        margin: '0.5rem 0',
        width: '100%'
    },
    button: {
        borderRadius: '20px',
        marginBottom: '0.5rem'
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      textAlign: 'center'
    },
    fileInput: {
      display: 'none'
    },
    fileLabel: {display: 'flex', justifyContent: 'center',padding: '0.5rem 0',cursor: 'pointer', 
    transition: 'all 0.5s ease' ,'&:hover': {backgroundColor: 'lightgrey'}},
  }),
);
const validate = (values:any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 20) {
    errors.username = 'Must be 20 characters or less';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}
const RegisterDialog = ({open, toggleState}: {open: boolean, toggleState: ()=> void}) =>  {
  const [loading,setLoading] = useState(true)
  const [image, setImage] = useState()
    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            description: '',
            username: '',
            email: '',
            password :''
        },
        validate, 
        onSubmit : async (values) =>{
            setLoading(true)
            let formData = new FormData()
            if(image) formData.append('image', image!)
            formData.append('data', JSON.stringify(values))
            register(formData)
            .then(res=> res && window.location.replace('/'))
            .catch(error => {console.log(error);  setLoading(false)})
        }
    })
    const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={toggleState}>
        <DialogTitle >Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can be a member of our community by filling the next inforamtions.
          </DialogContentText>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor='image' className={classes.fileLabel}><img src={image ?URL.createObjectURL(image) : DefaultImage} className={classes.avatar}  alt='userImage'/></label>
                <input 
                  type='file'
                  name='image'
                  id='image' 
                  accept="image/*"
                  onChange={(e:any)=>{
                    if(e.target.files && e.target.files[0]){
                      setImage(e.target.files[0])
                    }
                  }}
                  className={classes.fileInput}
                />
                {['name', 'description', 'username', 'email', 'password', 'age'].map(field => {
                  let props = {}
                  if(['username', 'email', 'password', 'name'].includes(field)){
                    props = {
                      error: (formik as any).touched[field] && !!(formik as any).errors[field],
                      helperText: (formik as any).touched[field] && (formik as any).errors[field] 
                    }
                  }
                  if(field === 'description'){
                    props = {
                      ...props,
                      multiline: true,
                      rows: 3
                    }
                  }
                  return <TextField id={field} key={field} className={classes.input}
                  label={field[0].toUpperCase() + field.slice(1)} type={field === 'password'? field : field ==='age'? 'number': 'text'}
                  {...props} {...formik.getFieldProps(field)} />
                })}
                
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleState} variant='contained' color="primary">
            Cancel
          </Button>
          <Button onClick={formik.submitForm} variant='contained' color="primary">
            {loading? <Loader style={{ height: '20px', width: '20px', position: 'static', border: '2px solid #f3f3f3', borderTop: '2px solid #3498db'}}/>: 'Register'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RegisterDialog