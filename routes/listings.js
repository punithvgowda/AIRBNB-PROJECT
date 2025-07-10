const express=require("express");
const app=express();
const mongoose=require("mongoose")
const router=express.Router();
const Listing=require("../models/listing.js")
const wrapasync=require("../utils/wrapasync")
const ExpressError=require("../EpressError.js")
const { listingSchema } = require("../schema.js"); // ✅ Destructure the correct one
const {isloggedin,isowner,isauthor}=require("../middleware.js");
const listingcontroller=require("../Controllers/listings.js");
const multer  = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage });




//converting post request to put request
const methodOverride = require("method-override");
const { error } = require("console");
const { request } = require("http");
app.use(methodOverride("_method"));


//validateschema middleware to validate
const validateschema = (req, res, next) => {
    console.log("validating schema")
    console.log(req.body);
 const { error } = listingSchema.validate(req.body); // ✅ use correct reference

 // Destructure 'error' from the result
    if (error) {
        const errmsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errmsg); // Use errmsg for a meaningful error message
    } else {
        console.log("schema validated");
        next();
    }
};

router.route("/") //the api  which runs under route "/""
.get( wrapasync(listingcontroller.indexListing))//index route
.post(isloggedin,upload.single("Listing[image][url]"),validateschema ,wrapasync(listingcontroller.createListing));


 //new.ejs
 router.get("/new",isloggedin,(listingcontroller.newListing));


router.route("/:id") //THE apis which runs under the the route /:id
.get(wrapasync(listingcontroller.showListing))//show route
.put(validateschema,upload.single("Listing[image][url]"),wrapasync(listingcontroller.updateListing)) //update route
.post(isloggedin,isowner,wrapasync(listingcontroller.destoryListing)) ;//delete route

//edit route
router.get("/:id/edit",isloggedin,isowner,wrapasync(listingcontroller.rendereditform));



module.exports=router;