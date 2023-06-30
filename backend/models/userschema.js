const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto= require("crypto");



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name "],
        maxLength:[30,"Nmae cannot exceed 30 character"],
        minLength:[4,"Nmae should have more than 4 character"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validator:[validator.isEmail,"Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter your password "],
        minLength:[8,"Password should have more than 8 character"],
        select: false,
    },
    avatar:{
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetpasswordtoken:String,
    resetpasswordexpire:Date
})

//bcrypt password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
})

//JWT token
userSchema.methods.getjwttoken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}


//compare password
userSchema.methods.comparepassword = async function(enteredpassword){
   return  await bcrypt.compare(enteredpassword,this.password);
}




//generating password reset token

userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resettoken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetpasswordtoken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
  
    this.resetpasswordexpire = Date.now() + 15 * 60 * 1000;
  
    return resettoken;
  };
  


module.exports=mongoose.model("User",userSchema)