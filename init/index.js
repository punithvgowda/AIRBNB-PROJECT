const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

let MONGOOSE_URL="mongodb://127.0.0.1:27017/AIRBNB";


async function main() {
    await(mongoose.connect(MONGOOSE_URL))
    
}
main().then(()=>{
    console.log("sucessfully connected with database");
})
.catch((err)=>{
    console.log(err)
})


const initDb=async()=>{
     await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"6867572dd6bedc3457044c78"
    }))
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
