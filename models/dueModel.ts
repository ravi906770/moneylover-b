import mongoose, { Schema, Types } from 'mongoose';

// Define Joi schema for validation


// Document interface
interface Dues {
  name: string;
    date: string;
    payment : number,
    userId: Types.ObjectId; 
    
 
}

// Mongoose Schema
const schema = new Schema<Dues>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  payment: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
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

export default mongoose.model<Dues>('Dues', schema);
