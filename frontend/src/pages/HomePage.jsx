import { useState } from "react";
import ChatBox from "../components/ChatBox";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSIdeBar";

export default function HomePage(){
    const [selectedUser,setSelectedUser]=useState(true)
    const twocol={
        display:'grid',
        gridTemplateColumns:' 1fr  1fr'
    }
    const threecol={
        display:'grid',
        gridTemplateColumns:' 1fr 2fr 1fr'
    }
   
    return(
        <>
            <div className="home-body">
                <img className="background" src="/background/5594016.jpg" alt="" />
                <div className="home-container" style={selectedUser?threecol:twocol}  >
                    <LeftSideBar/>
                    <ChatBox/>
                    <RightSideBar/>
                </div>
            </div>
        </>
    )
}