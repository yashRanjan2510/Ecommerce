const mongoose=require('mongoose')

module.exports= async ()=>{
    const mongouri=""
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