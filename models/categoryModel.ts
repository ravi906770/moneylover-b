
import mongoose, { Schema, Types } from 'mongoose';
// import { categorySchemaValidation } from '../validator/schema';

// Document interface
export interface Category {
  category: string;
  budget_boundry: number;
  userId: Types.ObjectId; 
}

// Schema
const schema = new Schema<Category>({
    category: { type: String ,required: true},
    budget_boundry : { type:Number ,required: true},
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

const CategoryModel = mongoose.model<Category>('Category', schema);

export default CategoryModel;