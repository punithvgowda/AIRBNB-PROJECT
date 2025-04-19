const express=require("express");
const app=express();
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const ejsmate=require("ejs-mate")

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname,"/public")))

//converting post request to put request
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


 //connection with mongoose database
let MONGOOSE_URL="mongodb://127.0.0.1:27017/AIRBNB";
async function main(){
    await mongoose.connect(MONGOOSE_URL);
}
main(

).then(()=>{
    console.log("connection succesfull")
})
.catch((err)=>{
    console.log(err)
})

//port
let port=3000;
app.listen(port,()=>{
    console.log("port is now listening")
})
    
app.get("/",(req,res)=>{
    res.send(" hlo there just chilling")
    
})


//index route
app.get("/listings", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs",{ allListing });
 });
 //new.ejs
 app.get("/listings/new",(req,res)=>{
    res.render("listing/new.ejs")
    console.log("new.ejs file was rendered sucessfully")
  });
 //show route
app.get("/listings/:id",async(req,res )=>{
    let {id}=req.params;
    const listings=await Listing.findById(id);
    res.render("listing/show.ejs",{listings})
    console.log("ejs file rendered sucessfully")
})
//create route
app.post("/listings",(req,res)=>{
    console.log(req.body.Listing) // object will get created atomatically
    const listing=new Listing(req.body.Listing) //creating new instance
    listing.save();                             // saved to database
    res.redirect("listings")
})
//edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
     res.render("listing/edit.ejs",{listing})
})
//update route
app.put("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.Listing})
   res.redirect(`/listings`)
})
//delete route
app.post("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    const deletedhotel=await Listing.findByIdAndDelete(id);
    console.log(deletedhotel);
    res.redirect("/listings")
})