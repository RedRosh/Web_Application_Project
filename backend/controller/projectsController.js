// add async to intract each function with DB
const asyncHandler = require('express-async-handler')

// project on DB
const Projects=require('../model/projectModel')
const Auther= require('../model/autherModel')

// control the GET method - routes - access privatly >> GET /api/projects
const getProject = asyncHandler(async (req,res)=>{
    const projects=await Projects.find({auther: req.auther.id})
    if(!projects){
        return res.status(404).send("No Project Found")
    }
    res.status(200).json({projects})
})

// control the POST method for create - routes - access privatly >> POST /api/projects 
const creatProject = asyncHandler(async (req,res)=>{
    
        const {title,auther,description,id} = req.body;
        let project=new Projects({
            title,
            description,
            // to connect project with auther
            auther:req.auther.id

        })
        await project.save();
        // to send data in body and check
    if(!project)// text is name of field 
    {
        res.status(400)
        throw new Error('There is No Project , Please Add one')// handel error
    }
    res.status(200).json({project});
})

// control the PUT method for update - routes - access privatly >> PUT /api/projects/:id
const updateProject = asyncHandler(async (req,res)=>{
    // Extract Id 
    //const {title,auther,description}=req.body;

    const project=await Projects.findById(req.params.id)
    if(!project){
        res.status(400)
        throw new Error('Project not Found')
    }
// --------------------------
    const auther=await Auther.findById(req.auther.id)
    if(!auther){
        res.status(401)
        throw new Error ('Auther not found')
    }
// login auther with its project 
    if(project.auther.toString() !==auther.id){
        res.status(401)
        throw new Error ('Auther not Autherized')
    }
//-------------------------------
    // search for project
    const updatedProject = await Projects.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
    });
    
    res.status(200).json(updatedProject)
})

// control the DELETE method for delete - routes - access privatly >> DELETE /api/projects/:id
const deleteProject = asyncHandler(async (req,res)=>{
    const project =await Projects.findByIdAndRemove(req.params.id)
    if (!project){
        res.status(400)
        throw new Error('Project Not Found')
    }
    const auther=await Auther.findById(req.auther.id)
    if(!auther){
        res.status(401)
        throw new Error ('Auther not found')
    }
// login auther with its project 
    if(project.auther.toString() !==auther.id){
        res.status(401)
        throw new Error ('Auther not Autherized')
    }
    res.status(200).json('Project is deleted')
})



module.exports={
    getProject,
    creatProject,
    updateProject,
    deleteProject,
}