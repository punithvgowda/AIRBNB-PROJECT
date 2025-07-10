const user=require("../models/user.js")

module.exports.usersignup=async(req,res)=>{
 try {
       let {username,password,email}=req.body;
    const newuser=new user({username,email});
    const registereduser=await user.register(newuser,password);
    console.log(registereduser)
    req.login(registereduser,(err)=>{
        if(err){
            next(err);
        }
          req.flash("sucess","Sucesssfully Registerd. Welcome to WonderWrld");
    res.redirect("/listings")
    })
  
 } catch (e) {
    req.flash("error",e.message);
    res.redirect("/signup");
 }
}
module.exports.renderlogin=(req,res)=>{
    res.render("user/login.ejs");
}
module.exports.login=async(req,res)=>{
    req.flash("sucess","Welcom Back To WonderWrld");
    console.log(res.locals.redirectUrl); // in middleware.js we are creating a moddleware which saves req.seesion.redirecturl to local variable and that we are usingf here 
    console.log(req.session.redirecturl);//to redirect it inot the page the user asking after making hem login
    let redirecturlnow=res.locals.redirectUrl || "/listings";
    console.log(redirecturlnow);
    res.redirect(redirecturlnow);
}
module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
        if(err){
             return next(err);
        }
          req.flash("sucess","Successfully Logged Out!");
    res.redirect("/listings");
    })
  
}
