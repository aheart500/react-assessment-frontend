import React from 'react'
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { API_URI } from '../CONSTATNS';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);
const UserInfo = ({user}: {user: any}) => {
    const classes = useStyles()
    return (
        <div className={classes.userInfoBox}>
            <Avatar src={API_URI + '/uploads/' + user.image} />
            <div className={classes.userInfo}>
                <Typography  variant="h6">{user.name}</Typography>
                <Typography  variant="caption">@{user.username}</Typography>
            </div>
        </div>
    )
}

export default UserInfo
