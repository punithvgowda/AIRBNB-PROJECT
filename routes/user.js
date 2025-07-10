const express=require("express");
const app=express();
const router=express.Router(); //router 
const wrapasync=require("../utils/wrapasync")
const user=require("../models/user.js")
const passport=require("passport");
const {saveredirecturl}=require("../middleware.js");
const usercontroller=require("../Controllers/users.js");


router.route("/signup")
.get((req,res)=>{ // get login route
    res.render("user/signup.ejs")
})
.post(wrapasync(usercontroller.usersignup)); //post login route
//render loginpage route
router.route("/login")
.get(usercontroller.renderlogin)
//login route
.post(saveredirecturl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),
usercontroller.login

)
//logout route
router.get("/logout",usercontroller.logout);

module.exports=router;