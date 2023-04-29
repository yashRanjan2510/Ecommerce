const express=require("express");
const router=express.Router();
const { getAllProducts,createproduct } = require("../controller/productcontroller");



router.route("/product").get(getAllProducts);
router.route("/product/new").post(createproduct);

module.exports=router;