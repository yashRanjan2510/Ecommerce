const express=require("express");
const cookieparser=require("cookie-parser");
const app=express();
const errormiddleware=require("./middleware/error");


app.use(express.json());
app.use(cookieparser())
//route
const product=require("./route/productroute");
const user=require("./route/userroute")
app.use("/api/v1",product);
app.use("/api/v1",user)


//middleware for error
app.use(errormiddleware);

module.exports=app;

// coding