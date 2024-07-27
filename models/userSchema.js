const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    employeeId:{
        type: Number,
        length: 12,
        trim:true,
    },
    name:{
        type: String,
        required:true,
        trim:true,
    },
    password:{
        type: String,
        required:true,
        select:false
    },
    department:{
        type:String,
        required:true,
        enum:["All","Water Supply","Infrastructure","Road development","Environment"],
        trim:true
    },
    roleLevel:{
        type: Number,
        enum:[1,2,3,4],
        required:true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;