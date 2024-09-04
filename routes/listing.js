const express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const expressError =require("../utils/expressError");
const {listingSchema} =require("../schema.js");
const {reviewSchema} = require("../schema.js");
const Listing =require("../models/listings.js");
const {isLoggedIn, isOwner, validateListing} =require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});//to save image in cloudinary slorage

   
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("Listing[image]"),validateListing , wrapAsync(listingController.SaveNewListingInDatabase)); 



router
.route("/new")
.get(isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get( wrapAsync(listingController.showRoute) )
.put(isLoggedIn,isOwner,upload.single("Listing[image]"),validateListing,wrapAsync(listingController.EditUpdateInDatabase) )
.delete(isLoggedIn,isOwner,wrapAsync(listingController.DeleteListing))


//update form route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;