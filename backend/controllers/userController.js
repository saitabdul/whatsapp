const userModel=require('../database/model/userModel')
const bcrypt=require('bcrypt')
const generateToken=require('../utils/generateToken')
const cloudinary=require('../utils/cloudinary')
const mongoose=require('mongoose')
const ErrorHandler=require('../utils/ErrorHandler')


exports.register=async(req,res,next)=>{
    const{fullname,email,password,profilePic,bio}=req.body
    try{
        if(!fullname || !email || !password || !bio){
           return next(new ErrorHandler("Missing Data",401))

            
        }
        let user=await userModel.findOne({email})
        if(user){
           // return next(new ErrorHandler("Email is already exists",401))
           return res.status(401).json({
            success:'false',
            message:'Password Wrong'
        })
            
        }
        
        const hashedPassword=await bcrypt.hash(password,10)
         user=await userModel.create({fullname,email,password:hashedPassword,bio,profilePic})
        const token=generateToken(user._id)
        res.status(201).cookie('token',token,{httpOnly:true}).json({
            success:'true',
            token,
            message:"User Created Successfully",
            user
        })

    }
    catch(err){
        console.log(err.message)
        res.json({
            success:'false',
            message:err.message
        })
    }

}

exports.login=async(req,res,next)=>{
    const{email,password}=req.body
    try{
        if(!email || !password ){
            return res.json({

                success:'false',
                message:'Missing Data'
            })
        }
        let user=await userModel.findOne({email}).select('+password')
        if(!user){
          //  return next(new ErrorHandler("Email Not Found",404))
          return res.status(401).json({
            success:'false',
            message:'Password Wrong'
        })
          
        }
        
        const verifyPassword=await bcrypt.compare(password,user.password)
        
        if(!verifyPassword){
            return res.status(401).json({
                success:'false',
                message:'Password Wrong'
            })
        }
        const token=generateToken(user._id)
        
        
        res.status(200).cookie('token',token,{httpOnly:true}).json({
            success:'true',
            token,
            message:"User Login Successfully",
            user
        })

    }
    catch(err){
        console.log(err.message)
        res.json({
            success:'false',
            message:err.message
        })
    }
    
}
exports.logout=async(req,res)=>{
    const{email}=req.user
    try{
        if(!email  ){
            return res.json({
                success:'false',
                message:'Missing Data'
            })
        }
        let user=await userModel.findOne({email})
        
        res.status(200).json({
            success:'true',
            message:"User Logout Successfully",
            user
        })
        

    }
    catch(err){
        console.log(err.message)
        res.json({
            success:'false',
            ok:"00",            
            message:err.message
        })
    }

}
exports.checkVerify=async(req,res)=>{
    try{
        const user=await userModel.findById(req.user._id)
        res.status(200).json({
            success:'true',
            message:"Verify Successfully",
            user
        })
    }
    catch(err){
        console.log(err.message)
        res.json({
            success:'false',
            message:err.message
        })
    }
}
exports.updateProfile=async(req,res)=>{
    try{
        const id=req.user._id
        const {fullname,profilePic,bio} =req.body
        let user=await userModel.findById(id)
        if(!user){
            return res.json({
                success:'false',
                message:'Id is Not Found'
            })
        }
        let imageUrl;
        if(profilePic){
            const result=await cloudinary.uploader.upload(profilePic)
            imageUrl=result.secure_url
        }
         user=await userModel.findByIdAndUpdate(id,{fullname,profilePic:imageUrl,bio},{new:true})
        
        res.status(201).json({
            success:'true',
            message:"User Updated Successfully",
            user
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({
            success:'false',
            err:"internal",
            message:err.message
        })
    }

}
exports.getAllUser=async(req,res)=>{
    try{
       
        let user=await userModel.find()
        if(user.length==0){
            return res.json({
                success:'false',
                message:'Don`t Have Any User'
            })
        }
        
        
        res.json({
            success:'true',
            message:"View All The User ",
            user
        })



    }
    catch(err){
        console.log(err.message)
        res.json({
            success:'false',
            message:err.message
        })
    }

}