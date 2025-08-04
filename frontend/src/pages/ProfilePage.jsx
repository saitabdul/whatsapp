import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"

export default function ProfilePage() {
    const { authUser,update } = useContext(AuthContext)
    const [fullname, setFullname] = useState('')
    const [bio, setBio] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('')
    function setAvatarHandler(e){
        const img= e.target.files[0]
        console.log(img,"img")
        const tempUrl=URL.createObjectURL(img)
        console.log("blob",tempUrl)
        setAvatarPreview(tempUrl)
        const reader=new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload=()=>{
            if(reader.readyState==2){
                setAvatar(reader.result)
                console.log("Ava:",reader.result)
            }
        }
    }
    const navigate=useNavigate()
    useEffect(()=>{
        console.log("good",authUser)
        if(authUser){
            setFullname(authUser.fullname)
            setBio(authUser.bio)
        }
    },[authUser])
    async function submitHandler(){
       if(!avatar){

           await update(fullname,bio,null)
           navigate('/')
        }
        await update(fullname,bio,avatar)
        navigate('/')
       
        
    }
    return (
        <>
            {

                authUser &&
                <div className="profile-body">
                    <div className="profile-container">
                        <div className="profile-data">
                            <div className="avatar-profile">
                                <img src={avatarPreview||"/Profile/google.png"} alt="" />
                                <input type="file"onChange={e=>setAvatarHandler(e)}   />
                            </div>
                            <input type="text" value={fullname} onChange={e=>setFullname(e.target.value)} placeholder="Fullname" />
                            <textarea placeholder="Bio.." value={bio} onChange={e=>setBio(e.target.value)}  name="" id="" cols="30" rows="6"></textarea>
                            <button className="save-btn" onClick={submitHandler}>Save</button>
                        </div>
                        <div className="profile-logo">
                            <img src={authUser.profilePic||"/vite.svg"} alt="" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}