import mongoose, { Schema } from 'mongoose';

// Document interface
interface User {
  firstname: string;
  lastname: string;
  email: string;
  password:string;
  mobile_no : BigInt;
  avatar?: string;
}

// Schema
const schema = new Schema<User>({
    firstname: { type: String ,required: true},
  lastname:{ type: String,required: true},
  email: { type: String ,required: true},
  password:{ type: String,required: true},
  mobile_no : { type:BigInt ,required: true},
  avatar: {image : Buffer}
});


const UserModel = mongoose.model<User>('User', schema);

export default UserModel;