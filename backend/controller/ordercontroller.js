const Order = require("../models/ordermodels");
const Product = require("../models/productschema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      order,
    });
  });

  //get single order
  exports.getsingleorder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler("order not found with this id",404));}

        res.status(201).json({
            success: true,
            order,
          });
  })

   //get logged in user order
   exports.myorder=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id});

        res.status(201).json({
            success: true,
            orders,
          });
  })


   //get all order -- Admin
   exports.getallorders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find();
    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });
        res.status(201).json({
            success: true,
            totalAmount,
            orders,
          });
  })



  //update  order  status -- Admin
  exports.updateorder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    // console.log(order)
    // console.log("kjcnbcv")
    // order.orderItems.forEach(async (o)=>{
    //   const product = await Product.findById(o.product);
    //   console.log(product)
    //   product.stock -= o.quantity;
    //   await product.save({ validateBeforeSave: false });

    //   console.log(product)

    // })
    
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
  }

//delete order -Admin
  exports.deleteorder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    await Order.findByIdAndDelete(req.params.id)
  
    res.status(200).json({
      success: true,
    });
  });