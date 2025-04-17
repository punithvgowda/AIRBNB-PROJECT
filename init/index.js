const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

let MONGOOSE_URL="mongodb://127.0.0.1:27017/AIRBNB";


async function main() {
    await(mongoose.connect(MONGOOSE_URL))
    
}
main().then(()=>{
    console.log("sucessfully connected wit database");
})
.catch((err)=>{
    console.log(err)
})


const initDb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
};
initDb()
.then(()=>{
    console.log('inforamtion sucessfully added')
})
.catch((err)=>{
    console.log(err)
})
