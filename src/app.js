const path = require("path");
const auth = require("./midllewares/auth")
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
console.log('__dirname:', __dirname);
const fastify = require('fastify')({ logger: true });
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
// console.log(process.env.DB_URL);

const {basicAuth} = require("./midllewares/auth");


mongoose.connect(process.env.DB_URL)
        .then(() => console.log("connected to database"))
        .catch(error => console.log("error", error));
        
fastify.register(userRoutes, {prefix: "/api/v1/users"});
fastify.register(projectRoutes, {prefix: "/api/v1/projects"});

// fastify.addHook("preHandler", auth); we will remove it from her 
// and go the function th?e route that we want to 
// apply the auth on it ?
// watch the routes files 
fastify.addHook('preHandler', basicAuth);
const start = async() => 
{
    try{
        // await fastify.listen(process.env.PORT || 8888);
            await fastify.listen({ 
            port: 8888
            // host: '0.0.0.0' 
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