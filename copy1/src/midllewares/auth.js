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
async function apikeyAuth(request, reply) {
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

// this is the basic auth we already did hash the code and store in db with the hashing ethod
async function basicAuth(request, reply) {

    // console.log(:i was called);
    const authHeader = request.headers['authorization'];
    // here auth haeder has a vallue starts with basic 
    if(!authHeader)
    {
        reply.status(401).send({error: "no auth header"});
    }
    const [authType, authKey] = authHeader.split(" ");
    if(authType !== 'Basic')
    {
        // now lets test other type and see if its work
        return reply.status(401).send({error: " requires basic auth"});
    }
    // lets decode the key//

    // const credentials = Buffer.from(authKey, "base64").toString();

}

module.exports = {apikeyAuth, basicAuth};
// i have two ways to invoke it manually or using hook in a lifestyle on nodejs 




// console.log(request.headers);
// console.log("1111111", request.headers['authorization']);
// console.log("222222222", authHeader);
// [a, b] = "Basic abc def ghi".split(" ");
// console.log(a);
// console.log(b);