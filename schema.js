const joi =require("joi");

module.exports.listingSchema =joi.object({
    Listing :joi.object({
        title :joi.string().required(),
        discription :joi.string().required(),
        location :joi.string().required(),
        country :joi.string().required(),
        price :joi.number().required(),
        image : joi.string().allow("",null),
    }).required(),
})