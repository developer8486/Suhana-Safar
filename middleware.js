const Listing =require("./models/listings.js");
const Review =require ("./models/review.js");
const expressError =require("./utils/expressError");
const {listingSchema , reviewSchema} =require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must have logged in");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

//owner of the listing or not
module.exports.isOwner= async(req,res,next)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);    //yha par ham dekh rhe hai ki kya current user and listing user dono same hai ya nhi
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner");
        return res.redirect(`/listings/${id}`);  // agr yha return nhi hoga to edit update ho jayega which error flash
    }
    next();
}

//validate listing
module.exports.validateListing= (req,res,next)=>{
    let {error} =listingSchema.validate(req.body);

    //console.log(result);
    if(error){
        let errMsg =error.details.map((el)=>el.message).join(",");
        throw new expressError(400 , errMsg);
    }else{
        next();
    }
}


//validating reviews
module.exports.validateReviews =(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);

    if(error){
        let errMsg =error.details.map((el)=>el.message).join(",");
        throw new expressError(400 , errMsg);
    }else{
        next();
    }

}

//owner of the review or not
module.exports.isReviewAuthor= async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review = await Review.findById(reviewId);    //yha par ham dekh rhe hai ki kya current user and listing user dono same hai ya nhi
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not the author");
        return res.redirect(`/listings/${id}`);  // agr yha return nhi hoga to edit update ho jayega which error flash
    }
    next();
}
