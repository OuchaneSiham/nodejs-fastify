const userRoutes = require("../routes/user.routes");
const  jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const auth = require("../midllewares/auth")
async function getAllUsers(request, reply) 
{
    try{
        const user = await User.find();
        reply.send(user);
        // reply.send("not implemented yet")
    }
    catch(error)
    {
        reply.status(500).send(error);
    }
}

async function getUserById(request, reply) 
{
    try{
        const user = await User.findById(request.params.id);
        reply.send(user);
        // reply.send("not implemented yet")
    }
    catch(error)
    {
        reply.status(500).send(error);
    }
}
async function createUser(request, reply) {
    try {
        const user = new User(request.body);
        const result = await user.save();
        reply.send(result);
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function updateUser(request, reply) 
{
    try{
        // reply.send("not implemented yet")

        const user = await User.findByIdAndUpdate(request.params.id, request.body, {new: true});
        reply.send(user);
    }
    catch(error)
    {
        reply.status(500).send(error);
    }
}
async function deleteUser(request, reply) 
{
    try{
        // reply.send("not implemented yet")
        await User.findByIdAndDelete(request.params.id);
        reply.status(204).send("");
    }
    catch(error)
    {
        reply.status(500).send(error);
    }
}

// async function jwbsLogin(request, reply) 
// {
// }
module.exports = {
    deleteUser, updateUser, createUser, getAllUsers, getUserById
}