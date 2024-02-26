
import mongoose, { Schema } from 'mongoose';
// import { categorySchemaValidation } from '../validator/schema';

// Document interface
export interface Category {
  category: string;
  budget_boundry: string;
}

// Schema
const schema = new Schema<Category>({
    category: { type: String ,required: true},
    budget_boundry : { type:String ,required: true},
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