if(process.env.NODE_ENV!="production"){ //we will use .env file only in development phase not in production phase as we store our secret credentials it may lead to data brech
  require('dotenv').config();
}
// console.log(process.env.SECRET);


const express=require("express");
const app=express();
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const ejsmate=require("ejs-mate")
const wrapasync=require("./utils/wrapasync")
const ExpressError=require("./EpressError.js")
const listingschema=require("./schema.js");
const Review=require("./models/review.js")
const reviewss=require("./schema.js");
const session=require("express-session");
const MongoStore = require("connect-mongo");

const flash = require('connect-flash');
const passport = require('passport');
const passportlocal=require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy;


//

const listingsroute=require("./routes/listings.js");
const reviewroute=require("./routes/reviews.js");
const userroute=require("./routes/user.js");
const user=require("./models/user.js");
let MONGOOSEATLAS_URL=process.env.DB_URL;

const store = MongoStore.create({
  mongoUrl: MONGOOSEATLAS_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
   store:store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
  },
};






const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname,"/public")))


//converting post request to put request
const methodOverride = require("method-override");
const { error } = require("console");
const { request } = require("http");

app.use(methodOverride("_method"));
 app.use(flash());


 //connection with mongoose database
const port = process.env.PORT || 10000;


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  connectToMongoDB(); // connect AFTER server starts
});
//connecting to database
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGOOSEATLAS_URL);
    console.log("✅ MongoDB connection successful");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}


  app.use(session(sessionOptions));
    app.use(flash());
      app.use(passport.initialize());//intialize
    app.use(passport.session());//for strtingthe sesion after the login
    passport.use(new LocalStrategy(user.authenticate()));//for autheticate before the login

    passport.use(new LocalStrategy(user.authenticate()));

    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());

  
    app.use((req,res,next)=>{
        res.locals.error=req.flash("error");  
        res.locals.sucess=req.flash("sucess");
        res.locals.currentuserinfo=req.user;
      
        
        next();
    });

    app.get("/", (req, res) => {
  res.send("Hello from Airbnb clone!");
});
app.get("/search",async(req,res)=>{
    
    // console.log(req.query.destinyname);
   let searchindb=req.query.destinyname;

 let resfromdb= await Listing.find({title:searchindb});
// console.log(resfromdb);
if(resfromdb.length==0){
    req.flash("error"," The Hotel you requested for doesn't exist");
    res.redirect("/listings");
}
else{


    let id = resfromdb[0]._id.toString();
const listings=await Listing.findById(id).populate({path:"reviews",populate:{ path:"author",}}).populate('owner');
console.log(listings);
    

    console.log("Populated Reviews:", listings.reviews);

  
    res.render("listing/show.ejs",{listings})  
    console.log("ejs file rendered sucessfully")
}
})
   




// the code which are suposed to be here are saved in routes making two files nmaed listinggs and reviews and just using router concept

app.use("/listings", listingsroute); // ✅ use the imported router, not a string
app.use("/listings/:id/review",reviewroute);
app.use("/",userroute);



    

app.use((err,req,res,next)=>{
    let{status=500,message="somethingwentwrong"}=err;
    res.status(status).render("./listing/error.ejs",{message})
});

