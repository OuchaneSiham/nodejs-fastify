  require('dotenv').config();

const User = require("../models/user.model");
const userRoutes = require("../routes/user.routes");
const  jwt = require("jsonwebtoken");

async function apikeyAuth(request, reply) {
    if(['GET', 'HEAD'].includes(request.method))
        return;
    const apiKey = request.headers['x-api-key'];
    const known = process.env.API_KEY;
    if(!apiKey || apiKey !== known)
    {
        return reply.status(401).send({error: "unauthorized acc"});
    }
}
async function basicAuth(request, reply) {

    const authHeader = request.headers['authorization'];
    if(!authHeader)
    {
        reply.status(401).send({error: "no auth header"});
    }
    const [authType, authKey] = authHeader.split(" ");
    if(authType !== 'Basic')
    {
        return reply.status(401).send({error: " requires basic auth"});
    }
    const credentials = Buffer.from(authKey, "base64").toString('ascii');

    const [email, password] = credentials.split(":");

    try{
        const user = await User.findOne({email}).select("password");
        if(!user)
        {
            reply.status(401).send({error: "this user isnt in the db !"});
        }
        const isMatch = await user.comparePassword(password);
        if(isMatch == false)
        {
            reply.status(401).send({error: "wrong password try again!"});
        }
        return isMatch;
    }
    catch(error)
    {
        return reply.status(500).send({error: " error while login"});
    }
}

module.exports = {apikeyAuth, basicAuth};
