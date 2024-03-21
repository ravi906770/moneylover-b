
import mongoose, { Schema, Types } from 'mongoose';
// import { categorySchemaValidation } from '../validator/schema';

// Document interface
export interface Limit {
  income: number;
  daily_limit: number;
//   monthly_limit: number; 
  userId: Types.ObjectId; 
}

// Schema
const schema = new Schema<Limit>({
    income: { type: Number ,required: true},
    daily_limit : { type:Number ,required: true},
    // monthly_limit : { type:Number ,required: true},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});


// schema.pre('save', async function (next) {
//   try {
//     await categorySchemaValidation.validateAsync(this);
//     next();
//   } catch (error:any) {
//     next(error);
//   }
// });

const LimitModel = mongoose.model<Limit>('Limit', schema);

export default LimitModel;