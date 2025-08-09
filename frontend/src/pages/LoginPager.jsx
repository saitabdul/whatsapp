import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'

export default function LoginPage() {
    const { login } = useContext(AuthContext)

    const [currState, setCurrState] = useState('Sign Up')
    const [isDataFilled, setIsDataFilled] = useState(false)
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('Hi')
    const [profilePic, setProfilePic] = useState('')
    const navigate = useNavigate()
    function submitHandler(e) {
        e.preventDefault()
        if (currState == 'Sign Up' && !isDataFilled) {
            setIsDataFilled(true)
            return
        }
        console.log(email,bio)

        login(currState=="Sign Up"?'register':currState, { fullname: username, email, password,bio })

        



    }

    return (
        <>
            <div className="login-body">
                <img className="background" src="/background/5559852.jpg" alt="" />
                <div className="login-logo">
                    <img src="/vite.svg" alt="" />
                </div>
                <div className="login-form">
                    <form action="" onSubmit={submitHandler}>
                        <h1>{currState}</h1>
                        {currState == 'Sign Up' && !isDataFilled &&
                            <input type="text" placeholder="Username" value={username} onChange={e => setUserName(e.target.value)} required />
                        }
                        {
                            !isDataFilled &&
                            <>
                                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                            </>
                        }
                        {
                            isDataFilled && <textarea placeholder="Enter your bio.." value={bio} onChange={e => setBio(e.target.value)} name="" id="" cols="30" rows="4"></textarea>
                        }
                        <button type="submit">{currState == 'Sign Up' ? "Create Account" : "Login"}</button>
                        <div>

                            <input type="checkbox" /><span> Agree to terms & privacy policy.</span>
                        </div>
                        {
                            currState == 'Sign Up' ? (

                                <p>I have already an account?  <span onClick={() => { setCurrState("Login"),setIsDataFilled(false) }} className='login-span'> Login</span></p>
                            ) : (<p>I don't have any account ?  <span onClick={() => { setCurrState("Sign Up") }} className='login-span'> Sign Up</span></p>)
                        }
                    </form>
                </div>
            </div>
        </>
    )

}
