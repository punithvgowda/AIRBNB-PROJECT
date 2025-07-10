const { reviewSchema } = require("../schema.js");
const Review=require("../models/review.js");
const wrapasync=require("../utils/wrapasync");
const ExpressError=require("../EpressError.js");
const express=require("express");
const reviewcontroller=require("../Controllers/reviews.js");
const app=express();
const rerouter = express.Router({ mergeParams: true }); // ✅ this allows access to :id from parent route

const Listing=require("../models/listing.js")
const {validateReview,isloggedin,isauthor}=require("../middleware.js");


//Post review route

rerouter.post("/",isloggedin,validateReview,wrapasync(reviewcontroller.createreview));
//delete review route
rerouter.delete("/:reviewsID",isloggedin,isauthor,wrapasync(reviewcontroller.destroyreviews));
    module.exports=rerouter;
    