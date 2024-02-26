import mongoose, { Schema } from 'mongoose';

// Define Joi schema for validation


// Document interface
interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile_no: string;
  refresh_token : string;
  avatar?: string;
}

// Mongoose Schema
const schema = new Schema<User>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile_no: { type: String, required: true },
  refresh_token : {type: String},
  avatar: { type: String }
});

// Define a pre-save hook to validate data using Joi
// schema.pre('save', async function (next) {
//   try {
//     await userSchemaValidation.validateAsync(this);
//     next();
//   } catch (error:any) {
//     next(error);
//   }
// });

export default mongoose.model<User>('User', schema);
