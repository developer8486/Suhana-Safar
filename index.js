const express =require("express");
const app =express();
const mongoose =require("mongoose");
const Listing =require("./models/listings.js");
const path =require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");

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

 app.get("/listings",async (req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 });

 //create new listing form, route
app.get("/listings/new",(req,res)=>{  
    res.render("listings/newListing.ejs");
})

//add new listing in DB route
app.post("/listinigs",async(req,res)=>{ 
    //let {title ,  image , country ,location ,price,discription}=req.body;
    const newListing=new Listing(req.body.Listing);
    await newListing.save();
    res.redirect("/listings");
}) 
    
//update form route
app.get("/listings/:id/edit",async (req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    res.render("listings/editListing.ejs",{listing})
})

//update in DB route
app.put("/listings/:id",async(req,res)=>{
    let {id}= req.params;

    //let data= req.body.Listing; //it is also work
    //await Listing.findByIdAndUpdate(id,data);

    await Listing.findByIdAndUpdate(id,{...req.body.Listing});

    res.redirect(`/listings/${id}`); 
})

// delete listing route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
  
 //show route
app.get("/listings/:id", async (req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}) 



app.listen(8080 , () =>{
    console.log("listening to port 8080");
});     