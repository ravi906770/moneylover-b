import express from "express"
import {  addDuesController, completedTransaction, createTransaction, deleteTransaction, getAllDuesController, getAllSplitBillController, getAllTransaction, getCategoryPayment, getDailyTransactionData, getMonthWisePaymentController, getSplitBillNotification, getTransaction, highTransaction, lowTransaction, payDuesController, pendingTransaction, sendEmailNotification, updateTransactionController } from "../controllers/transactionController";
import { verifyToken } from "../middleware/middleWare";

const router = express.Router();



router.post("/transaction" ,verifyToken, createTransaction);

router.get("/getAllTransaction" ,verifyToken, getAllTransaction);

router.delete("/delete-transaction/:_id",verifyToken , deleteTransaction);

router.get("/transaction-payment" ,verifyToken, getTransaction)

router.get("/low-transaction",verifyToken , lowTransaction)

router.get("/high-transaction",verifyToken , highTransaction)

router.get("/pending",verifyToken , pendingTransaction)

router.get("/completed",verifyToken , completedTransaction)

// router.get("/categoryP" , categoryTransaction)

router.get("/categoryPayment",verifyToken , getCategoryPayment)

router.put("/updateTransaction/:_id",verifyToken , updateTransactionController)

// add dues

router.post("/addDues",verifyToken , addDuesController)
router.get("/getDues",verifyToken ,getAllDuesController)


// pay dues

router.post("/payDues",verifyToken , payDuesController)


// splitbill Routes

router.post("/splitbill",verifyToken, sendEmailNotification)
router.get("/getsplitbill",verifyToken, getAllSplitBillController)


router.get("/dailydata" ,verifyToken, getDailyTransactionData)

router.get("/monthdailydata" ,verifyToken, getMonthWisePaymentController)

router.get("/splitnotification", verifyToken , getSplitBillNotification)



export default router