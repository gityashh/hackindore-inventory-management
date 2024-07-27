const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const userModel = require('../models/userSchema')
const { isLoggedIn, redirectIfLogin } = require('../middlewares/isloggedin')
const checkRole = require('../middlewares/checkRole')

router.get("/",isLoggedIn,(req,res)=>{
    res.render("dashboard")
})

router.get("/login",redirectIfLogin,(req,res)=>{
    res.render("login.ejs")
})

router.get("/adminPanel",isLoggedIn,checkRole,(req,res)=>{
    res.render("register")
})

router.post("/registerUser",async (req,res)=>{
    let {name,employeeId,department,password,roleLevel} = req.body;
    let checkuser = await userModel.findOne({employeeId})
    if (checkuser) return res.send("User already exists")
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt,async function (err, hash) {
            if (err) {
                return res.send(err.message)
            }
            const createduser = await userModel.create({
                employeeId:employeeId,
                name: name,
                password:hash,
                department:department,
                roleLevel:4,
            }) 
            res.send(createduser)      
        })
    })
})

router.post('/login',async function (req,res){
    try {
        const {employeeId,password} = req.body;

        let user = await userModel.findOne({employeeId}).select("+password");
        if (!user) return res.send('email or password did not match')
        bcrypt.compare(password, user.password, function (err,result) {
            if (result) {
                let token = jwt.sign({employeeId,id: user._id},"secret")
                res.cookie("token",token)
                res.send("loggedin")
            }
            else{
                res.send("email or password did not match")
            }
        })
    } catch (err) {
        res.send(err)
    }
})

router.get("/reset",isLoggedIn,async function (req,res){
    res.render("reset")
})

router.post('/reset',isLoggedIn,async function (req,res){
    try {
        let employee = userModel.findOne({_id:req.user.id})
        bcrypt.genSalt(10,function (err,salt) {
            bcrypt.hash(req.user.password,hash,async function (req,res) {
                if (err){
                    return res.send(err)
                }
                employee.password = hash;
                await user.save()
            })
        })
        res.redirect("/")
    } catch (err) {
        res.send(err)
    }
})

router.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/login")
})

module.exports = router;