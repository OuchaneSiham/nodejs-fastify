// fp is a function imported from the fastify-plugin module.
// Its purpose: wrap a plugin function so Fastify can recognize
// it as a plugin.
// When you call fp(yourFunction), it returns a new function. 
// That new function is what you export.

const fp = require("fastify-plugin");
module.exports = fp(async function (fastify, opts)
{
    fastify.register(require("@fastify/jwt"),
    {
        secret: process.env.JWT_KEY
    })// this we can do it anywhere and when we plug in automaticcaly the token gets stored 
    console.log("AAAAAAAAAAAAAAAAAAAA");
    fastify.decorate("jwtAuthFun", async function (request, reply) 
    {
    try{
        await request.jwtVerify();
    }
    catch(error)
    {
       return reply.status(401).send({error: " ops unauth"}) 
    }
})
})
// The name you give 
// in fastify.decorate("jwtAuth", async function (request, reply) { … }) 
// is just how you’ll refer to it later on specific routes.