const mongoose = require("mongoose");

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
    // password:{
    //     type: String,
    //     required: true,
    //     trim: true,
    // }
})
const User = mongoose.model('user', userSchema);
module.exports = User;