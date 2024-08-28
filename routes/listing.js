const express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const expressError =require("../utils/expressError");
const {listingSchema} =require("../schema.js");
const {reviewSchema} = require("../schema.js");
const Listing =require("../models/listings.js");
const {isLoggedIn, isOwner, validateListing} =require("../middleware.js");


   



//landing page
router.get("/",wrapAsync(async (req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 }));

 //create new listing form, route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/newListing.ejs");
})

//show route
 router.get("/:id", wrapAsync(async(req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id).populate({path :"reviews",populate:{path:"author"}}).populate("owner");//nested pupulate ka use kiya gya hai

    if(!listing){ 
        req.flash("error","Listing not exist");
        res.redirect("/listings");

    }

    res.render("listings/show.ejs",{listing});
}) );


//add new listing in DB route  
router.post("/", isLoggedIn,validateListing , wrapAsync(async(req,res,next)=>{ 
    //let {title ,  image , country ,location ,price,discription}=req.body;
    /*if(!req.body.Listing){
        throw new expressError(400,"Send valid data");
    }*/

    /*let result=listingSchema.validate(req.body);
    //console.log(result);
    if(result.error){
        throw new expressError(400 , result.error);
    }*/

    const newListing=new Listing(req.body.Listing);
    newListing.owner= req.user._id;//to pass the user name with the created new listing
    await newListing.save();
    req.flash("success","New Listing save");
    res.redirect("/listings");
   
})); 
    
//update form route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing not exist");
        return  res.redirect("/listings");

    }
    res.render("listings/editListing.ejs",{listing})
}))

//update in DB route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
    

    let {id}= req.params;

    //let data= req.body.Listing; //it is also work
    //await Listing.findByIdAndUpdate(id,data);

    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);  
}) );
 
// delete listing route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success","Listing deleted");
    res.redirect("/listings");
}))
 

module.exports = router;