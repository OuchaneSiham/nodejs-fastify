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
        required: true,
        select: false
    }
})
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
userSchema.methods.comparePassword = async function (password) {
    try{
        return await bcrypt.compare(password, this.password);
    }
    catch(error)
    {
        console.log(error);

        throw error ;
    }
}

const User = mongoose.model('user', userSchema);
module.exports = User;