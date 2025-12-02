const mongoose = require('mongoose');
const User = require('./user.model');
const projectSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: true,
            trim: true
        },
        discreption:
        {
            type: String,
            // required: true,
            trim: true
        },
        startDate:
        {
            type: Date,
            required: true,

        },
        endDate:
        {
            type: Date,
            required: true,
        },
        projectManager:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            validate:{
    
                validator: async function (userId) {
                    const user = await User.findById(userId);
                    return["Admin", "Project manager"].includes(user.role);
                },
                message: (props) =>
                    `User role must be either "Admin" or "Project Manager"`,
            },
        },
        teamMembers:
        [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    }
)

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
// title
// discreption 
// startDate
//endDate
// projectManager.
// teamMember

// projectManager: ID of a User
// Rules:
// - Must exist
// - Must refer to a real User
// - That User must be Admin or Project Manager