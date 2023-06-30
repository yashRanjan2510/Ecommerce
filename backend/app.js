const express=require("express");
const cookieparser=require("cookie-parser");
const app=express();
const errormiddleware=require("./middleware/error");
const bodyparser=require("body-parser")
const fileupload=require("express-fileupload")


app.use(express.json());
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileupload());
//route
const product=require("./route/productroute");
const user=require("./route/userroute")
const order=require("./route/orderroute");
const fileUpload = require("express-fileupload");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order)


//middleware for error
app.use(errormiddleware);

module.exports=app;

