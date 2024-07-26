const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;