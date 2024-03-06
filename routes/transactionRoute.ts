import express from "express"
import {  completedTransaction, createTransaction, deleteTransaction, getAllTransaction, getCategoryPayment, getTransaction, highTransaction, lowTransaction, pendingTransaction } from "../controllers/transactionController";

const router = express.Router();



router.post("/transaction" , createTransaction);

router.get("/getAllTransaction" , getAllTransaction);

router.delete("/delete-transaction/:_id" , deleteTransaction);

router.get("/transaction-payment" , getTransaction)

router.get("/low-transaction" , lowTransaction)

router.get("/high-transaction" , highTransaction)

router.get("/pending" , pendingTransaction)

router.get("/completed" , completedTransaction)

// router.get("/categoryP" , categoryTransaction)

router.get("/categoryPayment" , getCategoryPayment)




export default router