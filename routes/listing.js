const express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const expressError =require("../utils/expressError");
const {listingSchema} =require("../schema.js");
const {reviewSchema} = require("../schema.js");
const Listing =require("../models/listings.js");


   
//validating listinggs
const validateListing= (req,res,next)=>{
    let {error} =listingSchema.validate(req.body);

    //console.log(result);
    if(error){
        let errMsg =error.details.map((el)=>el.message).join(",");
        throw new expressError(400 , errMsg);
    }else{
        next();
    }
}


//landing page
router.get("/",wrapAsync(async (req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 }));

 //create new listing form, route
router.get("/new",(req,res)=>{
    res.render("listings/newListing.ejs");
})

//show route
 router.get("/:id", wrapAsync(async(req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id).populate("reviews");

    if(!listing){
        req.flash("error","Listing not exist");
        res.redirect("/listings");

    }

    res.render("listings/show.ejs",{listing});
}) );


//add new listing in DB route  
router.post("/", validateListing , wrapAsync(async(req,res,next)=>{ 
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
    await newListing.save();
    req.flash("success","New Listing save");
    res.redirect("/listings");
   
})); 
    
//update form route
router.get("/:id/edit",wrapAsync(async (req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing not exist");
        return  res.redirect("/listings");

    }
    res.render("listings/editListing.ejs",{listing})
}))

//update in DB route
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
    

    let {id}= req.params;

    //let data= req.body.Listing; //it is also work
    //await Listing.findByIdAndUpdate(id,data);

    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);  
}) );
 
// delete listing route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success","Listing deleted");
    res.redirect("/listings");
}))
 

module.exports = router;