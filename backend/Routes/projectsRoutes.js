// should contain each resource in project 

const express=require('express')
const router=express.Router()
// connect controller with routs نجيب كل الميثود من ملف الكنترول 
const {getProject,creatProject,updateProject,deleteProject}=require('../controller/projectsController')

const {protect}=require('../middleware/auth')
// اختصار لمسار الصفحات المتشابهه 
//GET with POST have same path 
router.route('/').get(protect, getProject).post(protect, creatProject)

//PUT with DELETE have same path 
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject)



// Gate for use any function here
module.exports=router