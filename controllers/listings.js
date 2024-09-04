const Listing = require ("../models/listings")

module.exports.index =async (req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 };
//new listing form
module.exports.renderNewForm =(req,res)=>{
    res.render("listings/newListing.ejs");
}
//show listing
module.exports.showRoute = async(req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id).populate({path :"reviews",populate:{path:"author"}}).populate("owner");//nested pupulate ka use kiya gya hai

    if(!listing){ 
        req.flash("error","Listing not exist");
        res.redirect("/listings");

    }

    res.render("listings/show.ejs",{listing});
}
//render edit form
module.exports.renderEditForm = async (req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing not exist");
        return  res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_200")


    res.render("listings/editListing.ejs",{listing, originalImageUrl})
}

//add new listing in database
module.exports.SaveNewListingInDatabase=async(req,res,next)=>{ 
    //let {title ,  image , country ,location ,price,discription}=req.body;
    /*if(!req.body.Listing){
        throw new expressError(400,"Send valid data");
    }*/

    /*let result=listingSchema.validate(req.body);
    //console.log(result);
    if(result.error){
        throw new expressError(400 , result.error);
    }*/
    let url = req.file.path;   //to extract file's URL and NAME
    let filename = req.file.filename;

    const newListing=new Listing(req.body.Listing);
    newListing.owner= req.user._id;//to pass the user name with the created new listing
    newListing.image ={url , filename}
    await newListing.save();
    req.flash("success","New Listing save");
    res.redirect("/listings");
   
}

//update the change in Database
module.exports.EditUpdateInDatabase =async(req,res)=>{
    

    let {id}= req.params;
   

    //let data= req.body.Listing; //it is also work
    //await Listing.findByIdAndUpdate(id,data);

    let listing =await Listing.findByIdAndUpdate(id,{...req.body.Listing});

    if(typeof req.file!= "undefined"){
        let url = req.file.path;   //to extract file's URL and NAME
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    

    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);  
}

//DELETE LISTING
module.exports.DeleteListing =async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success","Listing deleted");
    res.redirect("/listings");
}