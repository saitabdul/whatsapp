const userModel = require('../database/model/userModel')
const messageModel = require('../database/model/messageModel')
const cloudinary=require('../utils/cloudinary')
const {onlineUsers,getIO}=require('../shared/socketStore')

exports.getUserForSidebar = async (req, res) => {
    try {
        const userId = req.user.id
        const filterUser = await userModel.find({ _id: { $ne: userId } })
        //count
        unSeenMessage = {}
        const promise = filterUser.map(async user => {
            const message = await messageModel.find({ senderId: user._id, receiverId: userId, seen: false })
            if (message.length > 0) {
                unSeenMessage[user._id] = message.length
            }
        })
        await Promise.all(promise)
        res.status(200).json({
            success: true,
            message: 'filterUser',
            user: filterUser,
            unSeenMessage

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Internal server Error',
            err: err.message
        })
    }
}
exports.getMessage = async (req, res) => {
    try {
        const userId = req.user._id
        const selectedUser = req.params.id
        const message = await messageModel.find(
            {
                $or: [

                    { senderId: userId, receiverId: selectedUser },
                    { senderId: selectedUser, receiverId: userId }
                ]
            }
        )
        await messageModel.updateMany({ senderId: selectedUser, receiverId: userId,seen:false },{seen:true})
        res.status(200).json({
            success: true,
            message1: 'get message',
            message: message

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Internal server Error',
            err: err.message
        })
    }
}
exports.deleteMessage = async (req, res) => {
    try {
       
        const message =await messageModel.deleteMany()
        res.status(200).json({
            success: true,
            message1: 'delete messages',
            message: message

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Internal server Error',
            err: err.message
        })
    }
}
exports.markAsRead = async (req, res) => {
    try {
        
        const id = req.params.id
        const message = await messageModel.findByIdAndUpdate(id,{seen:true})
        

        res.status(200).json({
            success: true,
            message: 'Mark As Read message',
            message1: message

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Internal server Error',
            err: err.message
        })
    }
}   
exports.sendMessage = async (req, res) => {
    try {
        const {text,image}=req.body
        const senderId = req.user._id
        const receiverId = req.params.id
        let imageUrl;
        if(image){
            const result=await cloudinary.uploder.upload(image)
            imageUrl=result.secure_url
        }
        if(!text && !image){
            return res.status(404).json({
                success:false,
                message:'Missing Data'
            })
        }
        const message = await messageModel.create({senderId,receiverId,text,image})
        
       
        
        const receiverSocketId=onlineUsers[receiverId]
        console.log(onlineUsers)
        getIO().to(receiverSocketId).emit('newMessage',message)
        
        

        res.status(200).json({
            success: true,
            message1: 'send Message',
            message: message

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Internal server Error',
            err: err.message
        })
    }
}   