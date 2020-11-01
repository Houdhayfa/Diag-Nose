import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {loadUser} from './Store/actions/authActions'
import LandingPage from './components/landing_page/LandingPage'
import Profile from './components/profile_page/Profile'
import Login from './components/login_page/Login'
import RegisterPage from './components/register_page/RegisterPage'
import Search from './components/search_page/Search'
import AdminPage from './components/admin_page/AdminPage'
import './App.css'
function App() {
const dispatch=useDispatch()
  useEffect(() => {
    console.log('load user')
  dispatch(loadUser())
  },[])
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path="/" render={props => <LandingPage {...props}/>}/>
      <Route path="/profile" render={props => <Profile {...props}/>}/>
      <Route path="/login" render={props => <Login {...props}/>}/>
      <Route path="/register" render={props => <RegisterPage {...props}/>}/>
      <Route path="/search" render={props => <Search {...props}/>}/>
      <Route path="/admin" render={props => <AdminPage {...props}/>}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
