
import mongoose, { Schema, Types } from 'mongoose';
// import { categorySchemaValidation } from '../validator/schema';

// Document interface
export interface Limit {
  income: number;
  daily_limit: number;
  month: string;
//   monthly_limit: number; 
  userId: Types.ObjectId; 
}

// Schema
const schema = new Schema<Limit>({
    income: { type: Number ,required: true},
    daily_limit : { type:Number ,required: true},
    // monthly_limit : { type:Number ,required: true},
    month: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});


// Function to reset the data for each user when a new month starts
const resetLimitsForNewMonth = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
  const currentYear = currentDate.getFullYear();
  const currentMonthString = `${currentYear}-${currentMonth}`; // Format: YYYY-MM

  // Update documents where the month field is not equal to the current month
  await LimitModel.updateMany({ month: { $ne: currentMonthString } }, { 
      $set: { 
          income: 0, // Reset income to 0
          daily_limit: 0, // Reset daily limit to 0
          month: currentMonthString // Update month to current month
      } 
  });
};


// schema.pre('save', async function (next) {
//   try {
//     await categorySchemaValidation.validateAsync(this);
//     next();
//   } catch (error:any) {
//     next(error);
//   }
// });

const LimitModel = mongoose.model<Limit>('Limit', schema);

export  {LimitModel , resetLimitsForNewMonth};