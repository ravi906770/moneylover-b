
import { Request ,Response } from "express";
import TransactionModel from "../models/transactionModel";
import { it } from "node:test";
import dueModel from "../models/dueModel";
import Razorpay from "razorpay";
import nodemailer from 'nodemailer';
import SplitBillModel from "../models/splitBillModel";
import { Types } from "mongoose";


// import axios from "axios";


function formatDate(date: Date): string {
    const year: string = String(date.getFullYear());
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
}

export const createTransaction = async (req:Request , res:Response) : Promise<void>=>{
    try {
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
        const getTransaction =  await TransactionModel.find({}).sort({createdAt:1});
        const totalPayment = getTransaction.reduce((total, transaction) => total + transaction.payment, 0);
        res.json({
            success : true,
            message : "All Transaction",
            getTransaction,
            totalPayment
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
        const {_id} = req.params
        await TransactionModel.findByIdAndDelete(_id);
        res.json({
            success : true,
            message : "Successfully deleted"

        })
    } catch (error) {
        console.log(error);
        res.json("Error in delete transaction!!")
    }
}




// get payment array month wise to show on the line chart



export const getTransaction = async (req:Request , res:Response) : Promise<void>=>{
        try {
            const transactions = await TransactionModel.aggregate([
                {
                  $project: {
                    _id: 0, 
                    payment: 1,
                    month: { $month: { $toDate: "$date" } } 
                  }
                },
                { $sort: { month: 1 } } 
              ]);
              var newTransaction=[0,0,0,0,0,0,0,0,0,0,0,0,0]
              for (let index = 0; index < transactions.length; index++) {
                const element = transactions[index];
                newTransaction[element.month]+=Number(element.payment);
              }

              var newTransactionObject=[];
              for (let index = 1; index < newTransaction.length; index++) {
                const element = newTransaction[index];
                var tranactionObject={
                    payment:element,
                    month:index

                }
                newTransactionObject.push(tranactionObject);
              }

           res.json({
            success : true,
            message : "All transaction get (month / payment)",
            newTransactionObject
           })
            
        } catch (error) {
            res.json({
                success : false,
                message: "something went wrong while getting transaction!!"
            })
        }   
}




// CATEGORY WISE TRANSACTION TO SHOW ON PIE CHART

export const getCategoryPayment = async (req:Request , res:Response) : Promise<void>=>{
    try {
        const transaction = await TransactionModel.aggregate([
            {
                $group :{
                    _id : '$category',
                    totalAmount :{$sum : '$payment'}
                }
            }
        ])

        const formatData = transaction.map(item=>({
            category : item._id,
            totalAmount : item.totalAmount
        }))
        res.json({
            success : true,
            message : "Successfully get the Piechart",
            formatData
        })
    } catch (error) {
        res.json("Something went wrong while getting the piechart")
    }
}




// filter for transactions

// 1. low transaction


export const lowTransaction =  async (req:Request , res:Response) : Promise<void>=>{
    try {
        const data = await TransactionModel.find({});
        const sorted=data.sort(    (p1, p2) => (p1.payment < p2.payment) ? -1 : (p1.payment > p2.payment) ? 1 : 0);


        res.json({
            success : true,
            message : "Low tranactions!!",
            sorted
        })
    } catch (error) {
        res.json({
            success : false,
            message : "low Filter is not work"
        })
    }
}



export const highTransaction =  async (req:Request , res:Response) : Promise<void>=>{
    try {
        const data = await TransactionModel.find({});
        const sorted=data.sort(    (p1, p2) => (p1.payment < p2.payment) ? 1 : (p1.payment > p2.payment) ? -1 : 0);


        res.json({
            success : true,
            message : "High tranactions!!",
            sorted
        })
    } catch (error) {
        res.json({
            success : false,
            message : "high Filter is not work"
        })
    }
}


// status wise transaction


export const pendingTransaction =  async (req:Request , res:Response) : Promise<void>=>{
    try {
        const data = await TransactionModel.find({ status: "pending" });
        // console.log(data)

        res.json({
            success : true,
            message : "Pending tranactions!!",
            data
        })
    } catch (error) {
        res.json({
            success : false,
            message : "Pending transaction is not work"
        })
    }
}




// completed transaction


export const completedTransaction =  async (req:Request , res:Response) : Promise<void>=>{
    try {
        const data = await TransactionModel.find({ status: "completed"  });
        // console.log(data)

        res.json({
            success : true,
            message : "Completed tranactions!!",
            data
        })
    } catch (error) {
        res.json({
            success : false,
            message : "Completed transaction is not work"
        })
    }
}




// export const categoryTransaction =  async (req:Request , res:Response) : Promise<void>=>{
//     try {
//         // const data = await TransactionModel.find({ status: "completed"  }).select("status");
//         const data = await TransactionModel.find({});
//         // console.log(data)

//         res.json({
//             success : true,
//             message : "Completed tranactions!!",
//             data
//         })
//     } catch (error) {
//         res.json({
//             success : false,
//             message : "Completed transaction is not work"
//         })
//     }
// }



// Update the Transaction


export const updateTransactionController = async (req:Request , res:Response) : Promise<void>=>{
    try {
        const {name , description , date , category , payment , status , mode} =req.body

        const newTransaction = await TransactionModel.findByIdAndUpdate(
            req.params._id,
            {name , description , date , payment, category, status , mode},
            { new: true }
          );

          await newTransaction?.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        newTransaction,
      });

    } catch (error) {
        res.json({
            success : false,
            message : "Error in Update the Transaction"
        })
    }
}



// Dues Add

export const addDuesController = async(req:Request , res : Response) : Promise<void>=>{
    const {name , date , payment} =  req.body;

    try {

        if(!(name || date || payment)){
            res.json({
                success : true , 
                message : 'Every Field is Required!'
            })
            return
        }

        const formattedDate: string = formatDate(new Date(date));
        const data = await new dueModel({
            name,
            date : formattedDate,
            payment
        }).save()

        res.json({
            success : true,
            message : "Dues Added Successfully!!",
            data
        })
        return

    } catch (error) {
        res.json({
            success : false,
            message : "Error in data adding!!",
        })
    }
}


// get all dues

export const getAllDuesController = async(req:Request , res : Response) : Promise<void>=>{
    try {
        const data = await dueModel.find({});
        res.json({
            success : true,
            message : "Dues get Successfully!!",
            data
        })
        return
    } catch (error) {
        res.json({
            success : false,
            message : "Dues get Error!!",
        })
    }
}


// pay the dues


export const payDuesController = async(req:Request , res : Response) : Promise<void>=>{
    const razorpay = new Razorpay({
        key_id: req.body.keyId,
        key_secret: req.body.keySecret,
    });

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "any unique id for every order",
        payment_capture: 1
    };

    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
       res.json({
        success : false,
        message : "Not able to create order. Please try again!"
       })
    }
}



// send the email notification

export const sendEmailNotification = async (req: Request, res: Response) => {
    const { name, description, payment, date, mode, category, status, emails } = req.body;

    try {
        if (!emails || emails.length === 0) {
            throw new Error('No valid email recipients provided.');
        }

        const formattedDate: string = formatDate(new Date(date));

      

        console.log(emails);
        
        //Create a new instance of the SplitBillModel and save it to the database
        const data = await new SplitBillModel({
            name,
            description,
            payment,
            mode,
            date: formattedDate,
            category,
            status,
            emails: emails 
        }).save()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pankhaniyaravi05@gmail.com',
                pass: 'zudy grcu arht uiow'
            }
        }); 

        for (const email of emails) {
            console.log("Emals",email);
            
            const info = await transporter.sendMail({
                from: 'pankhaniyaravi05@gmail.com',
                to: email,
                subject: 'Payment Request',
                text: `${name},\n\n${description},\n\nThis ${payment} you have to pay to me!`
            });
        }

        res.json({
            success: true,
            message: "Request sent successfully",
            // data
        });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.json({
            success: false,
            message: "Failed to send the email request!"
        });
    }
}
;


// get all SpliBill 


export const getAllSplitBillController = async(req:Request , res:Response)=>{
    try {
        const data = await SplitBillModel.find({});
        res.json({
            success : true,
            message : "Successfully get SplitBill!!",
            data
        })
    } catch (error) {
        res.json({
            success : false,
            message : "Error in getting SplitBill!!"
        })
    }
}



// get total for daily transaction 

export const getDailyTransactionData = async (req: Request, res: Response) => {
    try {
        const transactions = await TransactionModel.find();

        const dailyPaymentData: { date: string; payment: number }[] = [];

        transactions.forEach(transaction => {
            const date = transaction.date.toString();
            const payment = transaction.payment;

          
            const existingRecord = dailyPaymentData.find(record => record.date === date);

            if (existingRecord) {
                
                existingRecord.payment += payment;
            } else {
               
                dailyPaymentData.push({ date, payment });
            }
        });

       
        res.json({
            success: true,
            message : "Get All Daily transaction data successfully!!",
            dailyPaymentData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong in get data!!"
        });
    }
};