const express = require('express');
const app = express();
const path  = require('path')
const connection = require('./config/mongoose-connection')
const indexRouter = require("./routes/index-routes")


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, "public")));

app.use("/",indexRouter);
app.listen(3000)