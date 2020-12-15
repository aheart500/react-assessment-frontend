import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux'
import { API_URI } from '../CONSTATNS';
import { RootState } from '../redux/reducers';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderRadius: '20px',
        boxShadow: '0 0 3px 0px black',
        paddingBottom: '0.5rem',
    },
    banner: {
        backgroundColor: '#d55844',
        height: '5rem',
        width: '100%',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px'
    },
    avatar: {
        width: '100px',
        height: '100px',
        border: '3px solid white'
      },
      imageBox: {
        position: 'absolute',
        top: '25px'
      },
      name: {
        marginTop: '50px',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      divider: {
          width: '100%',
          height: '1px',
          border: 'none',
          backgroundColor: 'lightgray',
          margin: '0.5rem 0'
      }
  }),
);

const UserBox = ()=>{
    const classes = useStyles()
    const user = useSelector((state: RootState)=> state.Auth.user)
    return (
        <div className={classes.box}>
            <div className={classes.banner}></div>
            <div className={classes.imageBox}>
                <Avatar src={API_URI + '/uploads/' + user.image} className={classes.avatar} />
            </div>
            <Typography  variant="h5" className={classes.name} >{user.name}</Typography>
            <Typography  variant="caption"  >@{user.username}</Typography>
            <hr className={classes.divider} />
            <Typography  variant="subtitle2" >{user.description}</Typography>
            <Typography  variant="subtitle2" >{user.age}</Typography>
        </div>
    )
}

export default UserBox