const jwt=require('jsonwebtoken')
const userModel=require('../database/model/userModel')
const ErrorHandler=require('../utils/ErrorHandler')
const productedRoute=async(req,res,next)=>{
    try{

        const token=req.cookies.token
        if(!token){
           return res.json({
                success:false,
                message:'First login to continue'
            })
        }
        const decode=await jwt.verify(token,process.env.SECRET_CODE)
        let user=await userModel.findById(decode.id)
        req.user=user
        next()
    }
    catch(err){
        
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}

module.exports=productedRoute