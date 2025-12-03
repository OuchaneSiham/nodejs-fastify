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

async function jwbsLogin(request, reply) 
{
    const {email, password} = request.body;
    try{
        const user = await User.findOne({email}).select(["password", "_id", "lastName", "firstName"]);
        if(!user)
            {
                reply.status(401).send({error: "this user isnt in the db !"});
            }
            const isMatch = await user.comparePassword(password);
            if(isMatch == false)
                {
                    reply.status(401).send({error: "wrong password try again!"});
                }
                // return isMatch;
                if(isMatch)
                    {
                        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", process.env.JWT_KEY);
                        const token = jwt.sign({firstName: user.firstName, lastName: user.lastName, email, userId: user._id}, process.env.JWT_KEY, 
                            {expiresIn:"24h"});
            reply.send({token: token});
        }
    }
    catch(error)
    {
        return reply.status(500).send({error: " error while login"});
    }
}
module.exports = {
    deleteUser, updateUser, createUser, getAllUsers, getUserById,
    jwbsLogin
}