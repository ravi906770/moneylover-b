import mongoose, { Schema } from 'mongoose';

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


const CategoryModel = mongoose.model<Category>('Category', schema);

export default CategoryModel;