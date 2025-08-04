const jwt=require('jsonwebtoken')

const generateToken=(id)=>{
    const token=jwt.sign({id},process.env.SECRET_CODE)
    return token
}
module.exports=generateToken