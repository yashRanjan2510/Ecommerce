const express=require("express");
const router=express.Router();
const { isauthenticated, authorizeRoles } = require("../middleware/isauthenticated");
const { newOrder, getsingleorder, myorder, getallorders, updateorder, deleteorder } = require("../controller/ordercontroller");


router.route("/order/new").post(isauthenticated,newOrder)
router.route("/order/:id").get(isauthenticated,getsingleorder)
router.route("/orders/me").get(isauthenticated,myorder)

router
  .route("/admin/orders")
  .get(isauthenticated,authorizeRoles("admin"),getallorders);

router
  .route("/admin/order/:id")
  .put(isauthenticated,authorizeRoles("admin"),updateorder)
  .delete(isauthenticated,authorizeRoles("admin"),deleteorder);


module.exports=router;