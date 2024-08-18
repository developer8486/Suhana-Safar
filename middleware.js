module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must have logged in");
        return res.redirect("/login");
    }
    next();
};