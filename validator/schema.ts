// Define Joi schema for validation
import Joi from 'joi';
import { validateSchema } from '../middleware/middleWare';

const userSchemaValidation = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(14).min(6).alphanum().required(),
    mobile_no: Joi.string().pattern(new RegExp('^[6-9]{10}$')).required(),
    avatar: Joi.string()
  }).options({ allowUnknown: false });


const transactionSchemaValidation = Joi.object({
    name: Joi.string().required(),
    discription: Joi.string().required(),
    date: Joi.string().required(),
    category: Joi.string().required(),
    payment: Joi.string().required(),
    end_date: Joi.string().required(),
    status : Joi.string().required(),
    mode : Joi.string().required()
  }).options({ allowUnknown: false });
  


const categorySchemaValidation = Joi.object({
    category: Joi.string().required(),
    budgt_boundry: Joi.string().required(),
  }).options({ allowUnknown: false });
  




const validateUser = validateSchema(userSchemaValidation);
const validateCategory = validateSchema(transactionSchemaValidation);
const validateTransaction = validateSchema(categorySchemaValidation);


export {validateUser , validateCategory , validateTransaction}