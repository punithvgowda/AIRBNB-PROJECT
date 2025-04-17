const express=require("express");
const app=express();
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));


 
let MONGOOSE_URL="mongodb://127.0.0.1:27017/AIRBNB";

let port=3000;

app.listen(port,()=>{
    console.log("port is now listening")
})
    
app.get("/",(req,res)=>{
    res.send(" hlo there just chilling")
    
})
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
 //app.get("/testing",async (req,res)=>{
   // const samplelisting=new Listing({
      //  title:"golden palms",
      //  description:"one among the top hotels in bengaluru",
       // image:"H",
       // price:2000,
       // location:"dasanapura,bengaluru",
       // country:"bharath"
   // });
   //  await samplelisting.save();
//})
//index route
app.get("/listings", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs",{ allListing });
 });
 //show route
app.get("/listings/:id",async(req,res )=>{
    let {id}=req.params;
    const listings=await Listing.findById(id);
    res.render("listing/show.ejs",{listings})
})