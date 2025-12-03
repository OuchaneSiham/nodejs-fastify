  require('dotenv').config();

const User = require("../models/user.model");
const userRoutes = require("../routes/user.routes");

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
    // console.log("email", email);
    // console.log("password", password);
    // find the correct user in db after spliting 


    try{
        // const user = await User.findOne({email});
        // because we added select false 
        const user = await User.findOne({email}).select("password");
        // console.log(user);
        if(!user)
        {
            reply.status(401).send({error: "this user isnt in the db !"});
        }
        const isMatch = await user.comparePassword(password);
        // console.log("finally u did it!");
        // console.log( "result::::::::::::::::::", isMatch);
        if(isMatch == false)
        {
            reply.status(401).send({error: "wrong password try again!"});
        }
        return isMatch;
        // then take what did the other function return in comparison 
    }
    catch(error)
    {
        return reply.status(500).send({error: " error while login"});
        // console.log("oppsssssssss");
    }
}
async function jwtAuth(request, reply) 
{
    const authHeader = request.headers['authorization'];
    if(!authHeader)
        {
            reply.status(401).send({error: "no auth header"});
        }
        const [authType, authKey] = authHeader.split(" ");
        if(authType !== 'Bearer')
            {
                return reply.status(401).send({error: " requires bearer auth"});
            }
            console.log("siham aaaaaaaaaaa:::: key", authKey);
            console.log("siham aaaaaaaaaaa:::: type", authType);
            
            
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzaWhhbTUiLCJsYXN0TmFtZSI6Im91Y2hhbmU1IiwiZW1haWwiOiJzaWhhbTVAZXhhbXBsZS5jb20iLCJ1c2VySWQiOiI2OTMwMDkxYTNhNjBmMDIwYmJhMGJkMWMiLCJpYXQiOjE3NjQ3NTk0MzksImV4cCI6MTc2NDg0NTgzOX0.Ye_emxfCfhiJYWrcCzHDqMZifu7sNPxLugcU3L1_cv4"

module.exports = {apikeyAuth, basicAuth, jwtAuth};
