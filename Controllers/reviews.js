const Listing=require("../models/listing.js")
const Review=require("../models/review.js");


module.exports.createreview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newreview=new Review(req.body.review)
    listing.reviews.push(newreview);
    newreview.author=req.user._id;
    console.log(newreview); 
   
    await listing.save();
    await newreview.save();
    req.flash("sucess","Review Added Successfully");
    
    res.redirect("/listings")
}
module.exports.destroyreviews=async(req,res)=>{
    let {id,reviewsID}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewsID}});
    await Review.findByIdAndDelete(reviewsID);
      req.flash("sucess","Review Deleted Successfully");

     res.redirect(`/listings/${id}`); 
}