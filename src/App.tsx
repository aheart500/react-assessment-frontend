import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Login from './pages/Login'
import {useState, useEffect} from 'react'
import { me } from './services/Auth'
import {useDispatch} from 'react-redux'
import { LOGIN } from './redux/Action_Types'
import Loader from './components/Loader'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
const  App = () => {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    let token = window.localStorage.getItem('token') 
    if(token){
      me(token).then(user=>{
        if(!user) return 
        dispatch({type:LOGIN, payload: {user}})
      }).catch(error => console.log(error)).finally(()=> setLoading(false))
    }else{
      setLoading(false)
    }
  },[dispatch])

  if(loading){
    return (
      <div className='loader-container'>
        <Loader />
      </div>
    )
  }

  return (
    <Router>
      <Switch>
          <ProtectedRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
