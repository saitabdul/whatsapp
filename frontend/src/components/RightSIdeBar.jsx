import {useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import {Link} from 'react-router-dom'
export default function RightSideBar(){
    const {logout,authUser}=useContext(AuthContext)
    function logoutHandler(){
        logout()
        console.log('good')
    }
    return(
        <>
        <div className="right-container">
            <Link to={'/profile'}>
            <img id='avatar' src={authUser&&authUser.profilePic||"/Profile/user-3.png"} alt="user" />
            </Link>
            <h3>{authUser.fullname}</h3>
            <p> I am Here to develop my SKILLS</p>
            <hr />
            <div className="collection">
              
                <img src="/Profile/user-3.png" alt="user" />
                <img src="/Profile/user-3.png" alt="user" />
                <img src="/Profile/user-1.png" alt="user" />
                <img src="/Profile/user-3.png" alt="user" />
                
                
            </div>
            <button onClick={logoutHandler}>Logout</button>
        </div>
        </>
    )
}