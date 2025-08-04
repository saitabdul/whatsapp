import { useState } from "react"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/authContext"
import { ChatContext } from "../../context/chatContext"

export default function LeftSideBar() {

    const { onlineUsers, authUser } = useContext(AuthContext)
    const { users, getUsers,getMessages,setSelectedUser,selectedUser,messages } = useContext(ChatContext)
    useEffect(() => {
        getUsers()
    }, [])
    useEffect(()=>{
        if(selectedUser){
          getMessages()
        }
      },[selectedUser,messages])
    function selectUserHandler(user){
        console.log('ok1')
        setSelectedUser(user)
        getMessages()

    }

    useEffect(() => {
        console.log("OS:", onlineUsers)
    }, [onlineUsers])
    return (
        <>
            {

                <div className="left-container">
                    <div className="left-top">
                        <img src="/vite.svg" alt="alan" />
                        <h3>Chatting</h3>
                    </div>
                    <div className="search">
                        <input placeholder="Search Here ..." />
                    </div>
                    <div className="user-list">
                        {
                            users && users.map((user, index) => (

                                <div className="user-box" key={index} onClick={e => selectUserHandler(user)}>
                                    <img src={user.profilePic && user.profilePic || "./Profile/default-image.jpg"} />
                                    <p>{user.fullname}</p>

                                </div>
                            ))
                        }


                    </div>

                </div>

            }
        </>
    )
}