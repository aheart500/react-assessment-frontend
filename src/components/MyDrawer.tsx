import Drawer from '@material-ui/core/Drawer';
import UserBox from './UserBox'
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        width: '20rem',
        overflowX: 'hidden',
        padding: '5rem 1rem',
    }, 
    menuButton: {
        top: '-5rem',
        right: '-16rem',
        width: 'fit-content'
      },
})
);

const MyDrawer = (props: {open: boolean, onClose: ()=> void}) =>{
    const classes = useStyles()
    return (
        <Drawer anchor='left' PaperProps={{className: classes.container}}  {...props}>
            <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={props.onClose}
          >
            <ArrowBackIcon />
          </IconButton>
            <UserBox />
          </Drawer>
    )
}

export default MyDrawer