  require('dotenv').config();

const User = require("../models/user.model");
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
    }
    catch(error)
    {
        return reply.status(500).send({error: " error while login"});
        // console.log("oppsssssssss");
    }

    //
    // then take what did the other function return in comparison 
}

module.exports = {apikeyAuth, basicAuth};
