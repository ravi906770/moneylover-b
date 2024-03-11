import express from "express"
import {  addDuesController, completedTransaction, createTransaction, deleteTransaction, getAllDuesController, getAllTransaction, getCategoryPayment, getTransaction, highTransaction, lowTransaction, payDuesController, pendingTransaction, updateTransactionController } from "../controllers/transactionController";

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

router.put("/updateTransaction/:_id" , updateTransactionController)

// add dues

router.post("/addDues" , addDuesController)
router.get("/getDues" ,getAllDuesController)


// pay dues

router.post("/payDues" , payDuesController)


export default router