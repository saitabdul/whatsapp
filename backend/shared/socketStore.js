const onlineUsers={}
let io=null
const setIO=(ioInstance)=>{
    io=ioInstance
}
const getIO=()=>{
    return io
}
module.exports={
    onlineUsers,
    getIO,
    setIO
}