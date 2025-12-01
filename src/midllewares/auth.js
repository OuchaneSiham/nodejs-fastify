  require('dotenv').config();
// thsi is a global function  we can
// async function auth(request, reply) {

//     const apiKey = request.headers['x-api-key'];
//     const known = process.env.API_KEY;
//     if(!apiKey || apiKey !== known)
//     {
//         return reply.status(401).send({error: "unauthorized acc"});
//     }
// }


// we can chekc the methodss 
async function auth(request, reply) {
// for the get and head methodsa we can just skip return we wont applyu the key
    if(['GET', 'HEAD'].includes(request.method))
        return;// if we request with get it will skip
    const apiKey = request.headers['x-api-key'];
    const known = process.env.API_KEY;
    if(!apiKey || apiKey !== known)
    {
        return reply.status(401).send({error: "unauthorized acc"});
    }
}

module.exports = auth;
// i have two ways to invoke it manually or using hook in a lifestyle on nodejs 
// 230 270 3892578211032200 89