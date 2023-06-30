const express=require("express");
const { registeruser, loginuser,getallusers, logout, forgotpassword, resetpassword, getuserdetails, updatepassword, updateprofile, getsingleuser, updateuserrole, deleteuser } = require("../controller/usercontroller");
const router=express.Router();
const { isauthenticated, authorizeRoles } = require("../middleware/isauthenticated");


router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotpassword);
router.route("/password/reset/:token").put(resetpassword);
router.route("/me").get(isauthenticated ,getuserdetails );
router.route("/password/update").put(isauthenticated,updatepassword);
router.route("/me/update").put(isauthenticated,updateprofile);
router.route("/admin/user/:id").get(isauthenticated, authorizeRoles("admin"), getsingleuser);
router.route("/admin/users").get(isauthenticated, authorizeRoles("admin"), getallusers);
router.route("/admin/user/:id").put(isauthenticated,authorizeRoles("admin"),updateuserrole);
router.route("/admin/user/:id").delete(isauthenticated,authorizeRoles("admin"),deleteuser);




 





module.exports=router;