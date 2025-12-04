const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const fastify = require('fastify')({ logger: true });
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const jwtPlugin = require("./plugins/pligin");
fastify.register(jwtPlugin);
    // fastify.register(require("@fastify/jwt"),
    // {
    //     secret: process.env.JWT_KEY
    // })

mongoose.connect(process.env.DB_URL)
        .then(() => console.log("connected to database"))
        .catch(error => console.log("error", error));
        
// we just reguster it now we can use hook or we can target a route 

fastify.register(userRoutes, {prefix: "/api/v1/users"});
fastify.register(projectRoutes, {prefix: "/api/v1/projects"});
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