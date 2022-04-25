// to get token JWT
const jwt =require('jsonwebtoken')
// to hash password
const bcrypt=require('bcryptjs')
// async handeller
const asyncHandler=require('express-async-handler')
// to use auther model
const Auther=require('../model/autherModel')
const { json } = require('express/lib/response')

//------------------register---------------------------//

// to register auther or user >> /api/authers >> post methode
const registerAuther=asyncHandler(async (req,res)=>{
    const {name, project_title, email, password } = req.body
    if (!name || !project_title|| !email || !password){
        res.status(400)
        throw new Error ('please add all info')
    }
    // check if auther exists
    const autherExists=await Auther.findOne({email})
    if(autherExists){
        res.status(400)
        throw new Error('Auther already exists')
    }

    // hash password >> need to add salt value 
    const salt=await bcrypt.genSalt(10) //generate salt
    const hashPassword = await bcrypt.hash(password,salt) // password from body with generation salt

    // create Auther 
    const auther=await Auther.create({
        name,
        project_title,
        email,
        password:hashPassword
    })
    if (auther){
        res.status(201).json({
            _id: auther.id,
            name:auther.email,
            project_title:auther.project_title,
            email:auther.email,
            token: genToken(auther._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Auther Info')
    }
})

//------------------login---------------------------//

// to login auther or user >> /api/authers/login >> post methode
const loginAuther= asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    // ckeck user email
    const auther=await Auther.findOne({email})
    // compare the password with password in DB
    if(auther && (await bcrypt.compare(password, auther.password))){
        res.json({
            _id: auther.id,
            name:auther.email,
            project_title:auther.project_title,
            email:auther.email,
            token: genToken(auther._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Email or Password')
    }

    res.json({message:'Login Auther'})
})

//------------------Get Info >> Private---------------------------//

// to Get auther or user Data >> /api/authers/info >> GET methode
const getAuther= asyncHandler(async (req,res)=>{
    const {_id,name,project_title,email}= await Auther.findById(req.auther.id)
    res.status(200).json({
        id:_id,
        name,
        project_title,
        email

    })
})

//--------------------Jenerate Token-------------------------//
const genToken = (id)=>{
    return jwt.sign({id},process.env.Secret_Key,{
        expiresIn:'30d',
    })
}

module.exports={
    registerAuther,
    loginAuther,
    getAuther
}

// protect all project 
