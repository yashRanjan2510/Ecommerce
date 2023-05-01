const Product=require("../models/productschema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors =  require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//create  product
exports.createproduct=catchAsyncErrors(async (req,res,next)=>{
    req.body.user=req.user.id;
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

//update product   
exports.updateproduct=catchAsyncErrors(async (req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(201).json({
        success:true,
        product
     })
})

// delete product
exports.deleteproduct=catchAsyncErrors(async (req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
   await Product.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success:true,
        message:"Product deleted successfully" 
     })
})

//get all product
exports.getAllProducts= catchAsyncErrors(async (req,res,next)=>{
    const resultperpage=5;
    const productcount=await Product.countDocuments();
    const apifeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultperpage);
    const product=await apifeature.query;
    res.status(201).json({
        success:true,
        product,
        productcount
    })
})

//get product detail
exports.getproductdetail=catchAsyncErrors(async (req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(201).json({
        success:true,
        product
    })
   
})


// create a new review or update the review
exports.createproductreview=catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productid}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product=await Product.findById(productid);
    const isreviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());

    if(isreviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating=rating),( rev.comment=comment)
        })
    }
    else{
        product.reviews.push(review);
        product.numOfreviews=product.reviews.length;
    }
    let avg=0;
    product.reviews.forEach((rev)=>{
        avg=avg + rev.rating
    });

     product.ratings=avg/product.reviews.length;
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        product
    })
})


//get all reviews of a product
exports.getproductreviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(201).json({
        success:true,
        reviews:product.reviews
    })
})


//delete review
exports.deletereview=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.productid);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());
   
    let avg=0;
    reviews.forEach((rev)=>{
        avg=avg + rev.rating
    });

    const ratings=avg/reviews.length;
    const numOfreviews=reviews.length

    await Product.findByIdAndUpdate(req.query.productid,{
        reviews,
        ratings,
        numOfreviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
     res.status(201).json({
        success:true,
       
    })
})
