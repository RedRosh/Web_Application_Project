// should contain each resource in project 
const express=require('express')
const router=express.Router()
const {registerAuther, loginAuther, getAuther}=require('../controller/autherController')

// to protect Info Page of auther 
const {protect} = require('../middleware/auth')
router.post('/',registerAuther)
router.post('/login',loginAuther)
router.get('/info',protect,getAuther)



// Gate for use any function here
module.exports=router