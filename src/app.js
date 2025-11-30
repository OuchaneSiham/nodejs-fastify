const fastify = require('fastify')({ logger: true });
const path = require("path");
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
mongoose.connect(process.env.DB_URL)
        .then(() => console.log("connected to database"))
        .catch(error => console.log("error", error));
const userRoutes = require("./routes/user.routes");

fastify.register(userRoutes, {prefix: "/api/v1/users"});
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