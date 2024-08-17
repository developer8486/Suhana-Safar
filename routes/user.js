const express =require("express");
const router =express.Router();
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res) =>{
    try{
        let {username ,email,password} = req.body;
        const newUser = new user({email,username});
        const a=await user.register(newUser,password);
        req.flash("success","user registered");
        res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
      

}));

module.exports=router;