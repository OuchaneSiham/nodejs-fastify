//lets map the routes to our controllers
const userController =  require("../controllers/user.controller.js");
const some = require("../plugins/pligin.js");
const auth = require("../midllewares/auth.js");
const User = require("../models/user.model.js");
async function routes(fastify, options)
{
    // fastify.get("/", userController.getAllUsers);
    fastify.get("/", {preHandler: [fastify.jwtAuthFun]},userController.getAllUsers);

    fastify.get("/:id", userController.getUserById);
    fastify.post("/", userController.createUser);
    fastify.put("/:id", userController.updateUser);
    fastify.delete("/:id", userController.deleteUser);
    // fastify.post("/login", userController.jwbsLogin);
    fastify.post("/login", async function (request, reply) {
        const {email, password} = request.body;
    try{
        const user = await User.findOne({email}).select(["password", "_id", "lastName", "firstName"]);
        if(!user)
        {
            reply.status(401).send({error: "this user isnt in the db !"});
        }
        const isMatch = await user.comparePassword(password);
        if(isMatch == false)
        {
            reply.status(401).send({error: "wrong password try again!"});
        }
        console.log("SIHAMMMMM");
        if(isMatch)
        {
            const token = fastify.jwt.sign(
                {
                        firstName: user.firstName, 
                        lastName: user.lastName, 
                        email,
                        role: user.role,
                        userId: user._id
                },
                {expiresIn: "24h"}
            )
            console.log("token", token);
            reply.send({token: token});
        }
    }
    catch(error)
    {
        return reply.status(500).send({error: " error while login"});
    }
    })


}
module.exports = routes;