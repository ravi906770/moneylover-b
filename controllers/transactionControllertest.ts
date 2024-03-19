import { Request ,Response } from "express";
import TransactionModel from "../models/transactionModel";
import dueModel from "../models/dueModel";
import Razorpay from "razorpay";
import nodemailer from 'nodemailer';
import SplitBillModel from "../models/splitBillModel";



function formatDate(date: Date): string {
    const year: string = String(date.getFullYear());
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
}



export const createTransaction = async (req:Request , res:Response) : Promise<void>=>{
    try {
        const userId = req.user
        const {name , description , date , category , payment , end_date , status , mode} = req.body

        
        const formattedDate: string = formatDate(new Date(date));
        const formattedEndDate: string = formatDate(new Date(end_date));

        if(!(name || description || date || category || payment || end_date || status || mode)){
            res.json("Every Field is Required!!")
            return
        }

       

        const newTransaction = await new TransactionModel({
            name : name,
            description :description,
            date: formattedDate,
            category : category ,
            payment : payment,
            end_date : formattedEndDate,
            status : status,
            mode: mode ,
            userId : userId
        }).save();

        res.json({
            success : true,
            message : "Transaction is Added Successfully",
            newTransaction
        })

    } catch (error) {
        console.log(error)
        res.json("Error in Add new Transaction")
       
   }
}

