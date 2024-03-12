import { string } from 'joi';
import mongoose, { Schema } from 'mongoose';
// import { transactionSchemaValidation } from '../validator/schema';



// Document interface
interface SplitBill {
  name: string;
  description: string;
  date: string;
  category:string;
  payment : number;
  status : string;
  mode : string;
  emails : string[];
}



// Schema
const splitBillSchema = new Schema<SplitBill>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    payment: { type: Number, required: true },
    status: { type: String, required: true },
    mode: { type: String, required: true },
    emails:{type:[String]}
});


// schema.pre('save', async function (next) {
//   try {
//     await transactionSchemaValidation.validateAsync(this);
//     next();
//   } catch (error:any) {
//     next(error);
//   }
// });


const SplitBillModel = mongoose.model<SplitBill>('SplitBill', splitBillSchema);

export default SplitBillModel;