const Joi = require("joi");
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
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required(),
});