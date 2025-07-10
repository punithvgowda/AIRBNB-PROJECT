const mongoose = require("mongoose");
const Review=require("./review.js")
const { type } = require("../schema");
const { ref } = require("joi");
const Schema = mongoose.Schema; // ✅ Capital "S"

const listingschema = new Schema({ // ✅ Use Schema as constructor
    title: {
        type: String,
       
        

    },
    description: {
        type: String,
        
    },
    image: {
        url:{
            type:String
        },
        filename:{
            type:String,
    },
},
    price:{
        type:Number,
    },
    location:{
        type:String,
        
    },
    country:{
        type:String,
    },
    reviews:[{
        type:Schema.Types.ObjectId,ref:"Review"
    }],
    owner:{
       type:Schema.Types.ObjectId,ref:"user"
       
    },
    geometry:{
        type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }

    },
});
listingschema.post("findOneAndDelete",async(listings)=>{
    if(listings){
        await Review.deleteMany({_id:{$in:listings.reviews}})
    }
})

listingschema.index({ geometry: '2dsphere' });
const Listing = mongoose.model("Listing", listingschema); // ✅ Pass schema object, not string
module.exports = Listing;
