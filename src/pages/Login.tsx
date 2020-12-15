import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {useFormik} from 'formik'
import {useSelector} from 'react-redux'
import { login } from '../redux/actions/Auth'
import { RootState } from '../redux/reducers'
import { Redirect } from 'react-router-dom'
import Background from '../assets/login-image.png'
import logo from '../assets/logo512.png'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from  'clsx';
import RegisterDialog from '../components/RegisterDialog';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftBox : {
        background : `url(${Background}) no-repeat center/cover`,
        flexDirection: 'column',
        color: '#fff',
        [theme.breakpoints.down('xs')]: {
            height: '70vh',
        },
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    logo: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        margin: '0 auto'
    },
    input: {
        margin: '1rem 0'
    },
    button: {
        borderRadius: '20px',
        marginBottom: '0.5rem'
    },
    registerSpan: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        '&:hover':{
            textDecoration: 'underline'
        }

    }
  }),
);
const validate = (values:any) => {
    const errors: any = {};
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
    return errors;
  }
const Login = () => {
    const isLogged = useSelector((state: RootState) => state.Auth.isLogged)
    const [registerDialog, setRegisterDialog] = useState(false)
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            username: '',
            password :''
        },
        validate,
        onSubmit : async values =>{
            const logged = await login(values)
            if(logged) window.location.replace('/')
        }
    })
    const toggleRegisterDialog = () =>{
        setRegisterDialog(!registerDialog)
    }
    if(isLogged) return <Redirect to='/' />
    return (
        <>
        <Grid container wrap='wrap-reverse' >
            <Grid sm={6} xs={12}  className={classes.box} item>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <img src={logo} alt='logo' className={classes.logo} />
                    <Typography variant='h2' align='center'>Welcome</Typography>
                    <Typography variant='subtitle1' align='center'>Please login to see the latest posts</Typography>
                    <TextField
                        className={classes.input}
                        id="username"
                        label='Username'
                        type="text"
                        error={formik.touched.username && !!formik.errors.username}
                        helperText={formik.touched.username && formik.errors.username}
                        {...formik.getFieldProps('username')}
                    />
                    <TextField
                        className={classes.input}
                        id="password"
                        label='Password'
                        type="password"
                        error={formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                        {...formik.getFieldProps('password')}
                    />
                    <Button className={classes.button} color='primary' type="submit" variant='contained'>Login</Button>
                    <Typography variant='subtitle1' align='center'>
                        Are you new?
                        <span className={classes.registerSpan} onClick={()=> toggleRegisterDialog()}> Register Now!</span>
                    </Typography>
                </form>
                </Grid>
                <Grid sm={6} className={clsx(classes.box,classes.leftBox)} item>
                    <Typography variant='h2' align='center'>Welcome</Typography>
                    <Typography variant='subtitle1' align='center'>Please login to see the latest posts</Typography>
                </Grid>
        </Grid>
        <RegisterDialog open={registerDialog} toggleState={toggleRegisterDialog}/>
        </>
    )
}

export default Login
