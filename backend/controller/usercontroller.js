const User=require("../models/userschema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors =  require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const crypto= require("crypto");



//register user
exports.registeruser=catchAsyncErrors(async(req,res,next)=>{
    const{name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
        avator:{
            public_id:"this is sample id",
            url:"profileurl",
        },
    })
    sendToken(user,201,res);
})


//login user
exports.loginuser=catchAsyncErrors(async(req,res,next)=>{
    const { email , password }=req.body;

    //checking if user has given password and both

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }

    
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const ispasswordmatched= await user.comparepassword(password);

    if(!ispasswordmatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

   sendToken(user,200,res);

})


//Logout 
exports.logout=catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

//forgot password
exports.forgotpassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("user not found",404));
    } 

    //get resetpassword tokken
    const resettoken=  user.getResetPasswordToken();


    await user.save({validateBeforeSave:false});
     
    const resetpasswordurl=`${req.protocol}://${req.get("host")}/api/v1/password/reset${resettoken}`
    const message=`Your password reset token is :- \n\n ${resetpasswordurl} \n\n if you have not requested this email then, please ignore it`
   
    try {
        
        await sendEmail({
              email:user.email,
              subject:`Ecommerce Password Recovery`,
              message,

        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetpasswordtoken=undefined;
        user.resetpasswordexpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }
    
})


//reset password
exports.resetpassword=catchAsyncErrors(async(req,res,next)=>{
    //createing token hash
    const resetpasswordtoken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

      const user=await User.findOne({
        resetpasswordtoken,
        resetpasswordexpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",400));
    } 
    if(req.body.password!==req.body.confirmpassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password=req.body.password;
    user.resetpasswordtoken=undefined;
    user.resetpasswordexpire=undefined;
   
     await user.save();
     sendToken(user,200,res)
})



//get user details
exports.getuserdetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    console.log(user.name)
    res.status(200).json({
        success:true,
        user
    })
})

//update user password
exports.updatepassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const ispasswordmatched= await user.comparepassword(req.body.oldpassword);

    if(!ispasswordmatched){
        return next(new ErrorHandler("Incorrect oldpassword",400));
    }

    if(req.body.newpassword!==req.body.confirmpassword){
        return next(new ErrorHandler("Password does not match",400));
    }
    user.password=req.body.newpassword;
    await user.save();

    sendToken(user,200,res)
})


//update user profile
exports.updateprofile=catchAsyncErrors( async(req,res,next)=>{
    const newuserdata={
        name:req.body.name,
        email:req.body.email,
    }
    if(!newuserdata.name){
        return next(new ErrorHandler("Enter name to update",400));
    }
    if(!newuserdata.email){
        return next(new ErrorHandler("Enter Email to update",400));
    }

    //we will add cloudnary later
    const  user = await User.findByIdAndUpdate(req.user.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({
        success:true, 
        user
    })    
})

//get all user - admin
exports.getallusers = catchAsyncErrors(async(req,res,next)=>{

    const users=await User.find();
    res.status(200).json({
        success:true,
        users       
    }) 
})

//get single user - admin
exports.getsingleuser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id:${req.params.id}`,400));
    } 
    res.status(200).json({
        success:true,
        user      
    }) 
})

//update user role-Admin
exports.updateuserrole=catchAsyncErrors( async(req,res,next)=>{
    
    
    const newuserdata={
        role:req.body.role,
    }
    
    if(!newuserdata.role){
        return next(new ErrorHandler("Enter role to update",400));
    }

    //we will add cloudnary later
    const  user = await User.findByIdAndUpdate(req.user.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({
        success:true, 
        user
    })    
})

//delete user -Admin
exports.deleteuser=catchAsyncErrors( async(req,res,next)=>{
   
    
    const  user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist with id:${req.params.id}`,400));
    } 
    
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true, 
        message:"User deleted successfully"     
    })    
})