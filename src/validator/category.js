const Joi = require('joi');


const CategoryValidator = Joi.object({
    name: Joi.string().required(),
    slug: Joi.string().required()
})

module.exports = CategoryValidator;