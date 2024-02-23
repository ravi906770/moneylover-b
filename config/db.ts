import mongoose from "mongoose";

const connection = async ()=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://Ravi:Ravi@cluster0.acluwv8.mongodb.net/MoneyLover");
        console.log(`connection successful on ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}


export default connection;