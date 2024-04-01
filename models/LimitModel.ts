
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



const resetLimitsForNewMonth = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Mapping of month numbers to month names
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Get the month name corresponding to the current month number
  const currentMonthString = monthNames[currentMonth - 1];

  console.log(currentMonthString);

  await LimitModel.updateMany(
    { month: { $ne: currentMonthString } },
    {
      $set: {
        income: 0, // Reset income to 0
        daily_limit: 0, // Reset daily limit to 0
        month: currentMonthString // Update month to current month
      }
    }
  );
};





const LimitModel = mongoose.model<Limit>('Limit', schema);

export  {LimitModel , resetLimitsForNewMonth};