//VALIDATION
const Joi = require('joi');

// signup and login validation - functions to validate the data

const signupValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}


const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().required()
    })

    return schema.validate(data)
}


module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;