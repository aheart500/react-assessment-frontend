import {useSelector} from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../redux/reducers';

const ProtectedRoute = ({component: Component, ...rest}: any)=> {
    const isLogged = useSelector((state: RootState)=> state.Auth.isLogged)
    return (
        <Route {...rest} render={(props) => isLogged ? <Component {...props} /> : <Redirect to='/login' />} />
    )
}
export default ProtectedRoute