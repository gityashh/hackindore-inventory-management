const userModel = require("../models/userSchema")
const mongoose = require('../config/mongoose-connection')

async function checkRole(req,res,next) {
    let user = await userModel.findOne({_id:req.user.id})
    if (user.roleLevel>3) {
        next();
    }
    else{
        res.send("You are not authorized")
    }
}

module.exports = checkRole