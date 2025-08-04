import { createContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'


const backendUrl = axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null)
    const [socket, setSocket] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [onlineUsers, setOnlineUsers] = useState([])
    const navigate = useNavigate()
    async function checkAuth() {
        try {

            const { data } = await axios.get('http://localhost:8000/api/v1/check-auth')
            if (data.success) {
                console.log("Auth", data.user)
                setAuthUser(data.user)
                socketConnection(data.user)

            }

        }
        catch (err) {

            toast.error(err.response?.data?.message||err.message||'Somthing Went Wrong')
            console.log(err.response?.data?.message||err.message||'Somthing Went Wrong')
        }

    }
    const socketConnection = (userData) => {
        if (!userData || socket?.connected) return;
        try {

            const newSocket = io('http://localhost:8000', {
                level: ["nantha"],
                query: {
                    userId: userData._id
                }
            })
            newSocket.connect()
            setSocket(newSocket)
            console.log(newSocket)
            newSocket.on('getOnlineUsers', (onlineUserList) => {
                setOnlineUsers(onlineUserList)
            })
        }

        catch (err) {

            toast.error(err.response?.data?.message || err.message || 'Somthing Went Wrong')
            console.log(err.response?.data?.message || err.message || 'Somthing Went Wrong')
        }


    }
    const login = async (currState, credentials) => {
        try {

            const { data } = await axios.post(`http://localhost:8000/api/v1/${currState}`, credentials)
            if (data.success) {
                setAuthUser(data.user)
                setToken(data.token)
                localStorage.setItem('token', data.token)
                checkAuth()
                toast.success("Login Success")
                navigate('/')
            }

        }
        catch (err) {
            console.log(err.response.data.message)
            toast.error(err.response.data.message)
        }


    }
    const logout = async () => {
        try {

            const { data } = await axios.get('http://localhost:8000/api/v1/logout')
            if (data.success) {
                setAuthUser(null)
                setToken(null)
                setOnlineUsers([])
                localStorage.removeItem('token')

                socket.disconnect()
                toast.success("logout Successfully")

            }

        }
        catch (err) {

            toast.error(err.response?.data?.message || err.message || 'Somthing Went Wrong')
            console.log(err.response?.data?.message || err.message || 'Somthing Went Wrong')
        }


    }
    const update = async (fullname, bio, profilePic) => {
        try {

            const { data } = await axios.put('http://localhost:8000/api/v1/update', { fullname, bio, profilePic })
            if (data.success) {

                toast.success("Profile Updated Successfully")

            }
        }
        catch (err) {

            toast.error(err.response?.data?.message || err.message || 'Somthing Went Wrong')
            console.log(err.response?.data?.message || err.message || 'Somthing Went Wrong')
        }
    }



    useEffect(() => {

        checkAuth()
    }, [])

    const value = {
        authUser, onlineUsers, login, logout, checkAuth, update
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}