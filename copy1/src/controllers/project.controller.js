const Project = require("../models/project.model");
// const projectRoutes = require("../routes/project.routes");
const User = require("../models/user.model");
async function createProject(request, reply) {

    try{
        //first we gonna check that the projectmanager exesit in db and its valid 

        const projectManager = await User.findById(request.body.projectManager);
        if(!projectManager || !["Adim", "Project manager"])
        {
            return reply.status(400).send({message: "invalid project manager"});
        }
        //verify that teammember exist
        // and send it back one of them if its wrong 
        for(let memeberId of request.body.teamMembers)
        {
            const teamMember = await User.findById(memeberId);
            if(!teamMember)
            {
                return reply.status(400).send({message: `invalid team memeber: ${memeberId}`});
            }
        }
        //create project and return it

        const project = new Project(request.body);
        const result = await project.save();
        reply.send(result);

    }
    catch(error)
    {
        reply.send(error);
    }
    
}
async function getAllProjects(request, reply)
{
        try{
            const project = await Project.find();
            reply.send(project);
            // reply.send("not implemented yet")
        }
        catch(error)
        {
            reply.status(500).send(error);
        }
}

async function getProjectById(request, reply) {
    try{
        const projectid = await Project.findById(request.params.id);
        reply.send(projectid);
    }
            catch(error)
        {
            reply.status(500).send(error);
        }
}
async function updateProject(request, reply) 
{
    try{
        const projectId = request.params.id;
        const updates = request.body;
            if (updates.projectManager)
            {
                    const projectManager = await User.findById(updates.projectManager);
                    if(!projectManager)
                    {
                        return reply.status(400).send({message: "invalid project manager"});
                    }
            }

            if(updates.teamMembers)
            {
                for(let memeberId of updates.teamMembers)
                {
                    const user = await User.findById(memeberId);
                    if(!user)
                    {
                        return reply.status(400).send({message: `invalid team memeber: ${memeberId}`});
                    }
                }
            }
            const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {new: true});
            reply.send(updatedProject);
            }
            catch(error)
            {
                reply.status(500).send(error);
            }
}
async function deleteProject(request, reply)
{
    try{
        await Project.findByIdAndDelete(request.params.id);
        reply.status(204).send("");
    }
    catch(error)
    {
        reply.status(500).send(error);
    }
}
module.exports = {createProject, getAllProjects, getProjectById, updateProject,deleteProject};
// module.exports = {createProject};
