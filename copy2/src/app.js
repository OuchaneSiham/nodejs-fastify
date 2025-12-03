const path = require("path");
// const auth = require("./midllewares/auth")
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
// console.log('__dirname:', __dirname);
const fastify = require('fastify')({ logger: true });
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");

const {jwtAuth} = require("./midllewares/auth");


mongoose.connect(process.env.DB_URL)
        .then(() => console.log("connected to database"))
        .catch(error => console.log("error", error));
        
fastify.register(userRoutes, {prefix: "/api/v1/users"});
fastify.register(projectRoutes, {prefix: "/api/v1/projects"});
// fastify.addHook('preHandler', jwtAuth);
// fastify.addHook('preHandler', async (request, reply) => {
//     if (request.method === 'POST' && request.url === '/api/v1/users') {
//         return;
//     }
//     await basicAuth(request, reply);
// });

const start = async() => 
{
    try{
            await fastify.listen({ 
            port: 8888
        });

        fastify.log.info(
            `server is running on port ${fastify.server.address().port}`
        );
    }catch(error)
    {
        console.log(error);
    }
}
start();