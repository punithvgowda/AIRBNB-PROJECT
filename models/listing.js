const mongoose=require("mongoose");
const schema=mongoose.schema;

const listingschema=new schema({
    title:String,
    description:String,
    image:String,
    price:Number,
    location:String,
    country:string,
})