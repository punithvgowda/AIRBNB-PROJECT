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
        type: String,
        set: (v) => v === " " 
            ? "https://media.privateupgrades.com/_data/default-hotel_image/13/66895/conrad-bengaluru-10_400x400_auto.jpg" 
            : v,
    },
    price: Number,
    locationn: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingschema); // ✅ Pass schema object, not string
module.exports = Listing;
