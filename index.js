const express =require("express");
const app =express();
const mongoose =require("mongoose");
const Listing =require("./models/listings.js");
const path =require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");
const wrapAsync =require("./utils/wrapAsync.js");
const expressError =require("./utils/expressError");
const {listingSchema} =require("./schema.js");
const {reviewSchema} = require("./schema.js");
const Review =require ("./models/review.js");

app.set("view engine","ejs");
app.set("views" ,path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate); //ejs mate
app.use(express.static(path.join(__dirname,"/public"))); //for css

//mongoDB connection
const MONGO_URL ="mongodb://127.0.0.1:27017/suhana_safar";
main().then(()=>{
        console.log("connection is successful");
})
.catch(err => console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL); 
    } 

//root route
app.get("/",(req,res) =>{
    res.send ("route is workingggggggggggggg");
});

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

 app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 }));

 //create new listing form, route
app.get("/listings/new",(req,res)=>{
    res.render("listings/newListing.ejs");
})
 
//add new listing in DB route  
app.post("/listings", validateListing , wrapAsync(async(req,res,next)=>{ 
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
    res.redirect("/listings");
   
})); 
    
//update form route
app.get("/listings/:id/edit",wrapAsync(async (req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    res.render("listings/editListing.ejs",{listing})
}))

//update in DB route
app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
    

    let {id}= req.params;

    //let data= req.body.Listing; //it is also work
    //await Listing.findByIdAndUpdate(id,data);

    await Listing.findByIdAndUpdate(id,{...req.body.Listing});

    res.redirect(`/listings/${id}`);  
}) );
 
// delete listing route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
}))
  
 //show route
app.get("/listings/:id", wrapAsync(async(req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}) );

//add review
app.post("/listings/:id/reviews",validateReviews,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview =new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    let {id} = req.params;
    //console.log("new review saved");
    res.redirect(`/listings/${id}`);  
}));

//delete review
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))

//random route
app.all("*",(req,res,next)=>{
    next(new expressError(404,"Page not found"));
}) 

app.use((err, req, res , next)=>{ 
    let{statusCode=500 ,message="Something went wrong"}=err;
    res.render("error.ejs",{err});
    //res.status(statusCode).send(message);
});


app.listen(8080 , () =>{
    console.log("listening to port 8080");
});