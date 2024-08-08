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

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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


//using express routes folder listing.js
app.use("/listings", listings);
//using reviews express router review.js
app.use("/listings/:id/reviews",reviews);

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