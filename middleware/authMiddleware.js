import { signinSchema,signSchema } from "../schemas/authSchemas.js";


export function validateSignIn(req, res, next) {
    const {error} = signinSchema.validate(req.body);
    if(error) {
      return res.sendStatus(422); // unprocessable entity
    }
  
    next();
  }
  
  export function validateSignUp(req, res, next) {
    const {error} = signSchema.validate(req.body);
    if(error) {
      return res.sendStatus(422); // unprocessable entity
    }
  
    next();
  }