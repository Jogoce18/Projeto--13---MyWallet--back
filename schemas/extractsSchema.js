import joi from "joi";
/*Validation with joi*/

const extractsSchema = joi.object({
  type: joi.string().required(),
  description: joi.string().required(),
  value: joi.number().required()
});


export default extractsSchema;