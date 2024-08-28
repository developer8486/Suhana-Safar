const mongoose =require("mongoose");
const Schema =mongoose.Schema;
const Review = require("./review.js");

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
    reviews :[{ 
         type : Schema.Types.ObjectId,
         ref : "Review"
    },],
    owner:{
        type : Schema.Types.ObjectId,
        ref: "User"
    },
});

listingSchema.post("findOneAndDelete" , async(listing) =>{//.post: This is a Mongoose middleware function that executes after a specific operation. In this case, it runs after the findOneAndDelete operation.
    if(listing){
        await Review.deleteMany({_id:{$in : listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports =Listing; 