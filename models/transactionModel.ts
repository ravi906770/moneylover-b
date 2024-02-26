import mongoose, { Schema } from 'mongoose';
import { Category } from './categoryModel';
// import { transactionSchemaValidation } from '../validator/schema';



// Document interface
interface Transaction {
  name: string;
  discription: string;
  date: string;
  category:string;
  payment : string;
  end_date : string;
  status : string;
  mode : string
}

// Schema
const schema = new Schema<Transaction>({
    name: { type: String ,required: true},
  discription:{ type: String,required: true},
  date: { type: String ,required: true},
  category:{ type: String,required: true},
  payment : { type: String ,required: true},
  end_date: {type : String , required : true},
  status : {type : String , required : true},
  mode : {type : String , required : true}
});


// schema.pre('save', async function (next) {
//   try {
//     await transactionSchemaValidation.validateAsync(this);
//     next();
//   } catch (error:any) {
//     next(error);
//   }
// });


const TransactionModel = mongoose.model<Transaction>('Transaction', schema);

export default TransactionModel;