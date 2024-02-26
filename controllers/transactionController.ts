
import { Request ,Response } from "express";
import TransactionModel from "../models/transactionModel";
// import axios from "axios";


function formatDate(date: Date): string {
    const year: string = String(date.getFullYear());
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
}

export const createTransaction = async (req:Request , res:Response) : Promise<void>=>{
    try {
        const {name , discription , date , category , payment , end_date , status , mode} = req.body

        const formattedDate: string = formatDate(new Date(date));
        const formattedEndDate: string = formatDate(new Date(end_date));

        if(!(name || discription || date || category || payment || end_date || status || mode)){
            res.json("Every Field is Required!!")
        }

       

        const newTransaction = await new TransactionModel({
            name : name,
            discription :discription,
            date: formattedDate,
            category : category ,
            payment : payment,
            end_date : formattedEndDate,
            status : status,
            mode: mode
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



export const getAllTransaction =async (req:Request , res:Response) : Promise<void>=>{
    try {
        const getTransaction =  await TransactionModel.find({});
        res.json({
            success : true,
            message : "All Transaction",
            getTransaction
        })

        // console.log("________")
        // console.log(getTransaction);
    } catch (error) {
        console.log(error);
        res.json("Error in Get the Category")
    }
}


// delete the transaction

export const deleteTransaction =async (req:Request , res:Response) : Promise<void>=>{
    try {
        const {id} = req.params
        await TransactionModel.findByIdAndDelete(id);
        res.json({
            success : true,
            message : "Successfully deleted"
        })
    } catch (error) {
        console.log(error);
        res.json("Error in delete transaction!!")
    }
}