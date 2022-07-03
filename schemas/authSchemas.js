import joi from "joi";

export const signSchema=  joi.object({
    /*Validation with joi*/
    name: joi.string().required(),
    email:joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});
export const signinSchema=  joi.object({
    /*Validation with joi*/
   
    email:joi.string().email().required(),
    password: joi.string().required(),
   
});