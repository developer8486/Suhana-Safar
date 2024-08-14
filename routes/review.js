const express = require("express");
const router = express.Router({mergeParams:true});//merge params true isliyea kiya gya hai kyoki parent yani (app.use review.js)
                                             //k params child tak nhi aa pate hai usi ko lane k liyea ham maerge params ko true set kar dete hai
const {reviewSchema} = require("../schema.js");
const Review =require ("../models/review.js");
const expressError =require("../utils/expressError");
const wrapAsync =require("../utils/wrapAsync.js");
const Listing =require("../models/listings.js");
const {listingSchema} =require("../schema.js");


//validating reviews
const validateReviews =(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);

    if(error){
        let errMsg =error.details.map((el)=>el.message).join(",");
        throw new expressError(400 , errMsg);
    }else{
        next();
    }

}

//add review
router.post("/",validateReviews,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview =new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    let {id} = req.params;
    //console.log("new review saved");
    req.flash("success","New Review added");
    res.redirect(`/listings/${id}`);  
}));

//delete review
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
}))


module.exports =router;