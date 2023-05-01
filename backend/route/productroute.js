const express=require("express");
const router=express.Router();
const { getAllProducts,createproduct, updateproduct, deleteproduct ,getproductdetail, createproductreview, getproductreviews, deletereview} = require("../controller/productcontroller");
const { isauthenticated, authorizeRoles } = require("../middleware/isauthenticated");



router.route("/products").get( getAllProducts);
router.route("/admin/product/new").post(isauthenticated,authorizeRoles("admin") ,createproduct);
router.route("/admin/product/:id").put(isauthenticated,authorizeRoles("admin"),updateproduct).delete(isauthenticated,authorizeRoles("admin"),deleteproduct);
router.route("/product/:id").get(getproductdetail);
router.route("/review").put(isauthenticated,createproductreview)
router.route("/reviews").get(getproductreviews).delete(isauthenticated,deletereview);

module.exports=router;