const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
{
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    role:{
        type: String,
        enum: ['Admin', 'Project manager', 'Team member'],
        trim: true,
        default: 'Team member',
    },
    password:{
        type: String,
        required: true
    }
    // userSchema.pre
})
// userSchema.pre("save", async function (next)
// {
//      console.log("PRE SAVE HOOK CALLED");
//     console.log("Type of next:", typeof next);
//         try{
//             if(this.isModified("password") || this.isNew)
//             {
//             const salt = await bcrypt.genSalt(10);
//             this.password = await bcrypt.hash(this.password, salt);
//             console.log('Password hashed successfully!');
//         }
//         next();
//     }
//         catch(error)
//         {
//             next(error);
//         }
//     })
userSchema.pre("save", async function () {
    // mongoose dont support next 
    try {
        if(this.isModified("password") || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            console.log('Password hashed successfully!');
        }
    } catch(error) {
        throw error;
    }
});
const User = mongoose.model('user', userSchema);
module.exports = User;