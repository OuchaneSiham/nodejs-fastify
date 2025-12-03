//lets map the routes to our controllers
const userController =  require("../controllers/user.controller.js");

const auth = require("../midllewares/auth.js");
async function routes(fastify, options)
{
    fastify.get("/", userController.getAllUsers);
    fastify.get("/:id", userController.getUserById);
    fastify.post("/", userController.createUser);// before auth
     fastify.post("/login", userController.jwbsLogin);
    // fastify.post("/",{preHandler: auth}, userController.createUser);//after auth
    // we can use it in the other routes 
    fastify.put("/:id", userController.updateUser);
    fastify.delete("/:id", userController.deleteUser);


}
module.exports = routes;