const express = require("express");
const router = express.Router({mergeParams:true});//merge params true isliyea kiya gya hai kyoki parent yani (app.use review.js)
                                             //k params child tak nhi aa pate hai usi ko lane k liyea ham maerge params ko true set kar dete hai
const {reviewSchema} = require("../schema.js");
const Review =require ("../models/review.js");
const expressError =require("../utils/expressError");
const wrapAsync =require("../utils/wrapAsync.js");
const Listing =require("../models/listings.js");
const {listingSchema} =require("../schema.js");
const {validateReviews, isLoggedIn , isReviewAuthor} =require("../middleware.js");
const reviewController = require("../controllers/reviews")



//add review
router.post("/",isLoggedIn ,validateReviews,wrapAsync(reviewController.CreateNewReview));

//delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))


module.exports =router;
