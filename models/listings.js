const mongoose =require("mongoose");
const Schema =mongoose.Schema;

const listingSchema =new Schema({
    title: {
        type:String,
        required: true,
    },
    discription : String,
    image :{
        type:String,
        default:"https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg",
        set : (v) =>
         v===""?
         "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg" :v 
        },
        
    price : Number , 
    location : String ,
    country : String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports =Listing;   