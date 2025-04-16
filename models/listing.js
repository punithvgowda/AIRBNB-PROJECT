const mongoose=require("mongoose");
const schema=mongoose.schema;

const listingschema=new schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    image:{   type:String,
        required: true,
    },
    price:Number,
    location:String,
    country:string,
})
module.exports=listingschema