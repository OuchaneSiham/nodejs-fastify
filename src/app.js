const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
console.log('__dirname:', __dirname);
const fastify = require('fastify')({ logger: true });
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
// console.log(process.env.DB_URL);
mongoose.connect(process.env.DB_URL)
        .then(() => console.log("connected to database"))
        .catch(error => console.log("error", error));
        
fastify.register(userRoutes, {prefix: "/api/v1/users"});
fastify.register(projectRoutes, {prefix: "/api/v1/projects"});

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