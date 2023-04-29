const mongoose=require('mongoose')

module.exports= async ()=>{
    const mongouri="mongodb+srv://1903480130064it:Xr0v4oY8spx1JOJ9@cluster0.js53463.mongodb.net/?retryWrites=true&w=majority"
    try{
       await mongoose.connect(mongouri,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log('mongodb connected')
    }
    catch(error){
         console.log(error)
         process.exit(1)
    }
} 