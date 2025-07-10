const Listing = require("./models/listing");
const ExpressError=require("./utils/ExpressError.js")
const { listingSchema } = require("./schema.js"); // ✅ Destructure the correct one
const { reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

   module.exports.saveredirecturl =(req,res,next)=>{
        if(req.session.redirecturl){
            res.locals.redirectUrl=req.session.redirecturl; // we are saving it inot local variable without using session varible directly becauase the passport willl clear the session variable   
            
            console.log(req.session.redirecturl)//once ur area authenicated by passport to login and a sucess message is sent the passport will reset the sessionn variable and we will get undefined when we use req.session.variable.
        }
        next();
      };

    module.exports.isloggedin=(req,res,next)=>{
          console.log('islogged in checking');
        if(!req.isAuthenticated()){
            //SAVING THE ORGINAL PAH FOR REDIRECTING THEM FOR THE PAGE THEY DESIRE AFTER THE LOGIN OR SIGNUP
            req.session.redirecturl=req.originalUrl;
            req.flash("error","You Need To Be Logged ");
            return res.redirect("/login");

         

        }   
        console.log("islogged checked")
           next();
    }

   
      module.exports.isowner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing.owner._id.equals(res.locals.currentuserinfo._id)) {
        req.flash("error", "You are not the owner of this property");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
    module.exports.isauthor = async (req, res, next) => {
        console.log("isauthor");
       console.log(req.params)
    let {id,reviewsID}=req.params;
  let reviews= await Review.findById(reviewsID); 
  console.log(reviews);
console.log(res.locals.currentuserinfo);
  
  if (!reviews.author.equals(res.locals.currentuserinfo._id)) {
            req.flash("error", "You are not the author of this review.");
            return res.redirect(`/listings/${id}`);
        }

    next();
};
module.exports.validateschema = (req, res, next) => {
 const { error } = listingSchema.validate(req.body); // ✅ use correct reference

 // Destructure 'error' from the result
    if (error) {
        const errmsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errmsg); // Use errmsg for a meaningful error message
    } else {
        next();
    }
};
//validate review from serverside
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
 // Destructure 'error' from the result
    if (error) {    
        const errmsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errmsg); // Use errmsg for a meaningful error message
    } else {
        next();
    }
};
