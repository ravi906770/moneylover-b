import mongoose, { Schema, Types } from 'mongoose';
import { Category } from './categoryModel';
// import { transactionSchemaValidation } from '../validator/schema';



// Document interface
interface Transaction {
  name: string;
  description: string;
  date: string;
  category:string;
  payment : number;
  end_date : string;
  status : string;
  mode : string,
  userId: Types.ObjectId; 
} 

// Schema
const schema = new Schema<Transaction>({
    name: { type: String ,required: true},
  description:{ type: String,required: true},
  date: { type: String ,required: true},
  category:{ type: String,required: true},
  payment : { type: Number ,required: true},
  end_date: {type : String , required : true},
  status : {type : String , required : true},
  mode : {type : String , required : true},
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});





// schema.pre('save', async function (next) {
//   try {
//     await transactionSchemaValidation.validateAsync(this);
//     next();
//   } catch (error:any) {
//     next(error);
//   }
// });


const TransactionModel = mongoose.model<Transaction>('TransactionTest', schema);

export default TransactionModel;