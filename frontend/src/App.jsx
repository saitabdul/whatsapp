import {Routes,Route, Navigate} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPager'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './protectedRoute/protectedRoute'
import {useContext,useEffect} from 'react'
import {AuthContext} from '../context/authContext'
import axios from 'axios'

const App=()=>{
  axios.defaults.withCredentials=true
  const {authUser}=useContext(AuthContext)
  useEffect(()=>{},[authUser])
  return(
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to='/'/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}
export default App