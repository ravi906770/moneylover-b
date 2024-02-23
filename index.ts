import express from 'express';
import {json} from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connection from './config/db';
import authRoute from "./routes/authRoute"
import categoryRoute from "./routes/categoryRoute"
import transactionRoute from "./routes/transactionRoute"



dotenv.config();

connection();

const app = express();
app.use(json());
app.use(cors());

app.use('/api/v1' , authRoute);
app.use('/api/v1' , categoryRoute)
app.use("/api/v1" , transactionRoute)

const PORT = 5000;

app.listen(PORT , ()=>{
    console.log("Server is running on 5000")
})