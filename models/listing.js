const mongoose = require("mongoose");
const Schema = mongoose.Schema; // ✅ Capital "S"

const listingschema = new Schema({ // ✅ Use Schema as constructor
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        filename:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingschema); // ✅ Pass schema object, not string
module.exports = Listing;
