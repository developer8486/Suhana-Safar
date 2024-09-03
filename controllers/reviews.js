const Listing = require("../models/listings")
const Review =require ("../models/review.js");

module.exports.CreateNewReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview =new Review(req.body.review);

    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    let {id} = req.params;
    //console.log("new review saved");
    req.flash("success","New Review added");
    res.redirect(`/listings/${id}`);
}

//delete review
module.exports.deleteReview =async(req,res)=>{
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
}