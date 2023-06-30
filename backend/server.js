
const app=require("./app"); 
const dotenv=require('dotenv')
dotenv.config('./.env')
const cloudinary=require("cloudinary")
const connectdatabase=require("./config/database");

//handle uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaughtexception`);
    process.exit(1);
})




//config
connectdatabase();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
const PORT= process.env.PORT || 4000




app.listen(PORT ,  ()=>{  
    console.log(`listning on port: ${PORT}`)
})