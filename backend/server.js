
const app=require("./app"); 
const dotenv=require("dotenv");
const connectdatabase=require("./config/database");

//config
dotenv.config({path:"backend/config/config.env"});
connectdatabase();



app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})


//happy coding