const express = require('express');
const app = express();
const path  = require('path')
const connection = require('./config/mongoose-connection')
const indexRouter = require("./routes/index-routes")
const cookieParser = require('cookie-parser')
const inventoryRoutes = require('./routes/inventory')


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, "public")));

const inventoryData = {
    "Electronics": ["Mobile", "Laptop", "Camera"],
    "Furniture": ["Table", "Chair", "Wardrobe"],
    "Clothing": ["Men", "Women", "Kids"]
};
app.get("/test",(req,res)=>{
    res.render('test',{inventoryData})
})

app.use("/inventory",inventoryRoutes);
app.use("/",indexRouter);
app.listen(3000)