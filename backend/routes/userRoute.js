const express=require('express')
const {register,getAllUser,login,logout,updateProfile,checkVerify} = require('../controllers/userController')
const protectedRoute = require('../middleware/protectedRoute')
const router=express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/user').get(getAllUser)
router.route('/logout').get(protectedRoute,logout).post(logout)
router.route('/update').put(protectedRoute,updateProfile)
router.route('/check-auth').get(protectedRoute,checkVerify)

module.exports=router