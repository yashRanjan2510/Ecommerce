
const app=require("./app"); 
const dotenv=require("dotenv");
const connectdatabase=require("./config/database");

//handle uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaughtexception`);
    process.exit(1);
})


//config
dotenv.config({path:"backend/config/config.env"});
connectdatabase();



app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})