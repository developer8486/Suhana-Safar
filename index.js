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
const session = require("express-session");
const flash= require("connect-flash");
const passport =require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js")

//express session
const sessionOptions ={
    secret : "ThisIsSecret",
    resave : false,
    saveUninitialized: true,
    cookie: {
        expires : Date.now() + 7 * 24 * 60 * 60 *1000, //this data is in milisec for one week
        maxAge : 7 * 24 * 60 * 60 *1000,
        httpOnly : true,
    }
}

//require different routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");
const { privateEncrypt } = require("crypto");

app.set("view engine","ejs");
app.set("views" ,path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate); //ejs mate
app.use(express.static(path.join(__dirname,"/public"))); //for css


//root route
app.get("/",(req,res) =>{
    res.send ("route is workingggggggggggggg");
});

app.use(session(sessionOptions));
app.use(flash());


//session k bad isliye kyoki passport session ko use karta hai
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//mongoDB connection
const MONGO_URL ="mongodb://127.0.0.1:27017/suhana_safar";
main().then(()=>{
        console.log("connection is successful");
})
.catch(err => console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL); 
    } 


//flash success
app.use((req,res,next) =>{ 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");

    next();
})


app.get("/fakeruser", async(req,res)  =>{
    let fakeruserr= new user({
        email: "skjhdgkjfhsdgk",
        username: "praveen_dubey",
    })
    let newUser = await user.register(fakeruserr,"password");
    res.send(newUser);
})

//using express routes folder listing.js
app.use("/listings", listings);
//using reviews express router review.js
app.use("/listings/:id/reviews",reviews);
//using express routes folder user.js
app.use("/",users);

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
