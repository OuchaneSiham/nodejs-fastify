//lets map the routes to our controllers
const userController =  require("../controllers/user.controller.js");


async function routes(fastify, options)
{
    fastify.get("/", userController.getAllUsers);
    fastify.get("/:id", userController.getUserById);
    fastify.post("/", userController.createUser);
    fastify.put("/:id", userController.updateUser);
    fastify.delete("/:id", userController.deleteUser);


}
module.exports = routes;