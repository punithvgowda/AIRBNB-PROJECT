const Listing=require("../models/listing.js")


module.exports.indexListing=async(req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs",{ allListing });
    
 } 

module.exports.newListing=(req,res)=>{
    res.render("listing/new.ejs")
    console.log("new.ejs file was rendered sucessfully")
  }

  module.exports.showListing=async(req,res )=>{
    let {id}=req.params;
    const listings=await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author",
    }}).populate('owner');
if(!listings){
    req.flash("error","The Template you requested for doesn't exist");
   return  res.redirect("/listings")
}
     //console.log(listings);
    

    console.log("Populated Reviews:", listings.reviews);

  
    res.render("listing/show.ejs",{listings})  
    console.log("ejs file rendered sucessfully")
}
module.exports.createListing=async (req, res) => {
  // 1. Get location from form (e.g., "Bangalore", "Delhi", etc.)
  const maplocation = req.body.Listing.location;

  // 2. Make a request to MapTiler geocoding API to convert location → coordinates
  const response = await fetch(
    `https://api.maptiler.com/geocoding/${maplocation}.json?key=4C2dMMd6o539UNhA2tdO`
  );
  const data = await response.json();

  // 3. Extract coordinates from the first result [longitude, latitude]
  // These are required for storing in MongoDB using GeoJSON format
  const [lng, lat] = data.features[0].center;
  console.log("Coordinates:", lng, lat);

  // 4. Get uploaded image details from Cloudinary via multer
  const url = req.file.path;        // Cloudinary URL
  const filename = req.file.filename; // Cloudinary public ID

  // 5. Create a new Listing instance with form data
  const listing = new Listing(req.body.Listing);

  // 6. Add image and owner info to the listing
  listing.image = { url, filename };
  listing.owner = req.user._id;

  // 7. Add geolocation data in GeoJSON format (used by MongoDB + MapLibre)
  listing.geometry = {
    type: "Point",            // GeoJSON requires type to be "Point"
    coordinates: [lng, lat],  // Longitude first, then latitude
  };

  // 8. Save the listing to MongoDB
  let savedlisting=await listing.save();
  console.log(savedlisting);

  // 9. Flash success message and redirect to listings page
  req.flash("success", "New Listing Created Successfully");
  res.redirect("/listings");
};
module.exports.rendereditform=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you Requested for Doesn't Exist");
        res.redirect("listings")
    }
    let orginalurl=listing.image.url;
    console.log(listing.image.url);
    let originalUrl = listing.image.url;
originalUrl = originalUrl.replace("/upload", "/upload/h_300,w_250");

     res.render("listing/edit.ejs",{listing,originalUrl});
}
module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.Listing})
    if(typeof req.file!==undefined){
     let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
     await listing.save();
    }
    req.flash("sucess"," Listings Was Edited Successfully");
   res.redirect(`/listings`)
}
module.exports.destoryListing=async(req,res)=>{
    let{id}=req.params;
    const deletedhotel=await Listing.findByIdAndDelete(id);
   // console.log(deletedhotel);
    req.flash("sucess"," Listings Was Deleted Successfully");
    res.redirect("/listings")
}