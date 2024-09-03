const user = require("../models/user.js")
const passport= require("passport");
const { saveRedirectUrl } = require("../middleware.js");


module.exports.renderSignUpForm =(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.SignUpUser =async(req,res) =>{
    try{
        let {username ,email,password} = req.body;
        const newUser = new user({email,username});
        const registeredUser=await user.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","user registered and logged in");
            res.redirect("/listings");
        })
        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}


module.exports.LoginUser= (req,res)=>{
    res.render("users/login.ejs");
}


module.exports.authenticateUser =async(req,res)=>{
    req.flash("success","Welcome back to Suhana-Safar. Hope you enjoyed our website Safar");
    let redirectUrl= res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

}


module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
         if(err){
            return next(err);
         }
         req.flash("success","you logged out successfully");
         res.redirect("./listings");
    })
}