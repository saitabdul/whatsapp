import axios from 'axios'
import toast from 'react-hot-toast'
import { createContext, useState, useEffect } from 'react'


const backendUrl = axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [unSeen, setUnSeen] = useState(false)

    async function getUsers(){
        try{
          const {data}= await axios.get(backendUrl+`/api/v1/getuser`)
          if(data.success){
            setUsers(data.user)
          }
        }
        catch(err){
            console.log(err.response?.data?.message||err.message||'Somthing Went Wrong')
            toast(err.response?.data?.message||err.message||'Somthing Went Wrong')
        }
    }
    async function getMessages(){
        try{
            console.log("ss",selectedUser)
            if(!selectedUser)return
          const {data}= await axios.get(backendUrl+`/api/v1/getmessage/${selectedUser._id}`)
          if(data.success){
            setMessages(data.message)
          }
        }
        catch(err){
            console.log(err.response?.data?.message||err.message||'Somthing Went Wrong')
            toast(err.response?.data?.message||err.message||'Somthing Went Wrong')
        }
    }
    async function sendMessage(textMsg){
        try{
          if(!selectedUser)return
          console.log('ssss',selectedUser)
          const {data}= await axios.post(backendUrl+`/api/v1/send/${selectedUser._id}`,{text:textMsg})
          if(data.success){
            setMessages(prev=>[...prev,data.message])
          }
        }
        catch(err){
            console.log(err.response?.data?.message||err.message||'Somthing Went Wrong')
            toast(err.response?.data?.message||err.message||'Somthing Went Wrong')
        }
    }
    const value = {
        messages,
        selectedUser,
        setSelectedUser,
        unSeen,
        users,
        getUsers,
        getMessages,
        sendMessage
    }
    useEffect(()=>{
      
    },[selectedUser,messages])
    return (

        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}