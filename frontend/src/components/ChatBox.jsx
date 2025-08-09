import {useContext,useEffect,useState,useRef} from 'react'
import {AuthContext} from '../../context/authContext'
import {ChatContext} from '../../context/chatContext'
export default function ChatBox(){
    const {authUser}=useContext(AuthContext)
    const {messages,sendMessage,selectedUser}=useContext(ChatContext)
    const [sendMsg,setSendMsg]=useState('')
    const scrollbar=useRef(null)

    function msgHandler(){
        if(sendMsg==""){
            return
        }
        sendMessage(sendMsg)
        setSendMsg('')
        scrollbar.current?.scrollIntoView({behavior:'smooth'})
        
    }
    
    return(
        <>
        <div className="chat-container">
            <div className="chat-top">
                <div>
                    <img src={selectedUser && selectedUser.profilePic||"/Profile/default-image.jpg"} alt="" />
                    <p>{selectedUser&&selectedUser.fullname||"SELECT USER"}</p>
                    <p>*</p>
                </div>
                <div>
                    
                </div>
            </div>
            <div className="chat-middle" ref={scrollbar}>
               {messages&&
                messages.map((msg,index)=>(

                <div className={`message ${msg.senderId==authUser._id?'sent':'received'}`}key={index} >
                   {msg.text}
                </div>
                ))
               }
               
            </div>
            <div className="chat-bottom">
               
               <input type="text" placeholder=" Type Here ..." value={sendMsg} onChange={e=>setSendMsg(e.target.value)} />
               <button onClick={e=>msgHandler()}>send</button>
            </div>
        </div>
        </>
    )

}
