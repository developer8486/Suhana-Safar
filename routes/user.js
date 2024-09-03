const express =require("express");
const router =express.Router();
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport= require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users");

router
.route("/signup")
.get(usersController.renderSignUpForm)
.post(wrapAsync(usersController.SignUpUser));

router
.route("/login")
.get(usersController.LoginUser)
.post(saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login', failureFlash:true}),usersController.authenticateUser)

//logout route
router.get("/logout",usersController.logoutUser)


module.exports=router;