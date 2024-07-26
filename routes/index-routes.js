const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const userSchema = require('../models/userSchema')

router.get("/login",(req,res)=>{
    res.render("login.ejs")
})
router.post('/login',async function (req,res){
    try {
        
        let {name,department,password} = req.body;

        let user = await userModel.findOne({username:username}).select("+password");
        if (!user) return res.send('email or password did not match')

        if (process.env.JWT_SECRET) {
            bcrypt.compare(password, user.password, function (err,result) {
                if (result) {
                    let token = jwt.sign({username,id: user._id},process.env.JWT_SECRET)
                    res.cookie('token',token)
                    res.redirect('/profile')
                }
                else{
                    res.send('email or password did not match')
                }
            })
        }
        else{
            res.send('no secret key')
        }
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;