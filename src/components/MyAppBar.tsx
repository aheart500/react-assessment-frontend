import React, {useState} from 'react';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LOGOUT } from '../redux/Action_Types';
import { logout } from '../redux/actions/Auth';
import MyDrawer from './MyDrawer';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
      display: 'block',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    logoutButton: {
      marginLeft: 'auto'
    }
  }),
);

const MyAppBar = ()=> {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const Logout = () =>{
    dispatch({type: LOGOUT})
    logout()
  }
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            React
          </Typography>
          <IconButton
            edge="end"
            className={classes.logoutButton}
            color="inherit"
            onClick={()=> Logout()}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MyDrawer open={drawerOpen} onClose={toggleDrawer} />
    </div>
  );
}
export default MyAppBar