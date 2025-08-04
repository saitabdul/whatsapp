const express=require('express')
const {getUserForSidebar,sendMessage,getMessage,deleteMessage,markAsRead} = require('../controllers/messageController')
const protectedRoute = require('../middleware/protectedRoute')
const router=express.Router()

router.route('/getuser').get(protectedRoute,getUserForSidebar)
router.route('/getmessage/:id').get(protectedRoute,getMessage)
router.route('/message').delete(protectedRoute,deleteMessage)
router.route('/markasread/:id').get(protectedRoute,markAsRead)
router.route('/send/:id').post(protectedRoute,sendMessage)
module.exports=router