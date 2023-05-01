const express=require("express");
const app=express();

//route
const product=require("./route/productroute");
app.use("/api/v1",product);

module.exports=app;

// coding