const mongoose =require('mongoose') 

const databaseConnection=()=>{
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING+"/WhatsAppMsg")
    .then(res=>{console.log( "MongoDB Connected Successfully")})
    .catch(err=>{
        console.log(err.message)
    })
}
module.exports=databaseConnection